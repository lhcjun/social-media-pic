import React from 'react';
import { Link } from 'react-router-dom';
import './sign-in-and-sign-up.styles.scss';


const SignInAndSignUp = ({ path }) => (
    <article className='card-frame center'>
      <main className='frame-inner'>
        <form className='form-content'>
          <fieldset id={ path === '/signup' ? 'sign_up' : 'sign_in'} className='sign-field'>
            <legend className='title center logo-font'>Instagram</legend>
              {/* Input field - name */}
              { path === '/signup' ?
                (
                  <div className='input-field-top'>
                    <label className='input-label' htmlFor='name'>Name</label>
                    <input 
                      className='input-box' type='text' name='name'  id='name'
                    />
                  </div>
                )
                : null
              }
              {/* Input field - email */}
              <div className='input-field-top'>
                  <label className='input-label' htmlFor='email-address'>Email</label>
                  <input 
                      className='input-box' type='email' name='email-address'  id='email-address'
                  />
              </div>
              {/* Input field - password */}
              <div className='input-field'>
                  <label className='input-label' htmlFor='password'>Password</label>
                  <input 
                    className='input-box' type='password' name='password'  id='password' autoComplete='off'
                  />
              </div>
          </fieldset>
          {/* Error login */}
          {/* <label id='loginError' className='center'>Incorrect email or password</label> */}
          {/* Error Register */}
          {/* <label id='loginError' className='center'></label> */}
          {/* Submit */}
          <div className='center'>
            { path === '/signup' 
              ? <button className='submit-button center'>Sign Up</button>
              : <button className='submit-button center'>Sign In</button>
            }
          </div>
          <div className='link-container center'>
            { path === '/signup' 
              ? <Link to='/signin' className='link'>Sign In !</Link>
              : <Link to='/signup' className='link'>Sign Up !</Link>
            }
          </div>
        </form>
      </main>
    </article>
);

export default SignInAndSignUp;