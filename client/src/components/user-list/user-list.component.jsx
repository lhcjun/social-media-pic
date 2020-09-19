import React, { useState, useEffect } from 'react';
import FollowBtn from '../follow-btn/follow-btn.component';
import './user-list.styles.scss';

const UserList = () => {
  const [inputUser, setInputUser] = useState('');

  return (
    <div className="user-list center">
      <div className='list-close'>&times;</div>
      <article className="each-user">
        <div className="user-img">
          <img src="http://mrmrs.github.io/photos/p/2.jpg" />
        </div>
        <div className="user-name">
          <h1>@yafegsapoqiekrct</h1>
          <h2>Youngamksl Gavwtchdell Hiwqloe</h2>
        </div>
        <div className="follow-btn">
          <FollowBtn />
        </div>
      </article>
    </div>
  );
};

export default UserList;
