import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './post.styles.scss';


const Post = ({ eachPost }) => {
  const { state } = useContext(UserContext);        // nearest Context.Provide      r
  const { user } = state; 

  const [ likeClicked, setLikeClicked ] = useState(false);
  const [ likeNum, setLikeNum ] = useState(0);

  useEffect(() => {
    // check if the user has already liked the post
    eachPost.likes.includes(user._id)               // likes array
    ? setLikeClicked(true)
    : setLikeClicked(false);

    // get like number
    setLikeNum(eachPost.likes.length);

  }, [eachPost.likes, user._id]);


  // user like the post 
  const likePost = postId => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: postId }),
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
      body: JSON.stringify({ postId }),
    })
      .then(res => res.json())
      .then(unlikePost => {
          setLikeClicked(false);
          setLikeNum(unlikePost.likes.length);
      })
      .catch(console.log);
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
          <div className='username'>{eachPost.postedBy.name}</div>
        </div>
        <MoreVertIcon className='more-icon' />
      </div>
      <div className='post-img-container center'>
        <img className='post-img' src={eachPost.photo} alt='post-img' />
      </div>
      <div className='icon'>
        {likeClicked 
          ? <FavoriteIcon className='heart-icon' onClick={() => unlikePost(eachPost._id)} />
          : <FavoriteBorderIcon className='heart-border' onClick={() => likePost(eachPost._id)}/>
        }
        <ChatBubbleOutlineIcon className='comment-icon' />
      </div>
      <h6 className='like-num'>{likeNum} likes</h6>
      <div className='post-content'>
        <h5>{eachPost.title}</h5>
        <p>{eachPost.content}</p>
        <div className='comment-container'>
          <input type='text' placeholder='Add a comment' className='comment' />
          <SendIcon className='send' />
        </div>
      </div>
    </div>
  );
};

export default Post;
