import React, { useState } from 'react';
import UserList from '../user-list/user-list.component';
import SearchIcon from '@material-ui/icons/Search';
import { ClickAwayListener } from '@material-ui/core';
import './search-user.styles.scss';

const SearchUser = () => {
  const [inputUser, setInputUser] = useState('');
  const [resultedUsers, setResultedUsers] = useState([]);
  const [showList, setShowList] = useState(false);

  const fetchResultUsers = (query) => {
    // set user input
    setInputUser(query);
    // set show list
    setShowList(true);
    // fetch resulted users
    fetch('/search-users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((resultUsers) => setResultedUsers(resultUsers.users))
      .catch(console.log);
  };

  const closeUserList = () => {
    // clear user input
    setInputUser('');
    setShowList(false);
  };

  return (
    <div className="search-user">
      <div className={`${inputUser.length ? 'fix-bar' : ''} search-bar`}>
        <input
          type="search"
          value={inputUser}
          placeholder="Who are we looking for ?"
          onChange={(e) => fetchResultUsers(e.target.value)}
        />
        <SearchIcon className="search-icon" />
      </div>
      {showList && 
        <ClickAwayListener onClickAway={() => closeUserList()}>
          <div className="search-result">
            <UserList listUsers={resultedUsers} title="Search Result" closeUserList={closeUserList} />
          </div>
        </ClickAwayListener>
      }
    </div>
  );
};

export default SearchUser;
