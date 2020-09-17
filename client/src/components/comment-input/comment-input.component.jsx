import React, { useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import './comment-input.styles.scss';

const CommentInput = ({ setComment, eachPost }) => {
    const [ commentLength, setCommentLength ] = useState(0);

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
          .then(commentedPost => setComment(commentedPost))
          .catch(console.log);
      }
      // clear input box after submit
      e.target[0].value = '';
      setCommentLength(0);
    };

    return(
      <div className='comment-container'>
        <form className='comment-input' onSubmit={e => makeComment(e) }>
          {/* <input type='text' placeholder='Add a comment' className='comment' 
            maxLength='300' onChange={e => setCommentLength(e.target.value.length)}
          /> */}
          <TextField
            id={eachPost._id} label='Add a comment' margin='dense'
            fullWidth multiline rowsMax={4} variant='outlined' 
            onChange={e => setCommentLength(e.target.value.length)}
            inputProps={{ maxLength: 300 }}
          />
          <button><SendIcon className='send' /></button>
        </form>
        <div className='max-len'>{commentLength > 250 ? `${commentLength} / 300` : null}</div>
      </div>
    );
};

export default CommentInput;
