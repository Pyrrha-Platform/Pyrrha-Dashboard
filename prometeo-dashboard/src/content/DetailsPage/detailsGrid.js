import React, { useContext } from "react";
import { ContentSwitcher, Switch } from "carbon-components-react";
import "@carbon/charts/styles.css";
import FirefighterDetailsGaugeSet from "../../components/FirefighterDetailsGaugeSet/FirefighterDetailsGaugeSet";
import useDetails from "../../hooks/useDetails";
import Context from "../../context/app";

// Table and data
const DetailsGrid = (params) => {
  const [
    loading,
    setLoading,
    details,
    setDetails,
    chart,
    setChart,
    increment,
    setIncrement,
    type,
    setType,
  ] = useDetails(params.firefighterId, params.increment, params.type);
  const { t } = useContext(Context);

  console.log("firefighterId", params.firefighterId);
  console.log("increment", increment);
  console.log("type", type);

  const incrementMapping = {
    all: 0,
    "10min": 1,
    "30min": 2,
    "1hr": 3,
    "4hr": 4,
    "8hr": 5,
  };

  return (
    <div className="bx--grid bx--grid--full-width details-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="details-page__heading">
            {t("content.details.heading")}
          </h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h2 className="details-page__subheading">
            {t("content.details.subheading")}
          </h2>
        </div>
      </div>

      {console.log(incrementMapping[increment])}

      <ContentSwitcher
        onChange={(e) => {
          console.log(e.name);
          setIncrement(e.name);
        }}
        selectedIndex={incrementMapping[increment]}
        className="details-page__switcher"
      >
        <Switch name="all" text={t("content.details.all")} />
        <Switch name="10min" text={t("content.details.10min")} />
        <Switch name="30min" text={t("content.details.30min")} />
        <Switch name="1hr" text={t("content.details.1hr")} />
        <Switch name="4hr" text={t("content.details.4hr")} />
        <Switch name="8hr" text={t("content.details.8hr")} />
      </ContentSwitcher>

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
            chart={chart}
            setChart={setChart}
            type={type}
            setType={setType}
            increment={increment}
            setIncrement={setIncrement}
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
  );
};

export default DetailsGrid;
