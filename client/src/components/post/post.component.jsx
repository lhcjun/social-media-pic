import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import DeletePost from '../delete-post/delete-post.component';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import './post.styles.scss';


const Post = ({ eachPost }) => {
  const { state } = useContext(UserContext);        // nearest Context.Provide      r
  const { user } = state; 

  const [ likeClicked, setLikeClicked ] = useState(false);
  const [ likeNum, setLikeNum ] = useState(0);
  const [ latestComment, setLatestComment ] = useState(null);
  const [ commentNum, setCommentNum ] = useState(0);

  useEffect(() => {
    // check if the user has already liked the post
    eachPost.likes.includes(user._id)               // likes array
    ? setLikeClicked(true)
    : setLikeClicked(false);

    // get like number
    setLikeNum(eachPost.likes.length);
  }, [eachPost.likes, user._id]);

  useEffect(() => {
    // get comment number
    setCommentNum(eachPost.comments.length);
    // get latest comment
    setLatestComment(eachPost.comments[eachPost.comments.length - 1]);
  }, [eachPost.comments]);


  // user like the post 
  const likePost = postId => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: postId })
    })
      .then(res => res.json())
      .then(likedPost => {
          setLikeClicked(true);
          setLikeNum(likedPost.likes.length);
      })
      .catch(console.log);
  };

  // user unlike the post
  const unlikePost = postId => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId })
    })
      .then(res => res.json())
      .then(unlikePost => {
          setLikeClicked(false);
          setLikeNum(unlikePost.likes.length);
      })
      .catch(console.log);
  };

  // user make a comment on the post
  const makeComment = e => {
    e.preventDefault();   // prevent from formally refreshing the page when submitting the form
    const text = e.target[0].value;
    const postId = eachPost._id;

    // no empty comment
    if(text.length){
      fetch('/comment', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('jwt')
        },
        body: JSON.stringify({ postId, text })
      })
        .then(res => res.json())
        .then(commentedPost => {
          let len = commentedPost.comments.length;
          setCommentNum(len);
          setLatestComment(commentedPost.comments[len - 1]);
        })
        .catch(console.log);
    }
    // clear input box after submit
    e.target[0].value = '';
  };


  return (
    <div className='post-frame'>
      <div className='top-row'>
        <div className='post-user'>
          <img
            className='user-img'
            src='https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            alt='user'
          />
          <Link className='username'
            to={eachPost.postedBy._id !== user._id ? `/profile/${eachPost.postedBy._id}` : '/profile'}
          >
            {eachPost.postedBy.name}
          </Link>
        </div>
        <DeletePost eachPost={eachPost} />
      </div>
      <div className='post-img-container center'>
        <img className='post-img' src={eachPost.photo} alt='post-img' />
      </div>
      <div className='icon'>
        {likeClicked 
          ? <FavoriteIcon className='heart-icon' onClick={() => unlikePost(eachPost._id)} />
          : <FavoriteBorderIcon className='heart-border' onClick={() => likePost(eachPost._id)}/>
        }
        <span>{likeNum}</span>
        <ChatBubbleOutlineIcon className='comment-icon' />
        <span>{commentNum}</span>
      </div>
      <div className='post-content'>
        <h5>{eachPost.title}</h5>
        <p>{eachPost.content}</p>
        <form className='comment-container' onSubmit={e => makeComment(e) }>
          <input type='text' placeholder='Add a comment' className='comment' />
          <button><SendIcon className='send' /></button>
        </form>
        {latestComment ? (
          <div className='latest-comment'>
            <span className='comment-name'>{latestComment.postedBy.name}</span>
            <span className='comment-text'>{latestComment.text}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Post;
