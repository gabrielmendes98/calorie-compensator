import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';

import BackButton from '../../components/BackButton';

import './styles.css';

const SetWeight = () => {
  return (
    <div id="set-weight">
      <BackButton />
      <div className="container">
        <h2>2. Enter your current weight in kg.</h2>
        <div className="weight-input">
          <input type="number" name="weight" id="weight" />
          <span>KG</span>
        </div>
        <Link to={`/`}>
          <span>Next</span>
          <div>
            <FiArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SetWeight;
