import React, { useEffect, useState, ChangeEvent } from 'react';

import { FiSearch } from 'react-icons/fi';

import api from '../../../services/api';

import './styles.css';

const Input = () => {
  const [foodName, setFoodName] = useState('');

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(foodName);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [foodName]);

  return (
    <div className="search-input">
      <FiSearch />
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Enter a food or brand name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
    </div>
  );
};

export default Input;
