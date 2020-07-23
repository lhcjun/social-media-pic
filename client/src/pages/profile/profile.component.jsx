import React from 'react';
import './profile.styles.scss';

const ProfilePage = () => (
    <div className='profile-page'>
        <div className='user-info'>
            <img className='profile-img' src='https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='avatars'  />
            <div className='introduction'>
                <h2>Minatozaki Sana</h2>
                <div className='user-activity'>
                    <h4>20 posts</h4>
                    <h4>20 followers</h4>
                    <h4>20 following</h4>
                </div>
                <div>Live in Calerfornia</div>
            </div>
        </div>
        <div className='gallery'>
            <article className='item'>
                <div className='img-container'>
                    <img src='http://mrmrs.github.io/images/0006.jpg' alt='item'
                    className='item-img' />
                </div>
            </article>
            <article className='item'>
                <div className='img-container'>
                    <img src='http://mrmrs.github.io/images/0006.jpg' alt='item'
                    className='item-img' />
                </div>
            </article>
            <article className='item'>
                <div className='img-container'>
                    <img src='http://mrmrs.github.io/images/0006.jpg' alt='item'
                    className='item-img' />
                </div>
            </article>
            <article className='item'>
                <div className='img-container'>
                    <img src='http://mrmrs.github.io/images/0006.jpg' alt='item'
                    className='item-img' />
                </div>
            </article>

    {/* 參考 https://tachyons.io/components/collections/square-title-subtitle/index.html */}
        </div>
    </div>
);

export default ProfilePage;  