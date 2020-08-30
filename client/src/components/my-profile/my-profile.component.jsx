import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import UserInfo from '../user-info/user-info.component';
import Gallery from '../gallery/gallery.component';
import PersonalPosts from '../personal-posts/personal-posts.component';
import EmptyPost from '../empty-post/empty-post.component';
import AppsIcon from '@material-ui/icons/Apps';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import './my-profile.styles.scss';

const MyProfile = () => {
  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

  const [myPosts, setMyPosts] = useState([]);
  const [blockDisplay, setBlockDisplay] = useState(true);

  useEffect(() => {
    fetch('/myposts', {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((posts) => setMyPosts(posts.myPosts))
      .catch(console.log);
  }, []);

  return (
    <div className="my-profile">
      <UserInfo infoUser={user} posts={myPosts} />
      {blockDisplay 
        ? <ViewAgendaIcon className='block-icon' onClick={() => setBlockDisplay(false)} /> 
        : <AppsIcon className='block-icon' onClick={() => setBlockDisplay(true)} />
      }
      {myPosts.length 
        ? (blockDisplay ? <Gallery userPosts={myPosts} />  : <PersonalPosts userPosts={myPosts} />)
        : <EmptyPost postOwner='You' />
      }
    </div>
  );
};

export default MyProfile;

// myPosts.map(eachPost =>
//     <img src={eachPost.photo} alt={eachPost.title}
//         className='item-img' key={eachPost._id}
//     />
// )
