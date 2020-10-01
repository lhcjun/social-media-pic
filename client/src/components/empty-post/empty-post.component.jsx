import React from 'react';
import './empty-post.styles.scss';

const EmptyPost = ({ postOwner }) => (
  <div className="empty center">
    <p className="empty-emoji center">¯\_(●'◡'●)_/¯</p>
    <div className="empty-msg center">{postOwner} have any posts yet</div>
  </div>
);

export default EmptyPost;
