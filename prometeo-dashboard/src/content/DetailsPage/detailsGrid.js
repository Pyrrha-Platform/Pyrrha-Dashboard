import React, { useRef, useEffect, useState, useCallback } from "react";
import { ContentSwitcher, Switch } from "carbon-components-react";
import "@carbon/charts/styles.css";
import FirefighterGaugeSet from "../../components/FirefighterGaugeSet/FirefighterGaugeSet";
import useDetails from "../../hooks/useDetails";
import FirefighterChartHolder from "../../components/FirefighterChartHolder";

// Table and data
const DetailsGrid = (firefighterId) => {
  const [loading, details] = useDetails(firefighterId);

  console.log(details);

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
            firefighter.
          </h1>
        </div>
      </div>

      <ContentSwitcher
        onChange={() => {}}
        size={"xl"}
        className="details-page__switcher"
      >
        <Switch name="All" text="All" />
        <Switch name="Now" text="Now" />
        <Switch name="10min" text="10 min avg" />
        <Switch name="30min" text="30 min avg" />
        <Switch name="1hr" text="1 hr avg" />
        <Switch name="4hr" text="4 hr avg" />
        <Switch name="8hr" text="8 hr avg" />
      </ContentSwitcher>

      <div class="bx--row">
        {details.map(
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

      <div class="bx--row">
        <div class="bx--col-lg-16 bx--col-md-8 bx--col-sm-1">
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
