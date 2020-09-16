import React, { useState, useEffect } from 'react';
import Post from '../../components/post/post.component';
import EmptyPost from '../../components/empty-post/empty-post.component';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top.component';
import './homepage.styles.scss';

const HomePage = () => {
  const [ allPosts, setAllPosts ] = useState([]);

  // get my posts & my following user's posts
  useEffect(() => {
    fetch('/homeposts', {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwt') },
    })
      .then(res => res.json())
      .then(posts => {
        setAllPosts(posts.homePosts); // array
      })
      .catch(console.log);
  }, []);

  return (
    <div className="homepage center">
      <div className="all-posts">
        {allPosts.length 
          ? allPosts.map(eachPost => (
              <Post eachPost={eachPost} key={eachPost._id} />
            ))
          : <div>
              <EmptyPost postOwner='You' />
              <div className="empty-post">Go follow a user to get started !</div>
            </div>
        }
      </div>
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
