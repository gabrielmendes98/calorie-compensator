import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

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

interface Nutrients {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  fiber: number;
}

const Information: React.FC<RouteComponentProps<Props>> = ({ match }) => {
  const [baseNutrients, setBaseNutrients] = useState<Nutrients>({
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
    fiber: 0,
  });
  const [quantity, setQuantity] = useState(100);
  const [servings, setServings] = useState<Serving[]>([{ name: 'g', weight: 1 }]);
  const [description, setDescription] = useState('');
  const [nutrients, setNutrients] = useState<Nutrients>(baseNutrients);
  const [selectedServingWeight, setSelectedServingWeight] = useState(servings[0].weight);

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

  function extractNutrients(foodNutrients: Food['foodNutrients']) {
    const extractedNutrients = foodNutrients.filter((nutrient) => nutrient.nutrient.id in Nutrient);
    let auxNutrients = {
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
      fiber: 0,
    };

    extractedNutrients.forEach((element) => {
      if (element.nutrient.id === Nutrient.Calories) {
        auxNutrients.calories = element.amount;
      } else if (element.nutrient.id === Nutrient.Carbs) {
        auxNutrients.carbs = element.amount;
      } else if (element.nutrient.id === Nutrient.Fat) {
        auxNutrients.fat = element.amount;
      } else if (element.nutrient.id === Nutrient.Fiber) {
        auxNutrients.fiber = element.amount;
      } else if (element.nutrient.id === Nutrient.Protein) {
        auxNutrients.protein = element.amount;
      }
    });

    setBaseNutrients(auxNutrients);
    setNutrients(auxNutrients);
  }

  useEffect(() => {
    api.get<Food>(`food/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
      setDescription(response.data.description);
      extractServings(response.data.dataType, response.data);
      extractNutrients(response.data.foodNutrients);
    });
  }, [id]);

  useEffect(() => {
    const totalGramWeight = quantity * selectedServingWeight;

    const newNutrients = {} as Nutrients;

    let key: keyof Nutrients;

    for (key in nutrients) {
      newNutrients[key] = (baseNutrients[key] * totalGramWeight) / 100;
    }

    setNutrients(newNutrients);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, selectedServingWeight]);

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
        <div className="content-header">
          <p>{Math.round(nutrients.calories)} Calories</p>
          <div>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={quantity.toString()}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <span>x</span>
            <select name="servings" id="servings" onChange={(e) => setSelectedServingWeight(Number(e.target.value))}>
              {servings.map((serving) => (
                <option key={serving.name} value={serving.weight}>
                  {serving.name}
                </option>
              ))}
            </select>
          </div>
          <span className="quantity">Quantity</span>
          <span>Serving</span>
        </div>
        <div className="content-nutrients">
          <div className="nutrient">
            <p>Fat</p>
            <span>{nutrients.fat.toFixed(2)} g</span>
          </div>

          <div className="nutrient">
            <p>Carbs</p>
            <span>{nutrients.carbs.toFixed(2)} g</span>
          </div>

          <div className="nutrient">
            <p>Protein</p>
            <span>{nutrients.protein.toFixed(2)} g</span>
          </div>

          <div className="nutrient">
            <p>Fiber</p>
            <span>{nutrients.fiber.toFixed(2)} g</span>
          </div>
        </div>
      </div>
      <div className="actions">
        <Link to="/search">
          <div>
            <FiArrowLeft />
          </div>
          <span>Back</span>
        </Link>
        <Link to={`/set-weight?calories=${nutrients.calories}`}>
          <span>Next</span>
          <div>
            <FiArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Information;
