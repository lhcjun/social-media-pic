import React, { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../../contexts/modal/modal.context';
import UserList from '../user-list/user-list.component';
import '../modal/modal.styles.scss';

const ListFollowUser = ({ followerUserId, followingUserId }) => {
  const { handleModal } = useContext(ModalContext); // nearest Context.Provider

  const [followingUsers, setFollowingUsers] = useState([]);
  const [followerUsers, setFollowerUsers] = useState([]);

  useEffect(() => {
    if (followerUserId) {
      fetch('/list-follower-users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
        },
        body: JSON.stringify({ follower: followerUserId }),
      })
        .then((res) => res.json())
        .then((users) => setFollowerUsers(users.followerUsers))
        .catch(console.log);
    }
  }, [followerUserId]);

  useEffect(() => {
    if (followingUserId) {
      fetch('/list-following-users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
        },
        body: JSON.stringify({ following: followingUserId }),
      })
        .then((res) => res.json())
        .then((users) => setFollowingUsers(users.followingUsers))
        .catch(console.log);
    }
  }, [followingUserId]);


  return (
    <React.Fragment>
      {followingUserId
        ? (followingUsers ? (
            <UserList
                listUsers={followingUsers}
                title="Following"
                closeUserList={handleModal}
            />
            ) : <h2 className="modal-pending">Trying to get the users</h2>
          )
        : (followerUsers ? (
            <UserList
                listUsers={followerUsers}
                title="Follower"
                closeUserList={handleModal}
            />
            ) : <h2 className="modal-pending">Trying to get the users</h2>
          )
      }
    </React.Fragment>
  );
};

export default ListFollowUser;
