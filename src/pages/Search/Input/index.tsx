import React from 'react';

import { FiSearch } from 'react-icons/fi';

import './styles.css';

const Input = () => {
  return (
    <div className="search-input">
      <FiSearch />
      <input type="search" name="search" id="search" placeholder="Enter a food or brand name" />
    </div>
  );
};

export default Input;
