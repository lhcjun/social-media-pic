import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/post/post.component';
import './following-post-page.styles.scss';

const FollowingPostPage = () => {
  return (
    <div className="following-post-page center">
      <Post />
    </div>
  );
};

export default FollowingPostPage;
