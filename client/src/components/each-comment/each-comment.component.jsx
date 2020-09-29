import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import './each-comment.styles.scss';

const EachComment = ({ eachComment }) => {
  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;
  const history = useHistory();

  const scrollDown = useRef();

  if (eachComment && scrollDown.current) {
    scrollDown.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="each-comment">
      <div ref={scrollDown}></div>
      <img
        src={eachComment ? eachComment.postedBy.profileImg : null}
        alt="avatar"
      />
      <div className="comment-content">
        <div
          className="comment-name"
          onClick={() =>
            history.push(
              eachComment.postedBy._id !== user._id
                ? `/profile/${eachComment.postedBy._id}`
                : '/profile'
            )
          }
        >
          {eachComment.postedBy.account}
        </div>
        <div className="comment-text">{eachComment.text}</div>
      </div>
    </section>
  );
};

export default EachComment;
