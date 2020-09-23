import React, { useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import { useHistory } from 'react-router-dom';
// import FollowBtn from '../follow-btn/follow-btn.component';
import './user-list.styles.scss';

const UserList = ({ listUsers, title, closeUserList }) => {
  const history = useHistory();
  // sign in user
  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

  const checkProfile = (eachUser) => {
    closeUserList();
    history.push(eachUser._id !== user._id ? `/profile/${eachUser._id}` : `/profile`);
  }

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
                <h1 onClick={() => checkProfile(eachUser)}>{`@` + eachUser.account}</h1>
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
