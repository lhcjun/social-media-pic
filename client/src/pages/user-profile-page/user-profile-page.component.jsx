import React from 'react';
import UserProfile from '../../components/user-profile/user-profile.component';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top.component';
import './user-profile-page.styles.scss';

const UserProfilePage = () => (
    <div className='user-profile-page'>
        <UserProfile />
        <ScrollToTop />
    </div>
);

export default UserProfilePage;
