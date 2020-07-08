import React from 'react';

import FoodItem from './FoodItem';

interface Food {
  id: string;
  name: string;
  brand: string;
}

interface Props {
  foods: Food[];
}

const FoodList: React.FC<Props> = ({ foods }) => {
  return (
    <div className="food-list">
      {foods.map((food) => (
        <FoodItem key={food.id} id={food.id} name={food.name} brand={food.brand} />
      ))}
    </div>
  );
};

export default FoodList;
