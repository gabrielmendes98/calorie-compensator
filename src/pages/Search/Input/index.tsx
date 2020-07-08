import React, { useEffect, useState } from 'react';

import { FiSearch } from 'react-icons/fi';

import api from '../../../services/api';

import './styles.css';

interface Food {
  description: string;
  brandOwner: string;
}

const Input = () => {
  const [foodName, setFoodName] = useState('');
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    if (foodName !== '') {
      const timeout = setTimeout(async () => {
        const response = await api.get(`foods/search?api_key=${process.env.REACT_APP_API_KEY}&query=${foodName}`);
        const foods = response.data.foods;
        const filteredFoods = foods.map((food: Food) => ({ name: food.description, brand: food.brandOwner }));
        setFoodList(filteredFoods);
        console.log(filteredFoods);
      }, 2000);

      return () => clearTimeout(timeout);
    }
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
