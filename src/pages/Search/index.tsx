import React from 'react';

import BackButton from '../../components/BackButton';
import Input from './Input';

import './styles.css';

const Search = () => {
  return (
    <div id="search-page">
      <div className="header">
        <h2>1. Enter the name of the food you want to eat.</h2>
        <BackButton />
      </div>
      <Input />
    </div>
  );
};

export default Search;
