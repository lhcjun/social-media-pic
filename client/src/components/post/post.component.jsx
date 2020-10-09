import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { convertTime } from '../../utils/convert-time';
import UserContext from '../../contexts/user/user.context';
import PostDoMore from '../post-do-more/post-do-more.component';
import LikeBtn from '../like-btn/like-btn.component';
import CommentInput from '../comment-input/comment-input.component';
import EachComment from '../each-comment/each-comment.component';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './post.styles.scss';

const Post = ({ eachPost }) => {
  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

  // get latest comment
  const [latestComment, setLatestComment] = useState(eachPost ? eachPost.comments[eachPost.comments.length - 1] : null);
  // get comment number
  const [commentNum, setCommentNum] = useState(eachPost ? eachPost.comments.length : 0);

  // user make a comment on the post
  const setComment = (commentedPost) => {
    let len = commentedPost.comments.length;
    setCommentNum(len);
    setLatestComment(commentedPost.comments[len - 1]);
  };

  return (
    <div className="post-frame">
      <div className="top-row">
        <div className="post-user">
          <img
            className="user-img"
            src={eachPost.postedBy ? eachPost.postedBy.profileImg : null}
            alt="user"
            loading='lazy'
          />
          <div className='name-area'>
            <Link
              className="username"
              to={ eachPost.postedBy._id !== user._id ? `/profile/${eachPost.postedBy._id}` : '/profile' }
            >
              {eachPost.postedBy.account}
            </Link>
            <div className='posted-at'>
              <ScheduleIcon className='time-icon' />
              {convertTime(eachPost.createdAt)}
            </div>
          </div>
        </div>
        <PostDoMore eachPost={eachPost} />
      </div>
      <div className="post-img-container center">
        <img id="post-img" src={eachPost.photo} alt="post-img" loading='lazy' />
      </div>
      <div className="icon">
        <LikeBtn eachPost={eachPost} />
        <Link to={eachPost._id.length ? `/post/${eachPost._id}` : `/empty`}>
          <ChatBubbleOutlineIcon className="comment-icon" />
        </Link>
        <span>{commentNum}</span>
      </div>
      <div className="post-content">
        <h5>{eachPost.title}</h5>
        <p>{eachPost.content}</p>
        <CommentInput setComment={setComment} eachPost={eachPost} />
        <Link to={eachPost._id.length ? `/post/${eachPost._id}` : `/empty`}>
          {latestComment ? (
            <EachComment eachComment={latestComment} />
          ) : null}
        </Link>
      </div>
    </div>
  );
};

export default React.memo(Post);
