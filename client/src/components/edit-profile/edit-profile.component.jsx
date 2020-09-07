import React, { useState, useContext } from 'react';
import { useRouteMatch } from 'react-router';
import UserContext from '../../contexts/user/user.context';
import AddImgBtn from '../add-img-btn/add-img-btn.component';
import TextField from '@material-ui/core/TextField';
import { API_CALL } from '../../assets/api-call';
import './edit-profile.styles.scss';

const EditProfile = () => {
  let match = useRouteMatch();
  const path = match.path;
  // sign in user
  const { state } = useContext(UserContext); // nearest Context.Provide      r
  const { user } = state;

  const [avatarImg, setAvatarImg] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
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

  return (
    <div className="edit-profile">
      <div className="avatar-area">
        <h4>Change your profile picture</h4>
        <AddImgBtn
          path={path}
          setImgFile={setAvatarImgFile}
          btnTitle="Upload Img"
        />
      </div>
      <div className="bio-area">
        <TextField
          id="bio-content"
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
    </div>
  );
};

export default EditProfile;
