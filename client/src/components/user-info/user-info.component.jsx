import React from 'react';
import FollowBtn from '../follow-btn/follow-btn.component';
import './user-info.styles.scss';

const UserInfo = ({ user, posts, setUserFollower, removeUserFollower }) => {
  // get email account (extract string before @ from email)
  let emailLength = user.email.indexOf('@');
  const account = user.email.substring(0, emailLength); // index start & end

  return (
    <header className="user-info">
      <div className="profile-img">
        <img
          src="https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="avatars"
        />
      </div>
      <div className="user-setting">
        <h2>{user ? user.name : 'Loading'}</h2>
        <div className="account">(@{account})</div>
        <button className="edit-btn">Edit Profile</button>
        <FollowBtn
          setUserFollower={setUserFollower}
          removeUserFollower={removeUserFollower}
        />
      </div>
      <div className="user-activity">
        {posts ? (
          <h4>
            <span>{posts.length}</span> posts
          </h4>
        ) : null}
        {user ? (
          <React.Fragment>
            <h4>
              <span>{user.followers.length}</span> followers
            </h4>
            <h4>
              <span>{user.following.length}</span> following
            </h4>
          </React.Fragment>
        ) : null}
      </div>
      <div className="bio">
        Using the order property will create a disconnect between the visual
        presentation of content and DOM order
      </div>
    </header>
  );
};

export default UserInfo;
