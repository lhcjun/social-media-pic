import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/post/post.component';
import './homepage.styles.scss';

const HomePage = () => {
  const [ postData, setPostData ] = useState([]);

  useEffect(() => {
    fetch('/allposts', {
      headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')}
    })
      .then(res => res.json())
      .then(posts => {
        setPostData(posts.allPosts);        // array
      })   
      .catch(console.log);
  }, []);

  return(
    <div className='homepage center'>
      <div className='all-posts'>
        {postData.length
          ? postData.map(eachPost => <Post eachPost={eachPost} key={eachPost._id} />)
          : <Link to='/createpost' className='empty-post'>Create your first post !</Link>
        }
      </div>
      <button className='add-post-btn center'>
        <Link to='/createpost' className='add-icon'>&#43;</Link>
      </button>
    </div>
  )
};

export default HomePage;
