import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ModalContext } from '../../contexts/modal/modal.context';
import './modal.styles.scss';

const Modal = () => {
  let { showModal, handleModal, modalContent } = useContext(ModalContext); // nearest Context.Provider
  if (showModal) {
    return ReactDOM.createPortal(
      <div className="modal-background">
        <div className="modal-card">
          <button className="close-btn" onClick={() => handleModal()}>
            &times;
          </button>
          <React.Fragment>{modalContent}</React.Fragment>
        </div>
      </div>,
      document.querySelector('#modal-root')
    );
  } else return null;
};

export default Modal;
