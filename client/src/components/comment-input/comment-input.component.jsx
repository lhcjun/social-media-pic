import React from 'react';
import SendIcon from '@material-ui/icons/Send';

const CommentInput = ({ setComment, eachPost }) => {
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
            setComment(commentedPost);
          })
          .catch(console.log);
      }
      // clear input box after submit
      e.target[0].value = '';
    };

    return(
        <form className='comment-container' onSubmit={e => makeComment(e) }>
          <input type='text' placeholder='Add a comment' className='comment' />
          <button><SendIcon className='send' /></button>
        </form>
    );
};

export default CommentInput;
