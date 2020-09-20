import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import { Link } from 'react-router-dom';
import FollowBtn from '../follow-btn/follow-btn.component';
import './user-list.styles.scss';

const UserList = ({ listUsers, title, closeUserList }) => {
  // const [ eachUserId, setEachUserId ] = ('');
  const [ userProfile, setUserProfile ] = useState(null);
  // sign in user
  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

  // useEffect(() => {
  //   fetch(`/user/${eachUserId}`, {
  //     headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwt') },
  //   })
  //     .then(res => res.json())
  //     .then(userAndPosts => setUserProfile(userAndPosts))
  //     .catch(console.log);
  // }, [eachUserId]);

  return (
    <div className="user-list center">
      <div className="top-row">
        <h2>{title}</h2>
        {/* Close button */}
        <div className="list-close" onClick={() => closeUserList()}>&times;</div>
      </div>
      {listUsers.length ? (
        listUsers.map((eachUser) => {
          return (
            <article className="each-user" key={eachUser._id}>
              <div className="user-img">
                <img src={eachUser.profileImg} alt='user' />
              </div>
              <div className="user-name">
                <Link to={eachUser._id !== user._id ? `/profile/${eachUser._id}` : `/profile`}>
                  <h1 onClick={() => closeUserList()}>{`@` + eachUser.account}</h1>
                </Link>
                <h2>{eachUser.name}</h2>
              </div>
              {user._id === eachUser._id ? null : (
                <div className="follow-btn">
                  <FollowBtn 
                    followedUser={eachUser} 
                    // userProfile={userProfile} 
                    setUserProfile={setUserProfile}
                  />
                </div>
              )}
            </article>
          );
        })
      ) : <div className="empty-user">No User</div>}
    </div>
  );
};

export default UserList;
