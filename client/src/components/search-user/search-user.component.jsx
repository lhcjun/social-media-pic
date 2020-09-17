import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './search-user.styles.scss';

const SearchUser = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="search-user">
      <div className="search-bar">
        <input type="search" placeholder="Who are we looking for ?" />
        <SearchIcon className="search-icon" />
      </div>
    </div>
  );
};

export default SearchUser;
