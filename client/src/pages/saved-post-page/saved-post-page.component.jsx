import React, { useState, useEffect } from 'react';
import Post from '../../components/post/post.component';
import EmptyPost from '../../components/empty-post/empty-post.component';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top.component';
import '../homepage/homepage.styles.scss';

const SavedPostPage = () => {
  const [allPosts, setAllPosts] = useState([]);

  // get my saved posts
  useEffect(() => {
    fetch('/saved-posts', {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((posts) => {
        setAllPosts(posts.savedPosts); // array
      })
      .catch(console.log);
  }, []);

  return (
    <div className="saved-post-page center">
      <div className="all-posts">
        {allPosts.length ? (
          allPosts.map((eachPost) => (
            <Post eachPost={eachPost} key={eachPost._id} />
          ))
        ) : (
          <div>
            <EmptyPost postOwner="You don't" />
            <div className="empty-post">Click save & read the article later</div>
          </div>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default SavedPostPage;
