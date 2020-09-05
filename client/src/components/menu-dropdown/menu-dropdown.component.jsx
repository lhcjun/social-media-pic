import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import { clearUserState } from '../../reducers/user/user.reducer';
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
                <Link to='/profile' className='dropdown-item'>Profile</Link>
                <Link to='/createpost' className='dropdown-item'>Create post</Link>
                <Link to='/edit' className='dropdown-item'>Setting</Link>
                <hr />
                <button className='sign-out' onClick={() => onSubmitSignOut()}>Sign Out</button>
            </div>
        </div>
    )
};

export default MenuDropdown;