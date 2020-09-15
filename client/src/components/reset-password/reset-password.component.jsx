import React, { useState, useEffect } from 'react';
import Toast from '../toasts/toasts.component.jsx';
import './reset-password.styles.scss';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [redMsg, setRedMsg] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const resetPasswordMsg = document.querySelector('#reset-password-msg');
    if (redMsg) {
      resetPasswordMsg.style.color = 'rgb(155, 12, 36)';
    } else {
      resetPasswordMsg.style.color = 'rgb(14, 167, 90)';
    }
  }, [redMsg]);

  const showMsg = (backendMsg) => {
    const resetPasswordMsg = document.querySelector('#reset-password-msg');
    resetPasswordMsg.style.display = 'flex';
    resetPasswordMsg.textContent = backendMsg;
  };

  const onSubmit = () => {
    fetch('/reset-password', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setRedMsg(true);
          showMsg(data.error);
        } else {
          // successfully send email to reset password
          setRedMsg(false);
          showMsg(data.message);
          setShowToast(true);
        }
      })
      .catch(console.log);
  };

  return (
    <div className="reset-password center">
      <h3>Reset Password</h3>
      <p>Enter your email and we'll send you a link to get back into your account.</p>
      {/* Input field - email */}
      <div className="input-field">
        <label className="input-label" htmlFor="send-email">Email</label>
        <input
          className="input-box"
          type="email"
          name="send-email"
          id="send-email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="center">
        <button className="reset-button center" onClick={() => onSubmit()}>
          Reset Password
        </button>
      </div>
      {/* Error / Success msg */}
      <p id="reset-password-msg" className="center"></p>
      {/* Toast */}
      {showToast ? <Toast type='success' message='Email Successfully Sent' /> : null} 
    </div>
  );
};

export default ResetPassword;
