import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/post/post.component';
import EmptyPost from '../../components/empty-post/empty-post.component';
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
      <button className="add-post-btn center">
        <Link to="/createpost" className="add-icon">&#43;</Link>
      </button>
    </div>
  );
};

export default HomePage;
