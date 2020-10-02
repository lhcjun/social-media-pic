import React from 'react';
import './toasts.styles.scss';


/*****  Toast type = success || error || warning || info || question  *****/


const closeToastWithButton = () => {
    const toastContainer = document.querySelector('.toast-container');
    toastContainer.remove();
}

const Toast = ({ type, message, timer = 5000 }) => {
    // close toast with timer
    setTimeout(() => {
        const toastContainer = document.querySelector('.toast-container');
        if(toastContainer){
            toastContainer.remove();
        }
    }, timer);

    return (
        <div className={`toast-container ${type}-bg`}>
            <div>
                <div className='toast-frame'>
                    <img className='toast-img' alt='' src={require(`./icon/${type}.svg`)} />  
                    <span className='toast-message'>{`${message}`}</span>
                    <div className='toast-close' onClick={() => closeToastWithButton()}>&#10005;</div>
                </div>
                <div className={`toast-timer ${type}-timer`} style={{animation: `timer ${timer}ms linear`}} />
            </div>
        </div>
    )
};

export default Toast;