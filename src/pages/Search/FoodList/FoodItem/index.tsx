import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface Food {
  id: string;
  name: string;
  brand: string;
}

const FoodItem: React.FC<Food> = ({ id, name, brand }) => {
  return (
    <li className="food-list-item">
      <Link to={`/information/${id}`}>
        <p>{name}</p>
        {brand && <span>{brand}</span>}
      </Link>
    </li>
  );
};

export default FoodItem;
