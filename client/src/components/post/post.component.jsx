import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import DeletePost from '../delete-post/delete-post.component';
import LikeBtn from '../like-btn/like-btn.component';
import CommentInput from '../comment-input/comment-input.component';

import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
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
          />
          <Link
            className="username"
            to={ eachPost.postedBy._id !== user._id ? `/profile/${eachPost.postedBy._id}` : '/profile' }
          >
            {eachPost.postedBy.account}
          </Link>
        </div>
        <DeletePost eachPost={eachPost} />
      </div>
      <div className="post-img-container center">
        <img className="post-img" src={eachPost.photo} alt="post-img" />
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
        {latestComment ? (
          <div className="latest-comment">
            <span className="comment-name">{latestComment.postedBy.account}</span>
            <span className="comment-text">{latestComment.text}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
