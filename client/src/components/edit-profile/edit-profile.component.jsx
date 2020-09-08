import React, { useState, useContext } from 'react';
import { useRouteMatch } from 'react-router';
import UserContext from '../../contexts/user/user.context';
import {
  updateUserAvatar,
  updateUserProfile,
} from '../../reducers/user/user.reducer';
import AddImgBtn from '../add-img-btn/add-img-btn.component';
import TextField from '@material-ui/core/TextField';
import { API_CALL } from '../../assets/api-call';
import './edit-profile.styles.scss';

const EditProfile = () => {
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

  const onImgSubmit = () => {
    if (avatarImg) {
      // upload img file with FormData & fetch
      const formData = new FormData();
      // append data into formData obj (convert into a data format that can be sent to the backend)
      formData.append('file', avatarImg);
      formData.append('upload_preset', 'social-media-pic'); // cloudinary
      formData.append('cloud_name', 'jl'); // cloudinary

      console.log(formData);
      if (formData) {
        // upload img > get uploaded img url
        fetch(API_CALL.IMG_UPLOAD, {
          method: 'post',
          body: formData,
        })
          .then((res) => res.json())
          .then((postedImg) => setAvatarUrl(postedImg.secure_url))
          .catch(console.log);
      }
    }
  };

  const onAvatarUpdate = () => {
    if (avatarUrl) {
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
          console.log(updatedUser);
          /* update user obj (sign in user) － with profileImg */
          // 1. update sessionStorage user obj (sign in user)
          sessionStorage.setItem('user', JSON.stringify(updatedUser));
          // 2. update reducer user state (my profile page)
          dispatch(updateUserAvatar(updatedUser));
        })
        .catch(console.log);
    }
  };

  const onProfileUpdate = (updatedData) => {
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
        console.log(updatedUser);
        /* update user obj (sign in user) － with profileImg */
        // 1. update sessionStorage user obj (sign in user)
        sessionStorage.setItem('user', JSON.stringify(updatedUser));
        // 2. update reducer user state (my profile page)
        dispatch(updateUserProfile(updatedUser));
      })
      .catch(console.log);
  };

  // onProfileUpdate = updatedData => {
  //   fetch(API_CALL.PROFILE_ID + `${this.props.user.id}`, {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': window.sessionStorage.getItem('token')
  //     },
  //     body: JSON.stringify({ formInput: updatedData })
  //   })
  //     .then(res => {
  //       if(res.status === 200 || res.status === 304){ // 304 => browser return cache version
  //         this.props.toggleModal();
  //         // overwrite original user state with updatedData in formInput > for loadUser to setState(user)
  //         this.props.loadUser({ ...this.props.user, ...updatedData });
  //       }
  //     })
  //     .catch(console.log)
  // }

  return (
    <div className="edit-profile">
      {/* <h4>Update your profile info</h4> */}
      <div className="avatar-area">
        <div className="account">{user.account ? user.account : 'Loading'}</div>
        <AddImgBtn
          path={path}
          setImgFile={setAvatarImgFile}
          btnTitle="Upload Img"
        />
      </div>
      <div className="name-area">
        <TextField
          id="edit-name"
          label="Name"
          variant="outlined"
          margin="normal"
          value={name}
          fullWidth
          onChange={(e) => setName(e.target.value)}
          inputProps={{ maxLength: 30 }}
        />
        <span>{name.length > 20 ? `${name.length} / 30` : null}</span>
      </div>
      <div className="bio-area">
        <TextField
          id="edit-bio"
          label="Bio"
          variant="outlined"
          margin="normal"
          value={bio}
          multiline
          rows={3}
          fullWidth
          onChange={(e) => setBio(e.target.value)}
          inputProps={{ maxLength: 100 }}
        />
        <span>{bio.length > 85 ? `${bio.length} / 100` : null}</span>
      </div>
      {/* Submit */}
      <button
        className="save-btn"
        onClick={() => onProfileUpdate({ name, bio })}
      >
        Save
      </button>
    </div>
  );
};

export default EditProfile;
