import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/user/user.context';
import AvatarMenu from '../avatar-menu/avatar-menu.component';
import SearchUser from '../search-user/search-user.component';
import './navigation.styles.scss';

const Navigation = () => {
  const { state } = useContext(UserContext);  // get the value passed by the nearest Context.Provider
  const { user } = state;                               // to get current state in reducer


  return(
    <nav className='navigation'>
      <Link to={user ? '/' : '/signin'} className='logo logo-font'>Silhouette</Link>
      {user && <SearchUser />}
      <div className='options'>
        { user 
          ? <AvatarMenu />
          :(
            <div className='sign-options'>
              <Link to='/signin' className='option'>Sign In</Link>
              <Link to='/signup' className='option'>Sign Up</Link>
            </div>
          )
        }
      </div>
    </nav>
  )
};

export default Navigation;