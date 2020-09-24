import React, { useState, useEffect, useContext } from 'react';
import { ModalContext } from '../../contexts/modal/modal.context';
import UserList from '../user-list/user-list.component';
import '../modal/modal.styles.scss';

const LikePostUsers = ({ likeUserId }) => {
  const { handleModal } = useContext(ModalContext); // nearest Context.Provider

  const [likeUsers, setLikeUsers] = useState([]);

  useEffect(() => {
    if (likeUserId) {
      fetch('/like-post-users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('jwt'),
        },
        body: JSON.stringify({ likes: likeUserId }),
      })
        .then((res) => res.json())
        .then((users) => setLikeUsers(users.likeUsers))
        .catch(console.log);
    }
  }, [likeUserId]);

  return (
    <React.Fragment>
      {likeUsers ? (
        <UserList
          listUsers={likeUsers}
          title="Likes"
          closeUserList={handleModal}
        />
      ) : (
        <h2 className="modal-pending">Trying to get the users</h2>
      )}
    </React.Fragment>
  );
};

export default LikePostUsers;
