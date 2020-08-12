import React, { useContext } from "react";
import UserContext from "../../contexts/user/user.context";
import "./user-info.styles.scss";

const UserInfo = () => {
  const { state, dispatch } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;

  return (
    <header className="user-info">
      <div className="profile-img">
        <img
          src="https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="avatars"
        />
      </div>
      <div className="user-setting">
        <h2>{user ? user.name : "Loading"}</h2>
        <button className="edit-btn">Edit Profile</button>
      </div>
      <div className="user-activity">
        <h4>
          <span>200</span> posts
        </h4>
        <h4>
          <span>200</span> followers
        </h4>
        <h4>
          <span>200</span> following
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
