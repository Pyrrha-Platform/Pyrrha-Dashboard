import React, { useContext } from 'react';
import DeviceGauge from '../DeviceGauge';
import DeviceChartHolder from '../DeviceChartHolder';
import AppContext from '../../context/app';
import Utils from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { InlineNotification, Grid, Column } from '@carbon/react';

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
  const { t, locale } = useContext(AppContext);

  const dateFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const now = new Date();
  const utcTimestampDate = new Date(Date.parse(device_timestamp));
  const utcCurrentDate = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
      now.getUTCMilliseconds(),
    ),
  );
  const utcTimeDifference =
    utcCurrentDate.getTime() - utcTimestampDate.getTime();

  function toLocaleUTCDateString() {
    return utcTimestampDate.toLocaleDateString(locale, dateFormatOptions);
  }

  let background = 'database';
  if (utcTimeDifference < Constants.RECENT_NOTIFICATION_THRESHOLD) {
    background = 'websocket';
  }

  let status = 'normal';
  if (
    carbon_monoxide > Constants.CO_RED ||
    carbon_monoxide === Constants.CHERNOBYL
  ) {
    status = 'danger';
  } else if (carbon_monoxide > Constants.CO_YELLOW) {
    status = 'warning';
  }
  if (
    nitrogen_dioxide > Constants.NO2_RED ||
    nitrogen_dioxide === Constants.CHERNOBYL
  ) {
    status = 'danger';
  } else if (nitrogen_dioxide > Constants.NO2_YELLOW) {
    status = 'warning';
  }

  return (
    <>
      {(increment === 'latest' || increment === 'all') && (
        <Column sm={4} md={4} lg={8} className="device-details-gauge-set">
          <Grid narrow fullWidth>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <Grid narrow fullWidth>
                  <Column sm={3} md={3} lg={6}>
                    <div className="label-firefighter">
                      {toLocaleUTCDateString()}
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
                    <div className="icon-firefighter-holder"></div>
                  </Column>
                </Grid>
              </div>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <Grid narrow fullWidth>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                          'now',
                        )}
                      />
                    </div>
                    <div className="label-legend">
                      NO<sub>2</sub>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                </Grid>
              </div>
            </Column>
            {utcTimeDifference < Constants.RECENT_NOTIFICATION_THRESHOLD && (
              <Column sm={4} md={4} lg={8}>
                <InlineNotification
                  lowContrast
                  kind="info"
                  style={{
                    paddingTop: 0,
                    marginTop: 0,
                    paddingBottom: 0,
                    marginBottom: 0,
                  }}
                  iconDescription="close"
                  subtitle={
                    <span>{t('content.dashboard.newReadingSubtitle')}</span>
                  }
                  title={t('content.dashboard.newReadingTitle')}
                />
              </Column>
            )}
          </Grid>
        </Column>
      )}

      {(increment === '10min' || increment === 'all') && (
        <Column sm={4} md={4} lg={8} className="device-details-gauge-set">
          <Grid narrow fullWidth>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <div className="label-firefighter">
                  {t('content.details.10min')}
                </div>
              </div>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <Grid narrow fullWidth>
                  <Column sm={1} md={1} lg={2}>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('CO');
                          setIncrement('10min');
                        }}
                      >
                        <DeviceGauge
                          device_id={device_id}
                          type={'CO'}
                          value={carbon_monoxide_twa_10min}
                          increment={'10min'}
                          unit={'ppm'}
                          gauge={Utils.getPercentage(
                            'CO',
                            carbon_monoxide_twa_10min,
                            '10min',
                          )}
                        />
                      </a>
                    </div>
                    <div className="label-legend">
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('CO');
                          setIncrement('10min');
                        }}
                      >
                        CO
                      </a>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('NO2');
                          setIncrement('10min');
                        }}
                      >
                        <DeviceGauge
                          device_id={device_id}
                          type={'NO2'}
                          value={nitrogen_dioxide_twa_10min}
                          increment={'10min'}
                          unit={'ppm'}
                          gauge={Utils.getPercentage(
                            'NO2',
                            nitrogen_dioxide_twa_10min,
                            '10min',
                          )}
                        />
                      </a>
                    </div>
                    <div className="label-legend">
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('NO2');
                          setIncrement('10min');
                        }}
                      >
                        NO<sub>2</sub>
                      </a>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                </Grid>
              </div>
            </Column>
          </Grid>
        </Column>
      )}

      {(increment === '30min' || increment === 'all') && (
        <Column sm={4} md={4} lg={8} className="device-details-gauge-set">
          <Grid narrow fullWidth>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <div className="label-firefighter">
                  {t('content.details.30min')}
                </div>
              </div>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <Grid narrow fullWidth>
                  <Column sm={1} md={1} lg={2}>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('CO');
                          setIncrement('30min');
                        }}
                      >
                        <DeviceGauge
                          device_id={device_id}
                          type={'CO'}
                          value={carbon_monoxide_twa_30min}
                          increment={'30min'}
                          unit={'ppm'}
                          gauge={Utils.getPercentage(
                            'CO',
                            carbon_monoxide_twa_30min,
                            '30min',
                          )}
                        />
                      </a>
                    </div>
                    <div className="label-legend">
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('CO');
                          setIncrement('30min');
                        }}
                      >
                        CO
                      </a>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('NO2');
                          setIncrement('30min');
                        }}
                      >
                        <DeviceGauge
                          device_id={device_id}
                          type={'NO2'}
                          value={nitrogen_dioxide_twa_30min}
                          increment={'30min'}
                          unit={'ppm'}
                          gauge={Utils.getPercentage(
                            'NO2',
                            nitrogen_dioxide_twa_30min,
                            '30min',
                          )}
                        />
                      </a>
                    </div>
                    <div className="label-legend">
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('NO2');
                          setIncrement('30min');
                        }}
                      >
                        NO<sub>2</sub>
                      </a>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                </Grid>
              </div>
            </Column>
          </Grid>
        </Column>
      )}

      {(increment === '1hr' || increment === 'all') && (
        <Column sm={4} md={4} lg={8} className="device-details-gauge-set">
          <Grid narrow fullWidth>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <div className="label-firefighter">
                  {t('content.details.1hr')}
                </div>
              </div>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <Grid narrow fullWidth>
                  <Column sm={1} md={1} lg={2}>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('CO');
                          setIncrement('1hr');
                        }}
                      >
                        <DeviceGauge
                          device_id={device_id}
                          type={'CO'}
                          value={carbon_monoxide_twa_60min}
                          increment={'1hr'}
                          unit={'ppm'}
                          gauge={Utils.getPercentage(
                            'CO',
                            carbon_monoxide_twa_60min,
                            '1hr',
                          )}
                        />
                      </a>
                    </div>
                    <div className="label-legend">
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('CO');
                          setIncrement('1hr');
                        }}
                      >
                        CO
                      </a>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('NO2');
                          setIncrement('1hr');
                        }}
                      >
                        <DeviceGauge
                          device_id={device_id}
                          type={'NO2'}
                          value={nitrogen_dioxide_twa_60min}
                          increment={'1hr'}
                          unit={'ppm'}
                          gauge={Utils.getPercentage(
                            'NO2',
                            nitrogen_dioxide_twa_60min,
                            '1hr',
                          )}
                        />
                      </a>
                    </div>
                    <div className="label-legend">
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('NO2');
                          setIncrement('1hr');
                        }}
                      >
                        NO<sub>2</sub>
                      </a>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                </Grid>
              </div>
            </Column>
          </Grid>
        </Column>
      )}

      {(increment === '4hr' || increment === 'all') && (
        <Column sm={4} md={4} lg={8} className="device-details-gauge-set">
          <Grid narrow fullWidth>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <div className="label-firefighter">
                  {t('content.details.4hr')}
                </div>
              </div>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <Grid narrow fullWidth>
                  <Column sm={1} md={1} lg={2}>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('CO');
                          setIncrement('4hr');
                        }}
                      >
                        <DeviceGauge
                          device_id={device_id}
                          type={'CO'}
                          value={carbon_monoxide_twa_240min}
                          increment={'4hr'}
                          unit={'ppm'}
                          gauge={Utils.getPercentage(
                            'CO',
                            carbon_monoxide_twa_240min,
                            '4hr',
                          )}
                        />
                      </a>
                    </div>
                    <div className="label-legend">
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('CO');
                          setIncrement('4hr');
                        }}
                      >
                        CO
                      </a>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('NO2');
                          setIncrement('4hr');
                        }}
                      >
                        <DeviceGauge
                          device_id={device_id}
                          type={'NO2'}
                          value={nitrogen_dioxide_twa_240min}
                          increment={'4hr'}
                          unit={'ppm'}
                          gauge={Utils.getPercentage(
                            'NO2',
                            nitrogen_dioxide_twa_240min,
                            '4hr',
                          )}
                        />
                      </a>
                    </div>
                    <div className="label-legend">
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('NO2');
                          setIncrement('4hr');
                        }}
                      >
                        NO<sub>2</sub>
                      </a>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                </Grid>
              </div>
            </Column>
          </Grid>
        </Column>
      )}

      {(increment === '8hr' || increment === 'all') && (
        <Column sm={4} md={4} lg={8} className="device-details-gauge-set">
          <Grid narrow fullWidth>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <div className="label-firefighter">
                  {t('content.details.8hr')}
                </div>
              </div>
            </Column>
            <Column sm={4} md={4} lg={8}>
              <div className={'dashboard-tile background-' + background}>
                <Grid narrow fullWidth>
                  <Column sm={1} md={1} lg={2}>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('CO');
                          setIncrement('8hr');
                        }}
                      >
                        <DeviceGauge
                          device_id={device_id}
                          type={'CO'}
                          value={carbon_monoxide_twa_480min}
                          increment={'8hr'}
                          unit={'ppm'}
                          gauge={Utils.getPercentage(
                            'CO',
                            carbon_monoxide_twa_480min,
                            '8hr',
                          )}
                        />
                      </a>
                    </div>
                    <div className="label-legend">
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('CO');
                          setIncrement('8hr');
                        }}
                      >
                        CO
                      </a>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
                    <div>
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('NO2');
                          setIncrement('8hr');
                        }}
                      >
                        <DeviceGauge
                          device_id={device_id}
                          type={'NO2'}
                          value={nitrogen_dioxide_twa_480min}
                          increment={'8hr'}
                          unit={'ppm'}
                          gauge={Utils.getPercentage(
                            'NO2',
                            nitrogen_dioxide_twa_480min,
                            '8hr',
                          )}
                        />
                      </a>
                    </div>
                    <div className="label-legend">
                      <a
                        href="javascript:void(0)"
                        className="cds--link label-legend-link"
                        onClick={() => {
                          setType('NO2');
                          setIncrement('8hr');
                        }}
                      >
                        NO<sub>2</sub>
                      </a>
                    </div>
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                  <Column sm={1} md={1} lg={2}>
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
                  </Column>
                </Grid>
              </div>
            </Column>
          </Grid>
        </Column>
      )}

      {increment != 'all' && (
        <Grid narrow fullWidth>
          <Column sm={4} md={8} lg={16}>
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
          </Column>
        </Grid>
      )}
    </>
  );
}

export default DeviceDetailsGaugeSet;