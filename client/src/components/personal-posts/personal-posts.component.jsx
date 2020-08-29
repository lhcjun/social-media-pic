import React from 'react';
import { Link } from 'react-router-dom';
import Post from '../../components/post/post.component';
import './personal-posts.styles.scss';

const PersonalPosts = ({ userPosts }) => (
    <div className="personal-posts center">
      <div className="all-posts">
        {userPosts.length ? (
          userPosts.map((eachPost) => (
            <Post eachPost={eachPost} key={eachPost._id} />
          ))
        ) : (
          <Link to="/createpost" className="empty-post">
            Create your first post !
          </Link>
        )}
      </div>
    </div>
);

export default PersonalPosts;
