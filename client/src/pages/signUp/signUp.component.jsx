import React from 'react';
import { Link } from 'react-router-dom';
import '../signIn/signIn.styles.scss';

const SignUpPage = () => (
    
    <div className='center'>
        <article className='card-frame center'>
            <main className='frame-inner'>
              <form className='form-content'>
                <fieldset id='sign_up' className='sign-field'>
                  <legend className='title center logo-font'>Instagram</legend>
                  {/* Input field - name */}
                    <div className='input-field-top'>
                      <label className='input-label' htmlFor='name'>Name</label>
                      <input 
                        className='input-box' type='text' name='name'  id='name'
                      />
                    </div>
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
                {/* Submit */}
                <div className='center'>
                  <button className='submit-button center'>Sign Up</button>
                </div>
                <div className='link-container center'>
                  <Link to='/signin' className='link'>Sign In !</Link>
                </div>
              </form>
            </main>
          </article>
        </div>

);

export default SignUpPage;  