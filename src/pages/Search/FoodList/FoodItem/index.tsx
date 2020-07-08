import React from 'react';

import './styles.css';

interface Food {
  id: string;
  name: string;
  brand: string;
}

const FoodItem: React.FC<Food> = ({ id, name, brand }) => {
  return (
    <li className="food-list-item">
      <p>{name}</p>
      {brand && <span>{brand}</span>}
    </li>
  );
};

export default FoodItem;
