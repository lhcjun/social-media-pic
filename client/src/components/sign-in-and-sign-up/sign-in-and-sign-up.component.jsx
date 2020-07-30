import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { showSignInErrorMsg } from './sign-in.utils';
import { showSignUpErrorMsg } from './sign-up.utils';
import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUp = ({ path }) => {
  const history = useHistory();
  const [ userCredentials, setCredentials ] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { name, email, password, confirmPassword } = userCredentials;

  const handleChange = event =>{
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  }

  const onSubmitSignUp = () => {
    // event.preventDefault();
    // check password match
    if(password !== confirmPassword){
      alert("Passwords don't match");
      return; // exit
    }

    fetch('/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
        if(data.error){ // from backend
          showSignUpErrorMsg(data.error);
        }else{
          // sign up success
          showSignUpErrorMsg('');
          history.push('/signin');
        }
      })
    .catch(console.log);
};

const onSubmitSignIn = () => {
    // event.preventDefault();
    fetch('/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
        if(data.error){ // from backend
          showSignInErrorMsg(data.error);
        }else{
          // sign in success
          showSignInErrorMsg('');
          history.push('/');
        }
      })
    .catch(console.log);
};

  return (
    <article className='card-frame center'>
      <main className='frame-inner'>
        <div className='form-content'>
          <fieldset
            id={path === '/signup' ? 'sign_up' : 'sign_in'}
            className='sign-field'
          >
            <legend className='title center logo-font'>Instagram</legend>
            {/* Input field - name */}
            {path === '/signup' ? (
              <div className='input-field-top'>
                <label className='input-label' htmlFor='name'>Name</label>
                <input className='input-box' type='text' name='name' id='name'
                  value={name}    /* event.target.value */
                  onChange={event => handleChange(event)}
                />
              </div>
            ) : null}
            {/* Input field - email */}
            <div className='input-field-top'>
              <label className='input-label' htmlFor='email'>Email</label>
              <input className='input-box' type='email' name='email' id='email'
                value={email} onChange={handleChange}
              />
            </div>
            {/* Input field - password */}
            <div className='input-field-top'>
              <label className='input-label' htmlFor='password'>Password</label>
              <input className='input-box' type='password' name='password' id='password'
                autoComplete='off' value={password} onChange={handleChange}
              />
            </div>
            {/* Input field - confirm password */}
            {path === '/signup' ? (
              <div className='input-field'>
                <label className='input-label' htmlFor='confirmPassword'>Confirm Password</label>
                <input className='input-box' type='password' name='confirmPassword'   
                  id='confirmPassword' value={confirmPassword} onChange={handleChange}
                />
              </div>
            ) : null}
          </fieldset>
          {/* Error msg */}
          <label id={path === '/signup' ? 'signup-error' : 'signin-error'} className='center'></label>
          {/* Submit */}
          <div className='center'>
            {path === '/signup' 
              ? <button className='submit-button center' onClick={() => onSubmitSignUp()}>Sign Up</button>
              : <button className='submit-button center' onClick={() => onSubmitSignIn()}>Sign In</button>
            }
          </div>
          <div className='link-container center'>
            {path === '/signup' 
              ? <Link to='/signin' className='link'>Sign In !</Link>
              : <Link to='/signup' className='link'>Sign Up !</Link>
            }
          </div>
        </div>
      </main>
    </article>
  );
};

export default SignInAndSignUp;
