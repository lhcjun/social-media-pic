import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import './follow-btn.styles.scss';

const FollowBtn = () => {
  // sign in user
  const { state } = useContext(UserContext); // nearest Context.Provide      r
  const { user } = state;
  // profile page user
  const { userId } = useParams(); // get url params

  const followUser = () => {
    fetch('/follow', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
      },
      body: JSON.stringify({ followedId: userId }), // user to be followed = profile page user
    })
      .then((res) => res.json())
      .then((followerUser) => {
        console.log(followerUser);
        // 要更新 user 才能更新 follower & following 數量
        /* 要更新的 user  
            1. sessionStorage 的 sign in user (主動追蹤 / 取消追蹤)
            2. state 裡的 user (user state)
            3. other user profile 的 user (被追蹤 / 取消追蹤)
        */
      })
      .catch(console.log);
  };

  return <button className="follow-btn">Follow</button>;
};

export default FollowBtn;
