import React, { useContext } from 'react';
import { ContentSwitcher, Switch } from 'carbon-components-react';
import '@carbon/charts/styles.css';
import DeviceDetailsGaugeSet from '../../components/DeviceDetailsGaugeSet';
import useDetails from '../../hooks/useDetails';
import AppContext from '../../context/app';

// Table and data
const DetailsGrid = (params) => {
  const [
    // loading,
    // setLoading,
    details,
    // setDetails,
    chart,
    setChart,
    increment,
    setIncrement,
    type,
    setType,
  ] = useDetails(params.device_id, params.increment, params.type);
  const { t } = useContext(AppContext);

  /*
  console.log("device_id", params.device_id);
  console.log("increment", increment);
  console.log("type", type);
  */

  const incrementMapping = {
    all: 0,
    latest: 1,
    '10min': 2,
    '30min': 3,
    '1hr': 4,
    '4hr': 5,
    '8hr': 6,
  };

  return (
    <div className="bx--grid bx--grid--full-width details-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="details-page__heading">{params.device_id}</h1>
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
        className="details-page__switcher"
      >
        <Switch name="all" text={t('content.details.all')} />
        <Switch name="latest" text={t('content.details.latest')} />
        <Switch name="10min" text={t('content.details.10min')} />
        <Switch name="30min" text={t('content.details.30min')} />
        <Switch name="1hr" text={t('content.details.1hr')} />
        <Switch name="4hr" text={t('content.details.4hr')} />
        <Switch name="8hr" text={t('content.details.8hr')} />
      </ContentSwitcher>

      {details.map(
        ({
          device_id,
          temperature,
          humidity,
          carbon_monoxide,
          nitrogen_dioxide,
          timestamp_mins,
          device_timestamp,
          carbon_monoxide_twa_10min,
          carbon_monoxide_twa_30min,
          carbon_monoxide_twa_60min,
          carbon_monoxide_twa_240min,
          carbon_monoxide_twa_480min,
          carbon_monoxide_gauge_10min,
          carbon_monoxide_gauge_30min,
          carbon_monoxide_gauge_60min,
          carbon_monoxide_gauge_240min,
          carbon_monoxide_gauge_480min,
          nitrogen_dioxide_twa_10min,
          nitrogen_dioxide_twa_30min,
          nitrogen_dioxide_twa_60min,
          nitrogen_dioxide_twa_240min,
          nitrogen_dioxide_twa_480min,
          nitrogen_dioxide_gauge_10min,
          nitrogen_dioxide_gauge_30min,
          nitrogen_dioxide_gauge_60min,
          nitrogen_dioxide_gauge_240min,
          nitrogen_dioxide_gauge_480min,
        }) => (
          <DeviceDetailsGaugeSet
            chart={chart}
            setChart={setChart}
            type={type}
            setType={setType}
            increment={increment}
            setIncrement={setIncrement}
            device_id={device_id}
            timestamp_mins={timestamp_mins}
            temperature={temperature}
            humidity={humidity}
            carbon_monoxide={carbon_monoxide}
            nitrogen_dioxide={nitrogen_dioxide}
            device_timestamp={device_timestamp}
            carbon_monoxide_twa_10min={carbon_monoxide_twa_10min}
            carbon_monoxide_twa_30min={carbon_monoxide_twa_30min}
            carbon_monoxide_twa_60min={carbon_monoxide_twa_60min}
            carbon_monoxide_twa_240min={carbon_monoxide_twa_240min}
            carbon_monoxide_twa_480min={carbon_monoxide_twa_480min}
            carbon_monoxide_gauge_10min={carbon_monoxide_gauge_10min}
            carbon_monoxide_gauge_30min={carbon_monoxide_gauge_30min}
            carbon_monoxide_gauge_60min={carbon_monoxide_gauge_60min}
            carbon_monoxide_gauge_240min={carbon_monoxide_gauge_240min}
            carbon_monoxide_gauge_480min={carbon_monoxide_gauge_480min}
            nitrogen_dioxide_twa_10min={nitrogen_dioxide_twa_10min}
            nitrogen_dioxide_twa_30min={nitrogen_dioxide_twa_30min}
            nitrogen_dioxide_twa_60min={nitrogen_dioxide_twa_60min}
            nitrogen_dioxide_twa_240min={nitrogen_dioxide_twa_240min}
            nitrogen_dioxide_twa_480min={nitrogen_dioxide_twa_480min}
            nitrogen_dioxide_gauge_10min={nitrogen_dioxide_gauge_10min}
            nitrogen_dioxide_gauge_30min={nitrogen_dioxide_gauge_30min}
            nitrogen_dioxide_gauge_60min={nitrogen_dioxide_gauge_60min}
            nitrogen_dioxide_gauge_240min={nitrogen_dioxide_gauge_240min}
            nitrogen_dioxide_gauge_480min={nitrogen_dioxide_gauge_480min}
          />
        )
      )}
    </div>
  );
};

export default DetailsGrid;
