import React, { useContext } from 'react';
import DeviceGauge from '../DeviceGauge';
import DeviceChartHolder from '../DeviceChartHolder';
import AppContext from '../../context/app';
import Utils from '../../utils/Utils';
import Constants from '../../utils/Constants';
import NotificationFilled20 from '@carbon/icons-react/lib/notification--filled/20';

function DeviceDetailsGaugeSet({
  chart,
  setChart,
  type,
  setType,
  increment,
  setIncrement,
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
}) {
  console.log('DeviceDetailsGaugeSet', increment);

  /*
  console.log("temperature", temperature);
  console.log("humidity", humidity);
  console.log("carbon_monoxide", carbon_monoxide);
  console.log("nitrogen_dioxide", nitrogen_dioxide);
  console.log("carbon_monoxide_twa_10min", carbon_monoxide_twa_10min);
  console.log("carbon_monoxide_twa_30min", carbon_monoxide_twa_30min);
  console.log("carbon_monoxide_twa_60min", carbon_monoxide_twa_60min);
  console.log("carbon_monoxide_twa_240min", carbon_monoxide_twa_240min);
  console.log("carbon_monoxide_twa_480min", carbon_monoxide_twa_480min);
  console.log("carbon_monoxide_gauge_10min", carbon_monoxide_gauge_10min);
  console.log("carbon_monoxide_gauge_30min", carbon_monoxide_gauge_30min);
  console.log("carbon_monoxide_gauge_60min", carbon_monoxide_gauge_60min);
  console.log("carbon_monoxide_gauge_240min", carbon_monoxide_gauge_240min);
  console.log("carbon_monoxide_gauge_480min", carbon_monoxide_gauge_480min);
  console.log("nitrogen_dioxide_twa_10min", nitrogen_dioxide_twa_10min);
  console.log("nitrogen_dioxide_twa_30min", nitrogen_dioxide_twa_30min);
  console.log("nitrogen_dioxide_twa_60min", nitrogen_dioxide_twa_60min);
  console.log("nitrogen_dioxide_twa_240min", nitrogen_dioxide_twa_240min);
  console.log("nitrogen_dioxide_twa_480min", nitrogen_dioxide_twa_480min);
  console.log("nitrogen_dioxide_gauge_10min", nitrogen_dioxide_gauge_10min);
  console.log("nitrogen_dioxide_gauge_30min", nitrogen_dioxide_gauge_30min);
  console.log("nitrogen_dioxide_gauge_60min", nitrogen_dioxide_gauge_60min);
  console.log("nitrogen_dioxide_gauge_240min", nitrogen_dioxide_gauge_240min);
  console.log("nitrogen_dioxide_gauge_480min", nitrogen_dioxide_gauge_480min);
  console.log("--------------------------");
  */

  const { t, locale } = useContext(AppContext);

  const dateFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  let now = new Date();
  let utcTimestampDate = new Date(Date.parse(device_timestamp));
  let utcCurrentDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds()
    )
  );
  let utcTimeDifference = utcCurrentDate.getTime() - utcTimestampDate.getTime();

  function toLocaleUTCDateString() {
    return (
      utcTimestampDate.toLocaleDateString(locale, dateFormatOptions) + ' UTC'
    );
  }

  let background = 'database'; // "websocket"
  if (utcTimeDifference < Constants.RECENT_NOTIFICATION_THRESHOLD) {
    background = 'websocket';
  }

  console.log('Date now', utcCurrentDate.getTime());
  console.log('Date timestamp', device_id, utcTimestampDate.getTime());
  console.log('Date difference', utcTimeDifference);
  console.log(Constants.RECENT_NOTIFICATION_THRESHOLD);

  return (
    <>
      <div className="bx--row">
        {(increment === 'latest' || increment === 'all') && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-6 label-firefighter">
                  {/* device_id */}
                  {/* <br /> */}
                  {toLocaleUTCDateString()}
                  {/* t('content.details.now') */}
                </div>
                <div className="bx--col-md-2 icon-firefighter-holder">
                  {utcTimeDifference <
                    Constants.RECENT_NOTIFICATION_THRESHOLD && (
                    <>
                      <NotificationFilled20 />
                    </>
                  )}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'CO'}
                      value={carbon_monoxide}
                      unit={'ppm'}
                      increment={'now'}
                      gauge={Utils.getPercentage('CO', carbon_monoxide, 'now')}
                    />
                  </div>
                  <div className="label-legend">CO</div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'NO2'}
                      value={nitrogen_dioxide}
                      unit={'ppm'}
                      increment={'now'}
                      gauge={Utils.getPercentage(
                        'NO2',
                        nitrogen_dioxide,
                        'now'
                      )}
                    />
                  </div>
                  <div className="label-legend">
                    NO<sub>2</sub>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Tmp'}
                      value={temperature}
                      unit={'°C'}
                      increment={'now'}
                      gauge={Utils.getPercentage('Tmp', temperature, 'now')}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.temperature')}
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Hum'}
                      value={humidity}
                      unit={'%'}
                      increment={'now'}
                      gauge={Utils.getPercentage('Hum', humidity, 'now')}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.humidity')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(increment === '10min' || increment === 'all') && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-8 label-firefighter">
                  {/* device_id */}
                  {/* <br /> */}
                  {t('content.details.10min')}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          'Setting type to CO and increment to 10min'
                        );
                        setType('CO');
                        setIncrement('10min');
                      }}>
                      <DeviceGauge
                        device_id={device_id}
                        type={'CO'}
                        value={carbon_monoxide_twa_10min}
                        increment={'10min'}
                        unit={'ppm'}
                        gauge={Utils.getPercentage(
                          'CO',
                          carbon_monoxide_twa_10min,
                          '10min'
                        )}
                      />
                    </a>
                    {/* gauge={carbon_monoxide_gauge_10min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          'Setting type to CO and increment to 10min'
                        );
                        setType('CO');
                        setIncrement('10min');
                      }}>
                      CO
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          'Setting type to CO and increment to 10min'
                        );
                        setType('NO2');
                        setIncrement('10min');
                      }}>
                      <DeviceGauge
                        device_id={device_id}
                        type={'NO2'}
                        value={nitrogen_dioxide_twa_10min}
                        increment={'10min'}
                        unit={'ppm'}
                        gauge={Utils.getPercentage(
                          'NO2',
                          nitrogen_dioxide_twa_10min,
                          '10min'
                        )}
                      />
                    </a>
                    {/* gauge={nitrogen_dioxide_gauge_10min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          'Setting type to CO and increment to 10min'
                        );
                        setType('NO2');
                        setIncrement('10min');
                      }}>
                      NO<sub>2</sub>
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Tmp'}
                      value={'-'}
                      increment={'10min'}
                      unit={'°C'}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.temperature')}
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Hum'}
                      value={'-'}
                      increment={'10min'}
                      unit={'%'}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.humidity')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(increment === '30min' || increment === 'all') && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-8 label-firefighter">
                  {/* device_id */}
                  {/* <br /> */}
                  {t('content.details.30min')}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          'Setting type to CO and increment to 30min'
                        );
                        setType('CO');
                        setIncrement('30min');
                      }}>
                      <DeviceGauge
                        device_id={device_id}
                        type={'CO'}
                        value={carbon_monoxide_twa_30min}
                        increment={'30min'}
                        unit={'ppm'}
                        gauge={Utils.getPercentage(
                          'CO',
                          carbon_monoxide_twa_30min,
                          '30min'
                        )}
                      />
                    </a>
                    {/* gauge={carbon_monoxide_gauge_30min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          'Setting type to CO and increment to 30min'
                        );
                        setType('CO');
                        setIncrement('30min');
                      }}>
                      CO
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          'Setting type to CO and increment to 30min'
                        );
                        setType('NO2');
                        setIncrement('30min');
                      }}>
                      <DeviceGauge
                        device_id={device_id}
                        type={'NO2'}
                        value={nitrogen_dioxide_twa_30min}
                        increment={'30min'}
                        unit={'ppm'}
                        gauge={Utils.getPercentage(
                          'NO2',
                          nitrogen_dioxide_twa_30min,
                          '30min'
                        )}
                      />
                    </a>
                    {/* gauge={nitrogen_dioxide_gauge_30min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log(
                          'Setting type to CO and increment to 30min'
                        );
                        setType('NO2');
                        setIncrement('30min');
                      }}>
                      NO<sub>2</sub>
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Tmp'}
                      value={'-'}
                      increment={'30min'}
                      unit={'°C'}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.temperature')}
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Hum'}
                      value={'-'}
                      increment={'30min'}
                      unit={'%'}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.humidity')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(increment === '1hr' || increment === 'all') && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-8 label-firefighter">
                  {/* device_id */}
                  {/* <br /> */}
                  {t('content.details.1hr')}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 1hr');
                        setType('CO');
                        setIncrement('1hr');
                      }}>
                      <DeviceGauge
                        device_id={device_id}
                        type={'CO'}
                        value={carbon_monoxide_twa_60min}
                        increment={'1hr'}
                        unit={'ppm'}
                        gauge={Utils.getPercentage(
                          'CO',
                          carbon_monoxide_twa_60min,
                          '1hr'
                        )}
                      />
                    </a>
                    {/* gauge={carbon_monoxide_gauge_60min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 1hr');
                        setType('CO');
                        setIncrement('1hr');
                      }}>
                      CO
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 1hr');
                        setType('NO2');
                        setIncrement('1hr');
                      }}>
                      <DeviceGauge
                        device_id={device_id}
                        type={'NO2'}
                        value={nitrogen_dioxide_twa_60min}
                        increment={'1hr'}
                        unit={'ppm'}
                        gauge={Utils.getPercentage(
                          'NO2',
                          nitrogen_dioxide_twa_60min,
                          '1hr'
                        )}
                      />
                    </a>
                    {/* gauge={nitrogen_dioxide_gauge_60min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 1hr');
                        setType('NO2');
                        setIncrement('1hr');
                      }}>
                      NO<sub>2</sub>
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Tmp'}
                      value={'-'}
                      increment={'1hr'}
                      unit={'°C'}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.temperature')}
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Hum'}
                      value={'-'}
                      increment={'1hr'}
                      unit={'%'}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.humidity')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(increment === '4hr' || increment === 'all') && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-8 label-firefighter">
                  {/* device_id */}
                  {/* <br /> */}
                  {t('content.details.4hr')}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 4hr');
                        setType('CO');
                        setIncrement('4hr');
                      }}>
                      <DeviceGauge
                        device_id={device_id}
                        type={'CO'}
                        value={carbon_monoxide_twa_240min}
                        increment={'4hr'}
                        unit={'ppm'}
                        gauge={Utils.getPercentage(
                          'CO',
                          carbon_monoxide_twa_240min,
                          '4hr'
                        )}
                      />
                    </a>
                    {/* gauge={carbon_monoxide_gauge_240min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 4hr');
                        setType('CO');
                        setIncrement('4hr');
                      }}>
                      CO
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 4hr');
                        setType('NO2');
                        setIncrement('4hr');
                      }}>
                      <DeviceGauge
                        device_id={device_id}
                        type={'NO2'}
                        value={nitrogen_dioxide_twa_240min}
                        increment={'4hr'}
                        unit={'ppm'}
                        gauge={Utils.getPercentage(
                          'NO2',
                          nitrogen_dioxide_twa_240min,
                          '4hr'
                        )}
                      />
                    </a>
                    {/* gauge={nitrogen_dioxide_gauge_240min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 4hr');
                        setType('NO2');
                        setIncrement('4hr');
                      }}>
                      NO<sub>2</sub>
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Tmp'}
                      value={'-'}
                      increment={'4hr'}
                      unit={'°C'}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.temperature')}
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Hum'}
                      value={'-'}
                      increment={'4hr'}
                      unit={'%'}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.humidity')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(increment === '8hr' || increment === 'all') && (
          <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className="bx--row dashboard-tile">
                <div className="bx--col-md-8 label-firefighter">
                  {/* device_id */}
                  {/* <br /> */}
                  {t('content.details.8hr')}
                </div>
              </div>
              <div className="bx--row dashboard-tile">
                <div className="bx--col bx--col-md-2">
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 8hr');
                        setType('CO');
                        setIncrement('8hr');
                      }}>
                      <DeviceGauge
                        device_id={device_id}
                        type={'CO'}
                        value={carbon_monoxide_twa_480min}
                        increment={'8hr'}
                        unit={'ppm'}
                        gauge={Utils.getPercentage(
                          'CO',
                          carbon_monoxide_twa_480min,
                          '8hr'
                        )}
                      />
                    </a>
                    {/* gauge={carbon_monoxide_gauge_480min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 8hr');
                        setType('CO');
                        setIncrement('8hr');
                      }}>
                      CO
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 8hr');
                        setType('NO2');
                        setIncrement('8hr');
                      }}>
                      <DeviceGauge
                        device_id={device_id}
                        type={'NO2'}
                        value={nitrogen_dioxide_twa_480min}
                        increment={'8hr'}
                        unit={'ppm'}
                        gauge={Utils.getPercentage(
                          'NO2',
                          nitrogen_dioxide_twa_480min,
                          '8hr'
                        )}
                      />
                    </a>
                    {/* gauge={nitrogen_dioxide_gauge_480min} */}
                  </div>
                  <div className="label-legend">
                    <a
                      href="javascript:void(0)"
                      className="bx--link label-legend-link"
                      onClick={() => {
                        console.log('Setting type to CO and increment to 8hr');
                        setType('NO2');
                        setIncrement('8hr');
                      }}>
                      NO<sub>2</sub>
                    </a>
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Tmp'}
                      value={'-'}
                      increment={'8hr'}
                      unit={'°C'}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.temperature')}
                  </div>
                </div>
                <div className="bx--col bx--col-md-2">
                  <div>
                    <DeviceGauge
                      device_id={device_id}
                      type={'Hum'}
                      value={'-'}
                      increment={'8hr'}
                      unit={'%'}
                    />
                  </div>
                  <div className="label-legend">
                    {t('content.common.humidity')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {increment != 'now' && increment != 'latest' && increment != 'all' && (
        <div className="bx--row">
          <div className="bx--col-lg-16 bx--col-md-8 bx--col-sm-1">
            <DeviceChartHolder
              device_id={device_id}
              type={!type ? 'CO' : type}
              data={chart}
              unit={'ppm'}
              gauge={''}
              increment={
                increment === 'all' ? t('content.details.10min') : increment
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

export default DeviceDetailsGaugeSet;
