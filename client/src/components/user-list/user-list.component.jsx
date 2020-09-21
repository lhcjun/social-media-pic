import React, { useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import { Link } from 'react-router-dom';
// import FollowBtn from '../follow-btn/follow-btn.component';
import './user-list.styles.scss';

const UserList = ({ listUsers, title, closeUserList }) => {
  // sign in user
  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

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
              {/* {user._id === eachUser._id ? null : (
                <div className="follow-btn">
                  <FollowBtn 
                    followedUser={eachUser}
                    // setUserProfile={setUserProfile}
                  />
                </div>
              )} */}
            </article>
          );
        })
      ) : <div className="empty-user">No User</div>}
    </div>
  );
};

export default UserList;
