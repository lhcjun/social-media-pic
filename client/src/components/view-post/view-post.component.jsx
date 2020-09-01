import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './view-post.styles.scss';

const ViewPost = () => {
  const { postId } = useParams(); // get url params
  const [eachPost, setEachPost] = useState({});

  useEffect(() => {
    fetch(`/eachpost/${postId}`, {
      headers: { Authorization: 'Bearer ' + sessionStorage.getItem('jwt') },
    })
      .then((res) => res.json())
      .then((post) => setEachPost(post.eachPost))
      .catch(console.log);
  }, [postId]);

  return <div className="view-post">{eachPost ? eachPost.content : null}</div>;
};

export default ViewPost;
