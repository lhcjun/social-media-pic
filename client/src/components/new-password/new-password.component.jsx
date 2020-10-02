import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Spinner from '../spinner/spinner.component';
import '../reset-password/reset-password.styles.scss';

const NewPassword = () => {
  const { token } = useParams(); // get url params
  const history = useHistory();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);

  const showMsg = (error) => {
    const newPasswordMsg = document.querySelector('#new-password-msg');
    newPasswordMsg.style.display = 'flex';
    newPasswordMsg.textContent = error;
  };

  const onSubmit = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return; // exit
    }
    // set spinner on 'update password btn'
    setShowSpinner(true);

    fetch('/new-password', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword, token }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShowSpinner(false);
        if (data.error) {
          showMsg(data.error);
        } else {
          // successfully update new password
          history.push('/signin');
        }
      })
      .catch(console.log);
  };

  return (
    <div className="new-password center">
      <h3>Set New Password</h3>
      <p>Enter your new password.</p>
      {/* Input field - new password */}
      <div className="input-field">
        <label className="input-label" htmlFor="new-password">
          New Password
        </label>
        <input
          className="input-box"
          type="password"
          name="new-password"
          id="new-password"
          autoComplete="off"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      {/* Input field - confirm password */}
      <div className="input-field">
        <label className="input-label" htmlFor="confirm-new-password">
          Confirm Password
        </label>
        <input
          className="input-box"
          type="password"
          name="confirm-new-password"
          id="confirm-new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="center">
        <button className="reset-button center" onClick={() => onSubmit()}>
          {!showSpinner ? 'Update Password' : <Spinner size={'small'} />}
        </button>
      </div>
      {/* Error msg */}
      <p id="new-password-msg" className="center"></p>
    </div>
  );
};

export default NewPassword;
