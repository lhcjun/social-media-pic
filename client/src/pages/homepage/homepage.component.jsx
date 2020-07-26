import React from 'react';
import Post from '../../components/post/post.component';
import './homepage.styles.scss';

const HomePage = () => (
  <div className='homepage center'>
    <div className='all-posts'>
      <Post />
    </div>
  </div>
);

export default HomePage;
