import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/user/user.context';
import MenuDropdown from '../menu-dropdown/menu-dropdown.component';
import { ClickAwayListener } from '@material-ui/core';
import './avatar-menu.styles.scss';

const AvatarMenu = () => {
    const { state } = useContext(UserContext); // nearest Context.Provide      r
    const { user } = state;

    const [ hideDropdown, setHideDropdown ] = useState(true);

    return(
      <ClickAwayListener onClickAway={() => setHideDropdown(true)}>
        <div className='avatar-menu'>
            <div className='user-avatar' onClick={() => setHideDropdown(prevState => !prevState)}>
                <img src={user ? user.profileImg : null} className='avatar-img' alt='avatar' />
            </div>
            { hideDropdown ? null : <MenuDropdown /> }
        </div>
      </ClickAwayListener>
    )
};

export default AvatarMenu;