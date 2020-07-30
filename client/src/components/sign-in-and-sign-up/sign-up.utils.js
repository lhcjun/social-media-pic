export const showSignUpErrorMsg = error => {
    const signUpError = document.querySelector('#signup-error');
    signUpError.style.display='flex';
    signUpError.textContent = error;
};