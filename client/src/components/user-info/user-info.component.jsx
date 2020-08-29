import React, { useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import FollowBtn from '../follow-btn/follow-btn.component';
import './user-info.styles.scss';

const UserInfo = ({ infoUser, posts, setUserFollower, removeUserFollower }) => {
  // sign in user
  const { state } = useContext(UserContext); // nearest Context.Provide      r
  const { user } = state;

  // get email account (extract string before @ from email)
  let emailLength = infoUser.email.indexOf('@');
  const account = infoUser.email.substring(0, emailLength); // index start & end

  return (
    <header className="user-info">
      <div className="profile-img">
        <img
          src="https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="avatars"
        />
      </div>
      <div className="user-setting">
        <h2>{infoUser ? infoUser.name : 'Loading'}</h2>
        <div className="account">(@{account})</div>
        {user._id === infoUser._id
          ? <button className="edit-btn">Edit Profile</button>
          : <FollowBtn
              setUserFollower={setUserFollower}
              removeUserFollower={removeUserFollower}
            />
        }
      </div>
      <div className="user-activity">
        <h4>
          <span>{posts ? posts.length : 0}</span> posts
        </h4>
        <h4>
          <span>{infoUser ? infoUser.followers.length : 0}</span> followers
        </h4>
        <h4>
          <span>{infoUser ? infoUser.following.length : 0}</span> following
        </h4>
      </div>
      <div className="bio">
        Using the order property will create a disconnect between the visual
        presentation of content and DOM order
      </div>
    </header>
  );
};

export default UserInfo;
