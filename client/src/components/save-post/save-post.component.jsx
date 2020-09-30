import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import { updateUserSavePost } from '../../reducers/user/user.reducer';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

const SavePost = ({ eachPost }) => {
  // sign in user
  const { state, dispatch } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

  // check if the user has already saved the post when componentDidMount  (saved array)
  const [saveClicked, setSaveClicked] = useState(user ? user.saved.includes(eachPost._id) : false);

  // user save the post
  const savePost = (postId) => {
    fetch('/save-post', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId }),
    })
      .then((res) => res.json())
      .then((savedPostUser) => {
        setSaveClicked(true);
        /* update user obj (sign in user) － with saved */
        // 1. update sessionStorage user obj (sign in user)
        sessionStorage.setItem('user', JSON.stringify(savedPostUser));
        // 2. update reducer user state (my profile page)
        dispatch(updateUserSavePost(savedPostUser));
      })
      .catch(console.log);
  };

  // user unsave the post
  const unsavePost = (postId) => {
    fetch('/unsave-post', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId }),
    })
      .then((res) => res.json())
      .then((unsavedPostUser) => {
        setSaveClicked(false);
        /* update user obj (sign in user) － with saved */
        // 1. update sessionStorage user obj (sign in user)
        sessionStorage.setItem('user', JSON.stringify(unsavedPostUser));
        // 2. update reducer user state (my profile page)
        dispatch(updateUserSavePost(unsavedPostUser));
      })
      .catch(console.log);
  };

  return saveClicked ? (
    <button onClick={() => unsavePost(eachPost._id)} className="unsave-btn">
      <BookmarkBorderIcon />
      <span>UnSave Post</span>
    </button>
  ) : (
    <button onClick={() => savePost(eachPost._id)} className="save-btn">
      <BookmarkIcon />
      <span>Save Post</span>
    </button>
  );
};

export default SavePost;
