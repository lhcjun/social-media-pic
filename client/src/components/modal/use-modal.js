import { useState } from 'react';

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('Content');

  const handleModal = (content = false) => {
    setShowModal(!showModal);
    if (content) {
      setModalContent(content);
    }
  };

  return { showModal, handleModal, modalContent };
};

export default useModal;
