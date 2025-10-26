import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DeviceGauge from '../DeviceGauge';
import AppContext from '../../context/app';
import Utils from '../../utils/Utils';
import Constants from '../../utils/Constants';
import { WarningFilled } from '@carbon/icons-react';
import { InlineNotification, Grid, Column } from '@carbon/react';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/es';
import 'moment/locale/ca';

function DeviceDashboardGaugeSet({
  device_id,
  device_name,
  timestamp_mins,
  device_timestamp,
  temperature,
  humidity,
  carbon_monoxide,
  nitrogen_dioxide,
  increment,
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

  Moment.globalTimezone = 'Etc/UTC';

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
    return (
      // utcTimestampDate.toLocaleDateString(locale, dateFormatOptions) + ' UTC'
      utcTimestampDate.toLocaleDateString(locale, dateFormatOptions)
    );
  }

  let background = 'database'; // "websocket"
  if (utcTimeDifference < Constants.RECENT_NOTIFICATION_THRESHOLD) {
    background = 'websocket';
  }

  let status = 'normal'; // "websocket"
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

  // console.log('Date now', utcCurrentDate.getTime());
  // console.log('Date timestamp', device_id, utcTimestampDate.getTime());
  // console.log('Date difference', utcTimeDifference);
  // console.log(Constants.RECENT_NOTIFICATION_THRESHOLD);

  return (
    <Column sm={4} md={4} lg={8} className="device-dashboard-gauge-set">
      <Grid narrow fullWidth>
        <Column sm={4} md={4} lg={8}>
          <div className={'dashboard-tile background-' + background}>
            <Grid narrow fullWidth>
              <Column sm={3} md={3} lg={6}>
                <div className="label-firefighter">
                  <Link
                    to={'/details/' + device_id}
                    className="cds--link label-firefighter"
                    title={device_name || device_id}
                  >
                    {device_name || `Device ${device_id}`}
                    <br />
                  </Link>
                  {t('content.dashboard.lastUpdate')}:{' '}
                  <Moment fromNow locale={locale}>
                    {device_timestamp}
                  </Moment>{' '}
                  <br />
                </div>
              </Column>
              <Column sm={1} md={1} lg={2}>
                <div className="icon-firefighter-holder">
                  {status === 'danger' && (
                    <WarningFilled size={20} className="danger" />
                  )}
                  {status === 'warning' && (
                    <WarningFilled size={20} className="warning" />
                  )}
                </div>
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
                    increment={increment}
                    unit={'ppm'}
                    gauge={Utils.getPercentage(
                      'CO',
                      carbon_monoxide,
                      increment,
                    )}
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
                    increment={increment}
                    unit={'ppm'}
                    gauge={Utils.getPercentage(
                      'NO2',
                      nitrogen_dioxide,
                      increment,
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
                    increment={increment}
                    unit={'°C'}
                    gauge={Utils.getPercentage('Tmp', temperature, increment)}
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
                    increment={increment}
                    unit={'%'}
                    gauge={Utils.getPercentage('Hum', humidity, increment)}
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
  );
}

export default DeviceDashboardGaugeSet;
