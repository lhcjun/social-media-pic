import React from 'react';
import { useRouteMatch } from 'react-router';
import SignInAndSignUp from '../../components/sign-in-and-sign-up/sign-in-and-sign-up.component';

const SignUpPage = () => {
  let match = useRouteMatch();
  const path = match.path;

  return(
    <div className='center'>
      <SignInAndSignUp path={path} />
    </div>
  )
};

export default SignUpPage;