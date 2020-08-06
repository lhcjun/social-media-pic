import React from 'react';
import { useRouteMatch } from 'react-router';
import SignInAndSignUp from '../../components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import '../sign-in-page/sign-in-page.styles.scss';

const SignUpPage = () => {
  let match = useRouteMatch();
  const path = match.path;

  return(
    <div className='sign-up-page center'>
      <SignInAndSignUp path={path} />
    </div>
  )
};

export default SignUpPage;