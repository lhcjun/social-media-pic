import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './search-user.styles.scss';

const SearchUser = () => {
  const [inputUser, setInputUser] = useState('');

  return (
    <div className="search-user">
      <div className={`${inputUser.length ? 'fix-bar' : ''} search-bar`}>
        <input
          type="search"
          placeholder="Who are we looking for ?"
          onChange={(e) => setInputUser(e.target.value)}
        />
        <SearchIcon className="search-icon" />
      </div>
      <div className="search-result">Result</div>
    </div>
  );
};

export default SearchUser;
