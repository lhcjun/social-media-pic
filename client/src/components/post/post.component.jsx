import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './post.styles.scss';

const Post = ({ eachPost }) => (
    <div className='post-frame'>
        <div className='top-row'>
            <div className='post-user'>
                <img
                    className='user-img'
                    src='https://images.unsplash.com/photo-1570731102433-34470efb6acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                    alt='user'
                />
                <div className='username'>{eachPost.postedBy.name}</div>
            </div>
            <MoreVertIcon className='more-icon' />
        </div>
        <div className='post-img-container center'>
            <img className='post-img' src={eachPost.photo} alt='post-img' />
        </div>
        <FavoriteIcon className='heart-icon' />
        <div className='post-content'>
            <h5>{eachPost.title}</h5>
            <p>{eachPost.content}</p>
            <div className='comment-container'>
                <input type='text' placeholder='Add a comment' className='comment'/>
                <SendIcon className='send' />
            </div>
        </div>
    </div>
);

export default Post;
