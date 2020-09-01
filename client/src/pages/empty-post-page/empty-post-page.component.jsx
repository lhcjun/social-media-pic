import React from 'react';
import './empty-post-page.styles.scss';

const EmptyPostPage = () => (
  <div className="empty-post-page center">
    <p className="empty-emoji center">(┬┬﹏┬┬)</p>
    <div className="empty-msg center">Didn't find the post</div>
    <div className="empty-msg-sm center">It might have been removed</div>
  </div>
);

export default EmptyPostPage;
