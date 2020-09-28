import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import './each-comment.styles.scss';

const EachComment = ({ eachComment }) => {
  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

  return (
    <section className="each-comment">
      <div className="user-avatar">
        <img
          src={eachComment ? eachComment.postedBy.profileImg : null}
          className="avatar-img"
          alt="avatar"
        />
      </div>
    </section>
  );
};

export default EachComment;
