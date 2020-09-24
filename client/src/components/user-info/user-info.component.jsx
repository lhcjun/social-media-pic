import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import { ModalContext } from '../../contexts/modal/modal.context';
import FollowBtn from '../follow-btn/follow-btn.component';
import ListFollowUser from '../follow-btn/list-follow-users.component';
import './user-info.styles.scss';

const UserInfo = ({ infoUser, posts, setUserProfile }) => {
  // sign in user
  const { state } = useContext(UserContext); // nearest Context.Provider
  const { user } = state;
  const { handleModal } = useContext(ModalContext);

  // get follower & following number
  let followerNum = infoUser ? infoUser.followers.length : 0;
  let followingNum = infoUser ? infoUser.following.length : 0;
  // get follower & following [] (users id)
  let followerUserId = infoUser ? infoUser.followers : [];
  let followingUserId = infoUser ? infoUser.following : [];

  // extract string before @ from email
  // const account = infoUser.email.substring(0, infoUser.email.indexOf('@')); // index start & end

  return (
    <header className="user-info">
      <div className="profile-img">
        <img src={infoUser ? infoUser.profileImg : null} alt="avatars" />
      </div>
      <div className="user-setting">
        <h2>{infoUser ? `${infoUser.account}` : 'Loading'}</h2>
        {user._id === infoUser._id
          ? <button className="edit-btn">
              <Link to="/edit">Edit Profile</Link>
            </button>
          : <FollowBtn setUserProfile={setUserProfile} />
        }
      </div>
      <div className="user-activity">
        <h4>
          <span>{posts ? posts.length : 0}</span> posts
        </h4>
        <h4>
          <span
            onClick={ followerNum === 0 ? null
              : () => handleModal(<ListFollowUser followerUserId={followerUserId} />)
            }
            style={{ cursor: followerNum === 0 ? 'default' : 'pointer' }}
          >
            {followerNum}
          </span>{' '}followers
        </h4>
        <h4>
          <span
            onClick={ followingNum === 0 ? null
              : () => handleModal(<ListFollowUser followingUserId={followingUserId} />)
            }
            style={{ cursor: followingNum === 0 ? 'default' : 'pointer' }}
          >
            {followingNum}
          </span>{' '}following
        </h4>
      </div>
      <div className="bio-area">
        <div className="name">{infoUser ? infoUser.name : null}</div>
        <div className="bio">{infoUser ? infoUser.bio : null}</div>
      </div>
    </header>
  );
};

export default UserInfo;
