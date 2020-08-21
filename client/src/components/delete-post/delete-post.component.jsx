import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import { ClickAwayListener } from '@material-ui/core';
import './delete-post.styles.scss';

const DeletePost = ({ eachPost }) => {
  const { state } = useContext(UserContext); // nearest Context.Provide      r
  const { user } = state;

  const [hideMoreDropdown, setHideMoreDropdown] = useState(true);

  const refreshPage = () => {
    window.location.reload(false);
  };

  // user delete the post
  const deletePost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
    })
      .then(res => res.json())
      .then(deletedPost => refreshPage())
      .catch(console.log);
  };

  return (
    <ClickAwayListener onClickAway={() => setHideMoreDropdown(true)}>
      <div className='delete-post'>
        <MoreVertIcon
          className='more-icon'
          onClick={() => setHideMoreDropdown((prevState) => !prevState)}
        />
        {hideMoreDropdown ? null : (
          <div className='more-dropdown'>
            {eachPost.postedBy._id.toString() === user._id.toString() ? (  // obj
              // only the person who publishes the post is allowed to delete the post
              <button
                onClick={() => deletePost(eachPost._id)}
                className='delete-btn'
              >
                <DeleteIcon />
                <span>Delete Post</span>
              </button>
            ) : (
              <button className='btn-unclickable'>
                <DeleteIcon />
                <span>Delete Post</span>
              </button>
            )}
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default DeletePost;
