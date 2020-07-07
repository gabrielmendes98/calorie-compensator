import React from 'react';
import { useHistory } from 'react-router';

import { FiCornerDownLeft } from 'react-icons/fi';

import './styles.css';

const BackButton = () => {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <span id="back-button" onClick={handleClick}>
      <FiCornerDownLeft /> Back
    </span>
  );
};

export default BackButton;
