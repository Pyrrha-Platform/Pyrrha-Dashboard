import React, { useEffect, useState, useRef } from "react";
import "@carbon/charts/styles.css";
import FirefighterDashboardGaugeSet from "../../components/FirefighterDashboardGaugeSet";
import useDashboard from "../../hooks/useDashboard";

const DashboardGrid = () => {
  const [loading, setLoading, dashboard, setDashboard] = useDashboard();

  return (
    <div className="bx--grid bx--grid--full-width dashboard-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="dashboard-page__heading">Dashboard</h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="dashboard-page__subheading">
            You are now viewing the real-time data and 10 minute average
            exposure thresholds. The number is the real-time data, and the gauge
            represents the ten minute average within a threshold.
          </h1>
        </div>
      </div>

      <div className="bx--row">
        {dashboard.map(
          ({
            firefighterId,
            firefighterCode,
            firefighterFirst,
            firefighterLast,
            firefighterEmail,
            deviceId,
            timestampMins,
            temperature,
            humidity,
            carbonMonoxide,
            nitrogenDioxide,
            increment,
          }) => (
            <FirefighterDashboardGaugeSet
              firefighterId={firefighterId}
              firefighterCode={firefighterCode}
              firefighterFirst={firefighterFirst}
              firefighterLast={firefighterLast}
              firefighterEmail={firefighterEmail}
              deviceId={deviceId}
              timestampMins={timestampMins}
              temperature={temperature}
              humidity={humidity}
              carbonMonoxide={carbonMonoxide}
              nitrogenDioxide={nitrogenDioxide}
              increment={increment}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DashboardGrid;
