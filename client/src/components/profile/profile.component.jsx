import React, { useEffect, useState } from 'react';
import UserInfo from '../user-info/user-info.component';
import Gallery from '../gallery/gallery.component';
import './profile.styles.scss';

const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    fetch('/myposts', {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((posts) => setMyPosts(posts.myPosts))
      .catch(console.log);
  }, []);

  return (
    <div className='profile'>
      <UserInfo />
      {myPosts.length ? <Gallery userPosts={myPosts} /> : <p>Pending</p>}
    </div>
  );
};

export default Profile;

// myPosts.map(eachPost =>
//     <img src={eachPost.photo} alt={eachPost.title}
//         className='item-img' key={eachPost._id}
//     />
// )
