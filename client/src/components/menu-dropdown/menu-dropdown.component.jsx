import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import { clearUserState } from '../../reducers/user/user.reducer';

import PersonIcon from '@material-ui/icons/Person';
import CreateIcon from '@material-ui/icons/Create';
import SettingsIcon from '@material-ui/icons/Settings';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './menu-dropdown.styles.scss';

const MenuDropdown = () => {
    const history = useHistory();
    const { state, dispatch } = useContext(UserContext);        // nearest Context.Provider
    const { user } = state;

    const onSubmitSignOut = () => {
        sessionStorage.clear();         // clear all
        dispatch(clearUserState());
        history.push('/signin');
    };

    return(
        <div className='menu-dropdown'>
            <div className='dropdown-list'>
                <div className="account">{user ? `@${user.account}` : 'Signed in'}</div>
                <hr />
                <Link to='/profile' className='dropdown-item'>
                    <PersonIcon className='option-icon' />
                    Profile
                </Link>
                <Link to='/createpost' className='dropdown-item'>
                    <CreateIcon className='option-icon' />
                    Create post
                </Link>
                <Link to='/edit' className='dropdown-item'>
                    <SettingsIcon className='option-icon' />
                    Setting
                </Link>
                <Link to='/liked-post' className='dropdown-item'>
                    <FavoriteIcon className='option-icon' />
                    Liked Posts
                </Link>
                <Link to='/saved-post' className='dropdown-item'>
                    <BookmarksIcon className='option-icon' />
                    Saved Posts
                </Link>
                <hr />
                <button className='sign-out' onClick={() => onSubmitSignOut()}>
                    <ExitToAppIcon className='sign-out-icon' />
                    Sign Out
                </button>
            </div>
        </div>
    )
};

export default MenuDropdown;