import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../user-info/user-info.component';
import Gallery from '../gallery/gallery.component';
import PersonalPosts from '../personal-posts/personal-posts.component';
import EmptyPost from '../empty-post/empty-post.component';
import AppsIcon from '@material-ui/icons/Apps';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import './user-profile.styles.scss';

const UserProfile = () => {
  const { userId } = useParams(); // get url params
  const [ userProfile, setUserProfile ] = useState(null);
  const [ blockDisplay, setBlockDisplay ] = useState(true);

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwt') },
    })
      .then(res => res.json())
      .then(userAndPosts => setUserProfile(userAndPosts))
      .catch(console.log);
  }, [userId]);

  return (
    <React.Fragment>
      {userProfile ? (
        <div className="user-profile">
          <UserInfo
            infoUser={userProfile.user}
            posts={userProfile.posts}
            setUserProfile={setUserProfile}
          />
          {blockDisplay 
            ? <ViewAgendaIcon className='block-icon' onClick={() => setBlockDisplay(false)} /> 
            : <AppsIcon className='block-icon' onClick={() => setBlockDisplay(true)} />
          }
          {userProfile.posts.length 
            ? (blockDisplay ? <Gallery userPosts={userProfile.posts} /> : <PersonalPosts userPosts={userProfile.posts} />) 
            : <EmptyPost postOwner={userProfile.user.name} />
          }
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </React.Fragment>
  );
};

export default UserProfile;
