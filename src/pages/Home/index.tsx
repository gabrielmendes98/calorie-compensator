import React from 'react';

import Explanation from './Explanation';

import fries from '../../assets/fries.png';
import hamburger from '../../assets/hamburger.png';
import coke from '../../assets/coke.png';
import chicken from '../../assets/chicken.png';
import weightMachine from '../../assets/weight-machine.png';
import exercise1 from '../../assets/exercise1.svg';
import exercise2 from '../../assets/exercise2.svg';
import exercise3 from '../../assets/exercise3.svg';

import './styles.css';

const Home = () => {
  return (
    <div id="home">
      <h1>Welcome to the Calorie Compensator.</h1>
      <h2>How it works?</h2>
      <div className="explanation-container">
        <Explanation>
          <div>
            <img src={fries} alt="fries" />
            <img src={hamburger} alt="hamburger" />
            <img src={coke} alt="coke" />
            <img src={chicken} alt="chicken" />
          </div>
          <p>1. Choose the food you want to eat.</p>
        </Explanation>
        <Explanation>
          <img src={weightMachine} alt="weightMachine" />
          <p>2. Enter your current weight.</p>
        </Explanation>
        <Explanation>
          <div>
            <img className="exercise" src={exercise1} alt="weightMachine" />
            <img className="exercise" src={exercise2} alt="weightMachine" />
            <img className="exercise" src={exercise3} alt="weightMachine" />
          </div>
          <p>3. Ready! We will give you a list of exercises that you can practice to burn the calories ingested.</p>
        </Explanation>
        <button>Start now!</button>
      </div>
    </div>
  );
};

export default Home;
