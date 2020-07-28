import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import BackButton from '../../components/BackButton';
import activityValues from '../../data/activity-values.json';

import './styles.css';

interface Activity {
  activity: string;
  description: string;
  duration: number;
}

const Compensation: React.FC<RouteComponentProps> = ({ location }) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  const calories = new URLSearchParams(location.search).get('calories');
  const weight = new URLSearchParams(location.search).get('weight');

  useEffect(() => {
    const _activities = activityValues.map(({ activity, description, met }) => {
      const duration = (200 * Number(calories)) / (3.5 * met * Number(weight));

      return { activity, description, duration };
    });

    setActivities(_activities);
  }, [calories, weight]);

  return (
    <div id="compensation">
      <div className="header">
        <h2>
          To burn the {`${calories}`} calories ingested when eating grilled chicken breast, you can do any of the
          following activities.
        </h2>
        <BackButton />
      </div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Description</th>
              <th>Duration in minutes</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activityItem) => (
              <tr key={activityItem.description}>
                <td>{activityItem.activity}</td>
                <td>{activityItem.description}</td>
                <td>{Math.round(activityItem.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compensation;
