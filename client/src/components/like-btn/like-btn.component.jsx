import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import { ModalContext } from '../../contexts/modal/modal.context';
import UserList from '../user-list/user-list.component';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import './like-btn.styles.scss';

const LikeBtn = ({ eachPost }) => {
  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;
  const { showModal, handleModal, modalContent } = useContext(ModalContext);

  // check if the user has already liked the post when componentDidMount  (likes array)
  const [likeClicked, setLikeClicked] = useState(
    eachPost ? eachPost.likes.includes(user._id) : false
  );
  // get like number
  const [likeNum, setLikeNum] = useState(eachPost ? eachPost.likes.length : 0);
  const [likeUsers, setLikeUsers] = useState(eachPost ? eachPost.likes : null);

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
      .then((likedPost) => {
        setLikeClicked(true);
        setLikeNum(likedPost.likes.length);
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
      .then((unlikePost) => {
        setLikeClicked(false);
        setLikeNum(unlikePost.likes.length);
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
            : () =>
                handleModal(
                  <UserList
                    listUsers={likeUsers ? likeUsers : null}
                    closeUserList={handleModal}
                  />
                )
        }
      >
        {likeNum}
      </span>
    </div>
  );
};

export default LikeBtn;
