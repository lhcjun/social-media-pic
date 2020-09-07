import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import DeletePost from '../delete-post/delete-post.component';
import LikeBtn from '../like-btn/like-btn.component';
import CommentInput from '../comment-input/comment-input.component';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import './view-post.styles.scss';

const ViewPost = () => {
  const { postId } = useParams(); // get url params
  const [eachPost, setEachPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentNum, setCommentNum] = useState(0);

  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

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
    if(eachPost.comments){
      setComments(eachPost.comments);
      setCommentNum(eachPost.comments.length);
    }
  }, [eachPost.comments]);


    // user make a comment on the post
    const setComment = (commentedPost) => {
      setComments(commentedPost.comments);
      setCommentNum(commentedPost.comments.length);
    };

  return eachPost ? (
    <div className="view-post">
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
          {eachPost.postedBy ? 
            <Link
              className="username"
              to={ eachPost.postedBy._id !== user._id ? `/profile/${eachPost.postedBy._id}` : '/profile' }
            >
              {eachPost.postedBy.account}
            </Link>
            : 'Loading'}
        </div>
        <DeletePost eachPost={eachPost} />
      </div>
      <div className="post-content">
        <h5>{eachPost.title}</h5>
        <p>{eachPost.content}</p>
      </div>
      <div className="comments">
        {comments ?
          comments.map(eachComment => 
            <div className="each-comment" key={eachComment._id}>
              <span className="comment-name">{eachComment.postedBy.account}</span>
              <span className="comment-text">{eachComment.text}</span>
            </div>
          ) : null}
      </div>
      <div className="icon">
        {eachPost.likes ? <LikeBtn eachPost={eachPost} /> : null}
        <ChatBubbleOutlineIcon className="comment-icon" />
        <span>{commentNum}</span>
      </div>
      <CommentInput setComment={setComment} eachPost={eachPost} />
    </div>
  ) : (
    <h2>Pending</h2>
  );
};

export default ViewPost;
