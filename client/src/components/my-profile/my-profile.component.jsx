import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import UserInfo from '../user-info/user-info.component';
import Gallery from '../gallery/gallery.component';
import './my-profile.styles.scss';

const MyProfile = () => {
  const { state, dispatch } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

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
    <div className='my-profile'>
      <UserInfo user={user} />
      {myPosts.length ? <Gallery userPosts={myPosts} /> : <p>Pending</p>}
    </div>
  );
};

export default MyProfile;

// myPosts.map(eachPost =>
//     <img src={eachPost.photo} alt={eachPost.title}
//         className='item-img' key={eachPost._id}
//     />
// )
