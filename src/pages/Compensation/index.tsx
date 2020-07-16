import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { FiDownload } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  function convertToPdf() {
    const root = document.querySelector('#compensation') as HTMLElement;

    html2canvas(root, { width: 1260 }).then((canvas) => {
      document.body.appendChild(canvas);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [920, 2800],
      });
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('download.pdf');
      document.body.removeChild(canvas);
    });
  }

  return (
    <div id="compensation">
      <div className="header">
        <h2>
          To burn the {`${calories}`} calories ingested when eating grilled chicken breast, you can do any of the
          following activities.
        </h2>
        <button onClick={convertToPdf}>
          <span>Save as PDF</span>
          <div>
            <FiDownload />
          </div>
        </button>
        <BackButton />
      </div>
      <div className="container">
        <table>
          <tr>
            <th>Activity</th>
            <th>Description</th>
            <th>Duration in minutes</th>
          </tr>
          {activities.map((activityItem) => (
            <tr>
              <td>{activityItem.activity}</td>
              <td>{activityItem.description}</td>
              <td>{Math.round(activityItem.duration)}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Compensation;
