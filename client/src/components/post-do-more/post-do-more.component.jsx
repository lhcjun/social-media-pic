import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import DeletePost from '../delete-post/delete-post.component';
import SavePost from '../save-post/save-post.component';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ClickAwayListener } from '@material-ui/core';
import './post-do-more.styles.scss';

const PostDoMore = ({ eachPost }) => {
  const { state } = useContext(UserContext); // nearest Context.Provide      r
  const { user } = state;

  const [hideMoreDropdown, setHideMoreDropdown] = useState(true);

  return (
    <ClickAwayListener onClickAway={() => setHideMoreDropdown(true)}>
      <div className="post-do-more">
        <MoreVertIcon
          className="more-icon"
          onClick={() => setHideMoreDropdown((prevState) => !prevState)}
        />
        {hideMoreDropdown ? null : (
          <div className="more-dropdown">
            {eachPost.postedBy._id.toString() === user._id.toString()   // obj
              // only the person who publishes the post is allowed to delete the post
              ? <DeletePost eachPost={eachPost} />
              : <SavePost eachPost={eachPost} />
            }
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default PostDoMore;
