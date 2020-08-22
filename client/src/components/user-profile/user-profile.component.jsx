import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../user-info/user-info.component';
import Gallery from '../gallery/gallery.component';
import './user-profile.styles.scss';

const UserProfile = () => {
  const { userId } = useParams();                   // get url params
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
    <div className="user-profile">
      <UserInfo />
      {myPosts.length ? <Gallery userPosts={myPosts} /> : <p>Pending</p>}
    </div>
  );
};

export default UserProfile;
