import React, { useState } from 'react';

const useModal = () => {
  let [ showModal, setShowModal ] = useState(false);
  let [ modalContent, setModalContent ] = useState("Content");

  let handleModal = (content = false) => {
    setShowModal(!showModal);
    if (content) {
      setModalContent(content);
    }
  };

  return { showModal, handleModal, modalContent };
};

export default useModal;