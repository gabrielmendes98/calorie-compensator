import React from 'react';

interface Food {
  id: string;
  name: string;
  brand: string;
}

const FoodItem: React.FC<Food> = ({ id, name, brand }) => {
  return (
    <div className="food-list-item">
      <p>{name}</p>
      <span>{brand}</span>
    </div>
  );
};

export default FoodItem;
