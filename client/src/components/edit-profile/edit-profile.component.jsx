import React, { useState } from 'react';
import AddImgBtn from '../add-img-btn/add-img-btn.component';
import './edit-profile.styles.scss';

const EditProfile = () => {
  const [avatarImg, setAvatarImg] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  return (
    <div className="edit-profile">
      <div>Avatar</div>
      <AddImgBtn />
    </div>
  );
};

export default EditProfile;
