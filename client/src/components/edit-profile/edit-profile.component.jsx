import React, { useState } from 'react';
import './edit-profile.styles.scss';

const EditProfile = () => {
  const [avatarImg, setAvatarImg] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  return <div className="edit-profile"></div>;
};

export default EditProfile;
