import React, { useContext } from 'react';
import { ContentSwitcher, Switch } from 'carbon-components-react';
import '@carbon/charts/styles.css';
import FirefighterDetailsGaugeSet from '../../components/FirefighterDetailsGaugeSet/FirefighterDetailsGaugeSet';
import useDetails from '../../hooks/useDetails';
import Context from '../../context/app';

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
  ] = useDetails(params.firefighter_id, params.increment, params.type);
  const { t } = useContext(Context);

  /*
  console.log("firefighter_id", params.firefighter_id);
  console.log("increment", increment);
  console.log("type", type);
  */

  const incrementMapping = {
    all: 0,
    '10min': 1,
    '30min': 2,
    '1hr': 3,
    '4hr': 4,
    '8hr': 5,
  };

  return (
    <div className="bx--grid bx--grid--full-width details-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="details-page__heading">
            {t('content.details.heading')}
          </h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h2 className="details-page__subheading">
            {t('content.details.subheading')}
          </h2>
        </div>
      </div>

      <ContentSwitcher
        onChange={(e) => {
          console.log(e.name);
          setIncrement(e.name);
        }}
        selectedIndex={incrementMapping[increment]}
        className="details-page__switcher">
        <Switch name="all" text={t('content.details.all')} />
        <Switch name="10min" text={t('content.details.10min')} />
        <Switch name="30min" text={t('content.details.30min')} />
        <Switch name="1hr" text={t('content.details.1hr')} />
        <Switch name="4hr" text={t('content.details.4hr')} />
        <Switch name="8hr" text={t('content.details.8hr')} />
      </ContentSwitcher>

      {details.map(
        ({
          firefighter_id,
          firefighter_first,
          firefighter_last,
          firefighter_code,
          firefighter_email,
          device_id,
          temperature,
          humidity,
          carbon_monoxide,
          nitrogen_dioxide,
          timestamp_mins,
          deviceTimestamp,
          carbon_monoxide_twa_10min,
          carbon_monoxide_twa_30min,
          carbon_monoxide_twa_60min,
          carbon_monoxide_twa_240min,
          carbon_monoxide_twa_480min,
          carbon_monoxideGauge10min,
          carbon_monoxideGauge30min,
          carbon_monoxideGauge60min,
          carbon_monoxideGauge240min,
          carbon_monoxideGauge480min,
          nitrogen_dioxide_twa_10min,
          nitrogen_dioxide_twa_30min,
          nitrogen_dioxide_twa_60min,
          nitrogen_dioxide_twa_240min,
          nitrogen_dioxide_twa_480min,
          nitrogen_dioxideGauge10min,
          nitrogen_dioxideGauge30min,
          nitrogen_dioxideGauge60min,
          nitrogen_dioxideGauge240min,
          nitrogen_dioxideGauge480min,
        }) => (
          <FirefighterDetailsGaugeSet
            chart={chart}
            setChart={setChart}
            type={type}
            setType={setType}
            increment={increment}
            setIncrement={setIncrement}
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
            deviceTimestamp={deviceTimestamp}
            carbon_monoxide_twa_10min={carbon_monoxide_twa_10min}
            carbon_monoxide_twa_30min={carbon_monoxide_twa_30min}
            carbon_monoxide_twa_60min={carbon_monoxide_twa_60min}
            carbon_monoxide_twa_240min={carbon_monoxide_twa_240min}
            carbon_monoxide_twa_480min={carbon_monoxide_twa_480min}
            carbon_monoxideGauge10min={carbon_monoxideGauge10min}
            carbon_monoxideGauge30min={carbon_monoxideGauge30min}
            carbon_monoxideGauge60min={carbon_monoxideGauge60min}
            carbon_monoxideGauge240min={carbon_monoxideGauge240min}
            carbon_monoxideGauge480min={carbon_monoxideGauge480min}
            nitrogen_dioxide_twa_10min={nitrogen_dioxide_twa_10min}
            nitrogen_dioxide_twa_30min={nitrogen_dioxide_twa_30min}
            nitrogen_dioxide_twa_60min={nitrogen_dioxide_twa_60min}
            nitrogen_dioxide_twa_240min={nitrogen_dioxide_twa_240min}
            nitrogen_dioxide_twa_480min={nitrogen_dioxide_twa_480min}
            nitrogen_dioxideGauge10min={nitrogen_dioxideGauge10min}
            nitrogen_dioxideGauge30min={nitrogen_dioxideGauge30min}
            nitrogen_dioxideGauge60min={nitrogen_dioxideGauge60min}
            nitrogen_dioxideGauge240min={nitrogen_dioxideGauge240min}
            nitrogen_dioxideGauge480min={nitrogen_dioxideGauge480min}
          />
        )
      )}
    </div>
  );
};

export default DetailsGrid;
