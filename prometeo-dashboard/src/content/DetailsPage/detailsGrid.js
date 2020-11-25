import React, { useRef, useEffect, useState, useCallback } from "react";
import { ContentSwitcher, Switch } from "carbon-components-react";
import "@carbon/charts/styles.css";
import FirefighterDetailsGaugeSet from "../../components/FirefighterDetailsGaugeSet/FirefighterDetailsGaugeSet";
import useDetails from "../../hooks/useDetails";
import FirefighterChartHolder from "../../components/FirefighterChartHolder";

// Table and data
const DetailsGrid = (params) => {
  const [loading, setLoading, details, setDetails, increment, setIncrement] = useDetails(
    params.firefighterId,
    params.increment
  );

  console.log("firefighterId", params.firefighterId);
  console.log("increment", increment);

  return (
    <div className="bx--grid bx--grid--full-width details-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="details-page__heading">
            {details.firefighterCode} Details
          </h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="details-page__subheading">
            You are now viewing the details for the readings for a specific
            firefighter. Choose a reading to see a detailed chart.
          </h1>
          <h1 className="details-page__subheading">{loading}</h1>
        </div>
      </div>

      <ContentSwitcher
        onChange={(e) => {
          console.log(e.name);
          setIncrement(e.name);
        }}
        className="details-page__switcher"
      >
        <Switch name="all" text="All" />
        <Switch name="now" text="Now" />
        <Switch name="10min" text="10 min avg" />
        <Switch name="30min" text="30 min avg" />
        <Switch name="1hr" text="1 hr avg" />
        <Switch name="4hr" text="4 hr avg" />
        <Switch name="8hr" text="8 hr avg" />
      </ContentSwitcher>

      <div className="bx--row">
        {details.map(
          ({
            firefighterId,
            firefighterFirst,
            firefighterLast,
            firefighterCode,
            firefighterEmail,
            deviceId,
            temperature,
            humidity,
            carbonMonoxide,
            nitrogenDioxide,
            timestampMins,
            deviceTimestamp,
            carbonMonoxideTwa10min,
            carbonMonoxideTwa30min,
            carbonMonoxideTwa60min,
            carbonMonoxideTwa240min,
            carbonMonoxideTwa480min,
            carbonMonoxideGauge10min,
            carbonMonoxideGauge30min,
            carbonMonoxideGauge60min,
            carbonMonoxideGauge240min,
            carbonMonoxideGauge480min,
            nitrogenDioxideTwa10min,
            nitrogenDioxideTwa30min,
            nitrogenDioxideTwa60min,
            nitrogenDioxideTwa240min,
            nitrogenDioxideTwa480min,
            nitrogenDioxideGauge10min,
            nitrogenDioxideGauge30min,
            nitrogenDioxideGauge60min,
            nitrogenDioxideGauge240min,
            nitrogenDioxideGauge480min,
          }) => (
            <FirefighterDetailsGaugeSet
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
              deviceTimestamp={deviceTimestamp}
              carbonMonoxideTwa10min={carbonMonoxideTwa10min}
              carbonMonoxideTwa30min={carbonMonoxideTwa30min}
              carbonMonoxideTwa60min={carbonMonoxideTwa60min}
              carbonMonoxideTwa240min={carbonMonoxideTwa240min}
              carbonMonoxideTwa480min={carbonMonoxideTwa480min}
              carbonMonoxideGauge10min={carbonMonoxideGauge10min}
              carbonMonoxideGauge30min={carbonMonoxideGauge30min}
              carbonMonoxideGauge60min={carbonMonoxideGauge60min}
              carbonMonoxideGauge240min={carbonMonoxideGauge240min}
              carbonMonoxideGauge480min={carbonMonoxideGauge480min}
              nitrogenDioxideTwa10min={nitrogenDioxideTwa10min}
              nitrogenDioxideTwa30min={nitrogenDioxideTwa30min}
              nitrogenDioxideTwa60min={nitrogenDioxideTwa60min}
              nitrogenDioxideTwa240min={nitrogenDioxideTwa240min}
              nitrogenDioxideTwa480min={nitrogenDioxideTwa480min}
              nitrogenDioxideGauge10min={nitrogenDioxideGauge10min}
              nitrogenDioxideGauge30min={nitrogenDioxideGauge30min}
              nitrogenDioxideGauge60min={nitrogenDioxideGauge60min}
              nitrogenDioxideGauge240min={nitrogenDioxideGauge240min}
              nitrogenDioxideGauge480min={nitrogenDioxideGauge480min}
            />
          )
        )}
      </div>

      <div className="bx--row">
        <div className="bx--col-lg-16 bx--col-md-8 bx--col-sm-1">
          <FirefighterChartHolder
            firefighterId={1}
            type={"CO"}
            value={30}
            unit={"ppm"}
            increment={"10 min avg"}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsGrid;
