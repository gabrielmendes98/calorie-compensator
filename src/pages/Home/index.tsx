import React from 'react';
import { Link } from 'react-router-dom';

import Explanation from './Explanation';

import fries from '../../assets/fries.png';
import hamburger from '../../assets/hamburger.png';
import coke from '../../assets/coke.png';
import chicken from '../../assets/chicken.png';
import taco from '../../assets/taco.png';
import pizza from '../../assets/pizza.png';
import weightMachine from '../../assets/weight-machine.png';
import exercise1 from '../../assets/exercise1.svg';
import exercise2 from '../../assets/exercise2.svg';
import exercise3 from '../../assets/exercise3.svg';
import exercise4 from '../../assets/exercise4.svg';

import './styles.css';

const Home = () => {
  return (
    <div id="home">
      <h1>Welcome to the Calorie Compensator.</h1>
      <h2>How it works?</h2>
      <div className="explanation-container">
        <Explanation>
          <div className="foods">
            <img className="food" src={fries} alt="fries" />
            <img className="food" src={hamburger} alt="hamburger" />
            <img className="food" src={coke} alt="coke" />
            <img className="food" src={chicken} alt="chicken" />
            <img className="food extra" src={taco} alt="taco" />
            <img className="food extra" src={pizza} alt="pizza" />
          </div>
          <p>1. Choose the food you want to eat.</p>
        </Explanation>
        <Explanation>
          <img src={weightMachine} alt="weightMachine" />
          <p>2. Enter your current weight.</p>
        </Explanation>
        <Explanation>
          <div>
            <img className="exercise" src={exercise1} alt="exercise1" />
            <img className="exercise" src={exercise2} alt="exercise2" />
            <img className="exercise" src={exercise3} alt="exercise3" />
            <img className="exercise last-image" src={exercise4} alt="exercise4" />
          </div>
          <p>3. Ready! We will give you a list of exercises that you can practice to burn the calories ingested.</p>
        </Explanation>

        <Link to="/search">Start now!</Link>
      </div>
    </div>
  );
};

export default Home;
