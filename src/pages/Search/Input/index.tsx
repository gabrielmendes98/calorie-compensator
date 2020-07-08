import React, { InputHTMLAttributes } from 'react';

import { FiSearch } from 'react-icons/fi';

import './styles.css';

const Input: React.FC<InputHTMLAttributes<any>> = ({ value, onChange }) => {
  return (
    <div className="search-input">
      <FiSearch />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Enter a food or brand name"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
