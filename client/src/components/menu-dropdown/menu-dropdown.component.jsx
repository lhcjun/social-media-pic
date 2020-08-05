import React from 'react';
import { Link } from 'react-router-dom';
import './menu-dropdown.styles.scss';

const MenuDropdown = () => (
    <div className='menu-dropdown'>
        <div className='dropdown-list'>
            <Link to='/profile' className='dropdown-item'>Profile</Link>
            <Link to='/createpost' className='dropdown-item'>Create post</Link>
        </div>
    </div>
);

export default MenuDropdown;