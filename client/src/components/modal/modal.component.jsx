import React from 'react';
import ReactDOM from 'react-dom';
import './modal.styles.scss';

const Modal = () => {
  return ReactDOM.createPortal(
    <div className="modal-background">
      <div className="modal-card">
        <button className="close-btn" onClick={() => {}}>
          &times;
        </button>
        {/* <p>{modalContent}</p> */}
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
};

export default Modal;
