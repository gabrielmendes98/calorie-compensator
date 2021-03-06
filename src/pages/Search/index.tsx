import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

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

const Search: React.FC<RouteComponentProps> = ({ history, location }) => {
  const [foodName, setFoodName] = useState('');
  const [foodList, setFoodList] = useState([] as Food[]);
  const [page, setPage] = useState(1);

  async function fetchData() {
    const params = new URLSearchParams(location.search);
    const _page = Number(params.get('page'));

    if (_page) {
      setPage(_page);
    }

    const response = await api.get(
      `foods/search?api_key=${process.env.REACT_APP_API_KEY}&query=${foodName}&pageSize=15&pageNumber=${_page}`
    );
    const foods = response.data.foods;
    const filteredFoods = foods.map((food: FoodResponse) => ({
      id: food.fdcId,
      name: food.description,
      brand: food.brandOwner,
    }));
    console.log(page);
    setFoodList(filteredFoods);
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const _page = Number(params.get('page'));

    if (_page) {
      setPage(_page);
    }

    if (foodName !== '') {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (foodName !== '') {
      const timeout = setTimeout(() => {
        history.push({ pathname: '/search', search: '?page=1' });
        fetchData();
      }, 2000);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodName]);

  return (
    <div id="search-page">
      <div className="header">
        <h2>1. Search and select the food you want to eat.</h2>
        <BackButton />
      </div>
      <div className="search">
        <Input value={foodName} onChange={(e) => setFoodName(e.target.value)} />
        <button onClick={fetchData}>Search</button>
      </div>
      {foodList.length !== 0 && <FoodList foods={foodList} />}
      <div className="pagination">
        <Link
          to={{ pathname: '/search', search: `?page=${page - 1}` }}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
          className={page === 1 ? 'disabled' : ''}
        >
          <div>
            <FiArrowLeft />
          </div>
          <span>Back</span>
        </Link>
        <div className="number">
          <p>Page</p>
          <span>{page}</span>
        </div>
        <Link
          to={{ pathname: '/search', search: `?page=${page + 1}` }}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
        >
          <span>Next</span>
          <div>
            <FiArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Search;
