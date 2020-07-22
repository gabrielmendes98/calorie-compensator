import React from 'react';

import BackButton from '../../components/BackButton';

import './styles.css';

const About = () => {
  return (
    <div id="about">
      <BackButton />
      <h1>About</h1>
      <h2>Calories Burned Formula</h2>
      <p>Total calories burned = Duration (in minutes)*(MET*3.5*weight in kg)/200</p>
      <h2>Accuracy</h2>
      <p>
        Keep in mind that this is a very broad estimate and it isn't going to be exact. The only way to get a truly
        accurate number is to go to a lab and have them hook you up to machines that measure everything from your VO2
        max (maximum oxygen uptake) to your maximum heart rate. In addition, there are factors that were disregarded
        here, such as age, body composition, temperature, diet, metabolism, sleep and oxygen intake.
      </p>
      <h2>MET values</h2>
      <span>
        The MET values were taken from: The Compendium of Physical Trackings Guide. Prevention Research Center,
        University of South Carolina. And they can be accessed through{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://prevention.sph.sc.edu/tools/docs/documents_compendium.pdf"
        >
          this link
        </a>
      </span>
    </div>
  );
};

export default About;
