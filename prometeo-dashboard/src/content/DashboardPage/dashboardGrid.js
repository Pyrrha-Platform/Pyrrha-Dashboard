import React, { useContext } from 'react';
import '@carbon/charts/styles.css';
import FirefighterDashboardGaugeSet from '../../components/FirefighterDashboardGaugeSet';
import useDashboard from '../../hooks/useDashboard';
import AppContext from '../../context/app';

const DashboardGrid = () => {
  const [loading, setLoading, dashboard, setDashboard] = useDashboard();
  const { t } = useContext(AppContext);

  return (
    <div className="bx--grid bx--grid--full-width dashboard-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="dashboard-page__heading">
            {t('content.dashboard.heading')}
          </h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h2 className="dashboard-page__subheading">
            {t('content.dashboard.subheading')}
          </h2>
        </div>
      </div>

      <div className="bx--row">
        {dashboard.map(
          ({
            firefighter_id,
            firefighter_code,
            firefighter_first,
            firefighter_last,
            firefighter_email,
            device_id,
            timestamp_mins,
            temperature,
            humidity,
            carbon_monoxide,
            nitrogen_dioxide,
            increment,
          }) => (
            <FirefighterDashboardGaugeSet
              firefighter_id={firefighter_id}
              firefighter_code={firefighter_code}
              firefighter_first={firefighter_first}
              firefighter_last={firefighter_last}
              firefighter_email={firefighter_email}
              device_id={device_id}
              timestamp_mins={timestamp_mins}
              temperature={temperature}
              humidity={humidity}
              carbon_monoxide={carbon_monoxide}
              nitrogen_dioxide={nitrogen_dioxide}
              increment={'now'}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DashboardGrid;
