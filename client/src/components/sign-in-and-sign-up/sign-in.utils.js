export const showSignInErrorMsg = error => {
    const signInError = document.querySelector('#signin-error');
    signInError.style.display='flex';
    signInError.textContent = error;
};

  