import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import burn from '../../assets/burn.svg';
import api from '../../services/api';

import './styles.css';

enum DataType {
  Foundation = 'Foundation',
  Branded = 'Branded',
  Survey = 'Survey (FNDDS)',
  SRLegacy = 'SR Legacy',
}

enum Nutrient {
  Calories = 1008,
  Fat = 1004,
  Carbs = 1005,
  Protein = 1003,
  Fiber = 1079,
}

interface Props {
  id: string;
}

interface Food {
  description: string;
  dataType: DataType;
  foodNutrients: {
    amount: number;
    nutrient: {
      id: Nutrient;
    };
  }[];
}

interface FoodFoundation extends Food {
  foodPortions: {
    amount: number;
    gramWeight: number;
    measureUnit: {
      name: string;
    };
    modifier?: string;
  }[];
}

interface FoodBranded extends Food {
  householdServingFullText: string;
  servingSize: number;
  servingSizeUnit: string;
}

interface FoodSurvey extends Food {
  foodPortions: {
    portionDescription: string;
    gramWeight: number;
  }[];
}

interface FoodSRLegacy extends Food {
  foodPortions: {
    amount: number;
    modifier: string;
    gramWeight: number;
  }[];
}

interface Serving {
  name: string;
  weight: number;
}

const Information: React.FC<RouteComponentProps<Props>> = ({ match }) => {
  const [quantity, setQuantity] = useState(100);
  const [servings, setServings] = useState<Serving[]>([{ name: 'g', weight: 1 }]);
  const [description, setDescription] = useState('');
  const [nutrients, setNutrients] = useState({
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    fiber: 0,
  });

  const { id } = match.params;

  function extractServings(dataType: string, food: Food) {
    if (dataType === DataType.SRLegacy) {
      const auxFood = food as FoodSRLegacy;
      const foodPortions = auxFood.foodPortions.map((portion) => ({
        amount: portion.amount,
        modifier: portion.modifier,
        weight: portion.gramWeight,
      }));
      const _servings: Serving[] = foodPortions.map((foodPortion) => ({
        name: `${foodPortion.amount} ${foodPortion.modifier} (${foodPortion.weight} g)`,
        weight: foodPortion.weight,
      }));

      setServings((state) => [...state, ..._servings]);
    } else if (dataType === DataType.Branded) {
      const auxFood = food as FoodBranded;
      const serving: Serving = {
        name: `${auxFood.householdServingFullText} (${auxFood.servingSize} ${auxFood.servingSizeUnit})`,
        weight: auxFood.servingSize,
      };
      setServings((state) => [...state, serving]);
    } else if (dataType === DataType.Foundation) {
      const auxFood = food as FoodFoundation;
      const foodPortions = auxFood.foodPortions.map((portion) => ({
        amount: portion.amount,
        weight: portion.gramWeight,
        modifier: portion.modifier,
        measureName: portion.measureUnit.name,
      }));
      const _servings: Serving[] = foodPortions.map((foodPortion) => ({
        name: `${foodPortion.amount} ${foodPortion.measureName} ${foodPortion.modifier || ''} (${
          foodPortion.weight
        } g)`,
        weight: foodPortion.weight,
      }));

      setServings((state) => [...state, ..._servings]);
    } else if (dataType === DataType.Survey) {
      const auxFood = food as FoodSurvey;
      const foodPortions = auxFood.foodPortions.map((portion) => ({
        description: portion.portionDescription,
        weight: portion.gramWeight,
      }));
      const _servings: Serving[] = foodPortions.map((foodPortion) => ({
        name: `${foodPortion.description} (${foodPortion.weight} g)`,
        weight: foodPortion.weight,
      }));

      setServings((state) => [...state, ..._servings]);
    }
  }

  useEffect(() => {
    api.get<Food>(`food/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
      setDescription(response.data.description);
      extractServings(response.data.dataType, response.data);
    });
  }, [id]);

  return (
    <div id="information">
      <div className="header">
        <img src={burn} alt="" />
        <div className="header-text">
          <p>Informations about:</p>
          <p>{description}</p>
        </div>
      </div>
      <div className="content">
        <p>{nutrients.calories} Calories</p>
        <input
          type="number"
          name="quantity"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <span>X</span>
        <select name="servings" id="servings">
          {servings.map((serving) => (
            <option key={serving.name} value={serving.weight}>
              {serving.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Information;
