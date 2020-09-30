import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { convertTime } from '../../utils/convert-time';
import UserContext from '../../contexts/user/user.context';
import PostDoMore from '../post-do-more/post-do-more.component';
import LikeBtn from '../like-btn/like-btn.component';
import CommentInput from '../comment-input/comment-input.component';
import EachComment from '../each-comment/each-comment.component';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './view-post.styles.scss';

const ViewPost = () => {
  const { postId } = useParams(); // get url params
  const [eachPost, setEachPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentNum, setCommentNum] = useState(0);

  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

  const scrollDown = useRef();


  useEffect(() => {
    fetch(`/eachpost/${postId}`, {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((post) => setEachPost(post.eachPost))
      .catch(console.log);
  }, [postId]);

  // get comments & comment number
  useEffect(() => {
    if (eachPost.comments) {
      setComments(eachPost.comments);
      setCommentNum(eachPost.comments.length);
    }
  }, [eachPost.comments]);

  // user make a comment on the post
  const setComment = (commentedPost) => {
    setComments(commentedPost.comments);
    setCommentNum(commentedPost.comments.length);
    // scroll to new comment
    if (commentedPost.comments && scrollDown.current) {
      scrollDown.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return eachPost ? (
    <div className="view-post">
      <div className="post-layout">
        <div className="post-img-container center">
          <img className="post-img" src={eachPost.photo} alt="post-img" />
        </div>
        <div className="name-row">
          <div className="post-user">
            <img
              className="user-img"
              src={eachPost.postedBy ? eachPost.postedBy.profileImg : null}
              alt="user"
            />
            <div className="name-info">
              {eachPost.postedBy ? (
                <Link
                  className="username"
                  to={ eachPost.postedBy._id !== user._id ? `/profile/${eachPost.postedBy._id}` : '/profile'}
                >
                  {eachPost.postedBy.account}
                </Link>
                ) : 'Loading'
              }
              <div className="posted-at">
                <ScheduleIcon className='time-icon' />
                {eachPost.createdAt ? convertTime(eachPost.createdAt) : null}
              </div>
            </div>
          </div>
          <PostDoMore eachPost={eachPost} />
        </div>
        <div className="post-content">
          <h5>{eachPost.title}</h5>
          <p>{eachPost.content}</p>
        </div>
        <div className="comment-area">
          <div className="comments">
            {comments
              ? comments.map((eachComment) => (
                  <EachComment eachComment={eachComment} key={eachComment._id} />
                ))
              : null}
            <div ref={scrollDown}></div>
          </div>
        </div>
        <div className="icon">
          {eachPost.likes ? <LikeBtn eachPost={eachPost} /> : null}
          <ChatBubbleOutlineIcon className="comment-icon" />
          <span>{commentNum}</span>
        </div>
        <CommentInput setComment={setComment} eachPost={eachPost} />
      </div>
    </div>
  ) : (
    <h2>Pending</h2>
  );
};

export default ViewPost;
