import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

const DeletePost = ({ eachPost }) => {
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
    // only the person who publishes the post is allowed to delete the post
    <button onClick={() => deletePost(eachPost._id)} className='delete-btn'>
      <DeleteIcon />
      <span>Delete Post</span>
    </button>
  );
};

export default DeletePost;