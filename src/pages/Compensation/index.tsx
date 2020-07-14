import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { FiDownload } from 'react-icons/fi';

import BackButton from '../../components/BackButton';

import './styles.css';

const Compensation: React.FC<RouteComponentProps> = ({ location }) => {
  const calories = new URLSearchParams(location.search).get('calories');
  const weight = new URLSearchParams(location.search).get('weight');

  return (
    <div id="compensation">
      <div className="header">
        <h2>
          To burn the {`${calories}`} calories ingested when eating grilled chicken breast, you can do any of the
          following activities.
        </h2>
        <button>
          <span>Save as PDF</span>
          <div>
            <FiDownload />
          </div>
        </button>
        <BackButton />
      </div>
    </div>
  );
};

export default Compensation;
