import React, { useState } from 'react';
import { useRouteMatch } from 'react-router';
import AddImgBtn from '../add-img-btn/add-img-btn.component';
import { API_CALL } from '../../assets/api-call';
import './edit-profile.styles.scss';

const EditProfile = () => {
  let match = useRouteMatch();
  const path = match.path;

  const [avatarImg, setAvatarImg] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

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
    </div>
  );
};

export default EditProfile;
