import React from 'react';
import MyProfile from '../../components/my-profile/my-profile.component';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top.component';
import './profile-page.styles.scss';

const ProfilePage = () => (
  <div className="profile-page">
    <MyProfile />
    <ScrollToTop />
  </div>
);

export default ProfilePage;
