import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './homepage.styles.scss';

const HomePage = () => (
  <div className='homepage center'>
    <div className='home-posts'>
      <div className='post-frame'>
        <div className='top-row'>
            <div className='post-user'>
                <img
                    className='user-img'
                    src='https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                    alt='user'
                />
                <div className='username'>Minatozaki Sana</div>
            </div>
            <MoreVertIcon className='more-btn' />
        </div>
        <div className='post-img-container center'>
          <img
            className='post-img'
            src='https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
            alt='post-img'
          />
        </div>
        <FavoriteIcon className='heart-btn' />
        <div className='post-content'>
          <h5>Title</h5>
          <p>Here is a new post.</p>
          <div className='comment-container'>
            <input
              type='text'
              placeholder='Add a comment'
              className='comment'
            />
            <SendIcon className='send' />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
