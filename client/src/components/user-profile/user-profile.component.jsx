import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../user-info/user-info.component';
import Gallery from '../gallery/gallery.component';
import './user-profile.styles.scss';

const UserProfile = () => {
  const { userId } = useParams(); // get url params
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetch(`/user/${userId}`, {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((userAndPosts) => setUserProfile(userAndPosts))
      .catch(console.log);
  }, [userId]);

  // when follow btn is clicked > update userProfile state (the followed user's follower [])
  const setUserFollower = followerUser => {
    setUserProfile(prevState => {                    
      const alreadyFollowed = prevState.user.followers.includes(followerUser._id);

      if (!alreadyFollowed) {
        // add sign in user to follower array
        return {
          ...prevState,             // user & posts
          user: {
            ...prevState.user,
            followers: [...prevState.user.followers, followerUser._id],
          },
        };
      }
      return prevState;
    });
  };

  // when unfollow btn is clicked
  const removeUserFollower = unfollowerUser => {
    setUserProfile(prevState => {
      const alreadyFollowed = prevState.user.followers.includes(unfollowerUser._id);
      if(alreadyFollowed){
        // remove sign in user from follower array
        return {
          ...prevState,             // user & posts
          user: {
            ...prevState.user,
            followers: prevState.user.followers.filter(eachId => eachId !== unfollowerUser._id )
          }
        }
      }
      return prevState;
    });
  };

  return (
    <React.Fragment>
      {userProfile ? (
        <div className="user-profile">
          <UserInfo
            user={userProfile.user}
            posts={userProfile.posts}
            setUserFollower={setUserFollower}
            removeUserFollower={removeUserFollower}
          />
          {userProfile.posts.length ? (
            <Gallery userPosts={userProfile.posts} />
          ) : (
            <p>Pending</p>
          )}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </React.Fragment>
  );
};

export default UserProfile;
