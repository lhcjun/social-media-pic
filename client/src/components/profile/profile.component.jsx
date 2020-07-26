import React from 'react';
import './profile.styles.scss';

const Profile = () => (
    <div className='profile'>
        <div className='user-info'>
            <img className='profile-img' src='https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='avatars'  />
            <div className='introduction'>
                <h2>Minatozaki Sana</h2>
                <div className='user-activity'>
                    <h4>20 posts</h4>
                    <h4>20 followers</h4>
                    <h4>20 following</h4>
                </div>
                <div>Live in California</div>
            </div>
        </div>
        <div className='gallery'>
            <article className='item'>
                <div className='img-container'>
                    <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='item'
                    className='item-img' />
                </div>
            </article>
            <article className='item'>
                <div className='img-container'>
                    <img src='https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='item'
                    className='item-img' />
                </div>
            </article>
            <article className='item'>
                <div className='img-container'>
                    <img src='https://images.unsplash.com/photo-1543762446-67600aab041f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='item'
                    className='item-img' />
                </div>
            </article>
            <article className='item'>
                <div className='img-container'>
                    <img src='https://images.unsplash.com/photo-1550639524-a6f58345a2ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='item'
                    className='item-img' />
                </div>
            </article>
        </div>
    </div>
);

export default Profile;