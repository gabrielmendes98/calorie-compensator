import React from 'react';

import googlePlayBadge from '../../assets/google-play-badge.png';

import './styles.css';

const Footer = () => {
  return (
    <footer>
      <div id="footer">
        <div>
          <p>
            Developed by
            <br />
            Gabriel Santiago
          </p>
          <p>gabrielmssantiago@gmail.com</p>
          <img src={googlePlayBadge} alt="Get it on Google Play" />
        </div>
        <div className="left">
          <p>More information about the formulas and sources used in the development of this application</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
