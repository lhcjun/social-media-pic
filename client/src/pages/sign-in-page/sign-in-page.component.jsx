import React from 'react';
import { useRouteMatch } from 'react-router';
import SignInAndSignUp from '../../components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import './sign-in-page.styles.scss';


const SignInPage = () => {
  let match = useRouteMatch();
  const path = match.path;

  return (
    <div className='sign-in-page center'>
      <SignInAndSignUp path={path} />
    </div>
  )
};

export default SignInPage;  