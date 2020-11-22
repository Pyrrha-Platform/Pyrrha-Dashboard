import React, { useEffect, useState, useCallback } from "react";
import "@carbon/charts/styles.css";
import FirefighterGaugeSet from "../../components/FirefighterGaugeSet";
import useDashboard from "../../hooks/useDashboard";

const DashboardGrid = () => {
  const [loading, dashboard] = useDashboard();

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
            exposure thresholds.
          </h1>
        </div>
      </div>

      <div class="bx--row">
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
            <FirefighterGaugeSet
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
