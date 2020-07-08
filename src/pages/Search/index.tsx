import React, { useEffect, useState } from 'react';

import BackButton from '../../components/BackButton';
import Input from './Input';

import api from '../../services/api';

import './styles.css';

interface Food {
  description: string;
  brandOwner: string;
}

const Search = () => {
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
    <div id="search-page">
      <div className="header">
        <h2>1. Enter the name of the food you want to eat.</h2>
        <BackButton />
      </div>
      <div className="search">
        <Input value={foodName} onChange={(e) => setFoodName(e.target.value)} />
        <button>Search</button>
      </div>
    </div>
  );
};

export default Search;
