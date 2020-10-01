import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import { ModalContext } from '../../contexts/modal/modal.context';
import { updateUserLikedPost } from '../../reducers/user/user.reducer';

import LikePostUsers from './like-post-users.component';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './like-btn.styles.scss';

const LikeBtn = ({ eachPost }) => {
  const { state, dispatch } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;
  const { handleModal } = useContext(ModalContext);

  // check if the user has already liked the post when componentDidMount  (likes array)
  const [likeClicked, setLikeClicked] = useState(eachPost ? eachPost.likes.includes(user._id) : false);
  // get like number
  const [likeNum, setLikeNum] = useState(eachPost ? eachPost.likes.length : 0);
  // get likes [] (users id)
  const [likeUserId, setLikeUserId] = useState(eachPost ? eachPost.likes : []);

  
  // user like the post
  const likePost = (postId) => {
    fetch('/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: postId }),
    })
      .then((res) => res.json())
      .then((result) => {
        /* update post obj (sign in user) － with likes */
        setLikeClicked(true);
        setLikeNum(result.likedPost.likes.length);
        setLikeUserId(result.likedPost.likes);
        /* update user obj (sign in user) － with liked */
        // 1. update sessionStorage user obj (sign in user)
        sessionStorage.setItem('user', JSON.stringify(result.likedPostUser));
        // 2. update reducer user state (my profile page)
        dispatch(updateUserLikedPost(result.likedPostUser));
      })
      .catch(console.log);
  };

  // user unlike the post
  const unlikePost = (postId) => {
    fetch('/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId }),
    })
      .then((res) => res.json())
      .then((result) => {
        /* update post obj (sign in user) － with likes */
        setLikeClicked(false);
        setLikeNum(result.unlikePost.likes.length);
        setLikeUserId(result.unlikePost.likes);
        /* update user obj (sign in user) － with liked */
        // 1. update sessionStorage user obj (sign in user)
        sessionStorage.setItem('user', JSON.stringify(result.unlikePostUser));
        // 2. update reducer user state (my profile page)
        dispatch(updateUserLikedPost(result.unlikePostUser));
      })
      .catch(console.log);
  };

  return (
    <div className="like-btn">
      {likeClicked ? (
        <FavoriteIcon
          className="heart-icon"
          onClick={() => unlikePost(eachPost._id)}
        />
      ) : (
        <FavoriteBorderIcon
          className="heart-border"
          onClick={() => likePost(eachPost._id)}
        />
      )}
      <span
        onClick={
          likeNum === 0
            ? null
            : () => handleModal(<LikePostUsers likeUserId={likeUserId} />)
        }
        style={{ cursor: likeNum === 0 ? 'default' : 'pointer' }}
      >
        {likeNum}
      </span>
    </div>
  );
};

export default LikeBtn;
