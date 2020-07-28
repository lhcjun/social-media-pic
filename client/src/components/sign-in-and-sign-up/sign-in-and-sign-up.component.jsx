import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { API_CALL } from '../../assets/api-call';
import Toast from '../toasts/toasts.component';
import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUp = ({ path }) => {
  const history = useHistory();
  const [ userCredentials, setCredentials ] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { name, email, password } = userCredentials;
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleChange = event =>{
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
    console.log(value);
  }

  // const emailFormatValidation = () => {
  //   // regex email format validation
  //   const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   if(!emailRegex.test(email)){
  //     const signUpError = document.querySelector('#signup-error');
  //     signUpError.style.display='flex';
  //     signUpError.textContent = 'Invalid Email Format';
  //     return;
  //   }
  // }

  const postData = event => {
    // event.preventDefault();
    
    fetch('/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
      .then(res => res.json())
      .then(data => {
        // regex email format validation
        // emailFormatValidation();
        
        if(data.error){ // from backend
          const signUpError = document.querySelector('#signup-error');
          signUpError.style.display='flex';
          signUpError.textContent = data.error;
        }else{
          // sign up success
          setShowToast(true);
          setToastMsg(data.message);
          history.push('/signin');
        }
        console.log(data);
      });
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
              <label className='input-label' htmlFor='email-address'>Email</label>
              <input className='input-box' type='email' name='email-address' id='email-address'
                value={email} onChange={handleChange}
              />
            </div>
            {/* Input field - password */}
            <div className='input-field'>
              <label className='input-label' htmlFor='password'>Password</label>
              <input className='input-box' type='password' name='password' id='password'
                autoComplete='off' value={password} onChange={handleChange}
              />
            </div>
          </fieldset>
          {/* Error sign in */}
          {/* <label id='signin-error' className='center'>Incorrect email or password</label> */}
          {/* Error sign up */}
          <label id='signup-error' className='center'></label>
          {/* Submit */}
          <div className='center'>
            {path === '/signup' 
              ? <button className='submit-button center' onClick={() => postData()}>Sign Up</button>
              : <button className='submit-button center'>Sign In</button>
            }
          </div>
          <div className='link-container center'>
            {path === '/signup' 
              ? <Link to='/signin' className='link'>Sign In !</Link>
              : <Link to='/signup' className='link'>Sign Up !</Link>
            }
          </div>
          {showToast ? <Toast type='success' message={toastMsg} /> : null}
        </div>
      </main>
    </article>
  );
};

export default SignInAndSignUp;
