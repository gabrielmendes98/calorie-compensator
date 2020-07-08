import React, { useEffect, useState } from 'react';

import BackButton from '../../components/BackButton';
import Input from './Input';
import FoodList from './FoodList';

import api from '../../services/api';

import './styles.css';

interface FoodResponse {
  fdcId: string;
  description: string;
  brandOwner: string;
}

interface Food {
  id: string;
  name: string;
  brand: string;
}

const Search = () => {
  const [foodName, setFoodName] = useState('');
  const [foodList, setFoodList] = useState([] as Food[]);

  useEffect(() => {
    if (foodName !== '') {
      const timeout = setTimeout(async () => {
        const response = await api.get(`foods/search?api_key=${process.env.REACT_APP_API_KEY}&query=${foodName}`);
        const foods = response.data.foods;
        const filteredFoods = foods.map((food: FoodResponse) => ({
          id: food.fdcId,
          name: food.description,
          brand: food.brandOwner,
        }));
        setFoodList(filteredFoods);
        console.log(response.data.foods);
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
      {foodList.length !== 0 && <FoodList foods={foodList} />}
    </div>
  );
};

export default Search;
