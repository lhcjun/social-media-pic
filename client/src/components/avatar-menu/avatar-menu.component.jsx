import React, { useState } from 'react';
import MenuDropdown from '../menu-dropdown/menu-dropdown.component';
import { ClickAwayListener } from '@material-ui/core';
import './avatar-menu.styles.scss';

const AvatarMenu = () => {
    const [ hideDropdown, setHideDropdown ] = useState(true);

    return(
      <ClickAwayListener onClickAway={() => setHideDropdown(true)}>
        <div className='avatar-menu'>
            <div className='user-avatar' onClick={() => setHideDropdown(prevState => !prevState)}>
                <img src="http://tachyons.io/img/logo.jpg" className='avatar-img' alt='avatar' />
            </div>
            { hideDropdown ? null : <MenuDropdown /> }
        </div>
      </ClickAwayListener>
    )
};

export default AvatarMenu;