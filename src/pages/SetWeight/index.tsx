import React, { useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';

import BackButton from '../../components/BackButton';

import './styles.css';

const SetWeight: React.FC<RouteComponentProps> = ({ location }) => {
  const [weight, setWeight] = useState(0);

  return (
    <div id="set-weight">
      <BackButton />
      <div className="container">
        <h2>2. Enter your current weight in kg.</h2>
        <div className="weight-input">
          <input
            type="number"
            name="weight"
            id="weight"
            value={weight.toString()}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
          <span>KG</span>
        </div>
        <Link
          to={`/compensation-info?calories=${new URLSearchParams(location.search).get('calories')}&weight=${weight}`}
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

export default SetWeight;
