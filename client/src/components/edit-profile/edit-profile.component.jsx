import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import { updateUserAvatar, updateUserProfile } from '../../reducers/user/user.reducer';
import AddImgBtn from '../add-img-btn/add-img-btn.component';
import TextField from '@material-ui/core/TextField';
import { API_CALL } from '../../assets/api-call';
import { convertDate } from '../../utils/convert-time';
import './edit-profile.styles.scss';

const EditProfile = () => {
  const history = useHistory();
  let match = useRouteMatch();
  const path = match.path;
  // sign in user
  const { state, dispatch } = useContext(UserContext); // nearest Context.Provide      r
  const { user } = state;

  const [avatarImg, setAvatarImg] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [name, setName] = useState(user.name ? user.name : '');
  const [bio, setBio] = useState(user.bio ? user.bio : '');

  const setAvatarImgFile = (file) => setAvatarImg(file); // input img data

  useEffect(() => {
    if (avatarUrl) {
      // update avatar only after uploading img to cloudinary and getting back img url
      fetch('/update-avatar', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
        },
        body: JSON.stringify({ profileImg: avatarUrl }),
      })
        .then((res) => res.json())
        .then((updatedUser) => {
          /* update user obj (sign in user) － with profileImg */
          // 1. update sessionStorage user obj (sign in user)
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
          // 2. update reducer user state (my profile page)
          dispatch(updateUserAvatar(updatedUser));
          history.push('/profile');
        })
        .catch(console.log);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarUrl]); // (for dependencies warning)

  const onImgSubmit = () => {
    if (avatarImg) {
      // upload img file (to cloudinary) with FormData & fetch
      const formData = new FormData();
      // append data into formData obj (convert into a data format that can be sent to the backend)
      formData.append('file', avatarImg);
      formData.append('upload_preset', 'social-media-pic'); // cloudinary
      formData.append('cloud_name', 'jl'); // cloudinary

      // upload img > return uploaded img url
      fetch(API_CALL.IMG_UPLOAD, {
        method: 'post',
        body: formData,
      })
        .then((res) => res.json())
        .then((postedImg) => setAvatarUrl(postedImg.secure_url))
        .catch(console.log);
    }
  };

  const onProfileUpdate = (updatedData) => {
    // upload profile img to cloudinary and update avatar
    onImgSubmit();
    // update bio, name
    if (name !== user.name || bio !== user.bio) {
      fetch('/update-profile', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
        },
        body: JSON.stringify({ formInput: updatedData }),
      })
        .then((res) => res.json())
        .then((updatedUser) => {
          /* update user obj (sign in user) － with profileImg */
          // 1. update sessionStorage user obj (sign in user)
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
          // 2. update reducer user state (my profile page)
          dispatch(updateUserProfile(updatedUser));
          if (!avatarImg) {
            history.push('/profile');
          }
        })
        .catch(console.log);
    }
  };

  return (
    <div className="edit-profile">
      <h3 className='title'>Edit Profile</h3>
      <div className="avatar-area">
        <div className='username-area'>
          <div className="account">{user.account ? user.account : 'Loading'}</div>
          <div className="join-date">{user.createdAt ? `Joined: ${convertDate(user.createdAt)}` : null}</div>
        </div>
        <AddImgBtn
          path={path}
          setImgFile={setAvatarImgFile}
          btnTitle="Upload Img"
        />
      </div>
      <div className="name-area">
        <TextField
          id="edit-name" label="Name" variant="outlined" margin="normal"
          value={name} fullWidth
          onChange={(e) => setName(e.target.value)}
          inputProps={{ maxLength: 30 }}
        />
        <span>{name.length > 20 ? `${name.length} / 30` : null}</span>
      </div>
      <div className="bio-area">
        <TextField
          id="edit-bio" label="Bio" variant="outlined" margin="normal"
          value={bio} multiline rows={3} fullWidth
          onChange={(e) => setBio(e.target.value)}
          inputProps={{ maxLength: 100 }}
        />
        <span>{bio.length > 85 ? `${bio.length} / 100` : null}</span>
      </div>
      {/* Submit */}
      <div className="submit-btn">
        <button className="save-btn"
          onClick={() => onProfileUpdate({ name, bio })}
        >Save</button>
        <button className="cancel-btn"
          onClick={() => history.push('/profile')}
        >Cancel</button>
      </div>
      {/* Reset Password */}
      <div className="reset-password-area">
        <h3>Reset Password</h3>
        <p>Click the button below and enter your email, we'll send you the link to reset your password.</p>
        <button onClick={() => history.push('/reset-password')}>Go Reset Password</button>
      </div>
    </div>
  );
};

export default EditProfile;
