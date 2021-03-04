import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DeviceGauge from '../DeviceGauge';
import AppContext from '../../context/app';
import Utils from '../../utils/Utils';
import Constants from '../../utils/Constants';
import NotificationFilled20 from '@carbon/icons-react/lib/notification--filled/20';
import WarningAltFilled20 from '@carbon/icons-react/lib/warning--alt--filled/20';
import { InlineNotification } from 'carbon-components-react/lib/components/Notification';

function DeviceDashboardGaugeSet({
  device_id,
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
    <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
      <div className="bx--grid bx--grid--full-width dashboard-content">
        <div className={'bx--row dashboard-tile background-' + background}>
          <div className="bx--col-md-6 label-firefighter">
            <Link
              to={'/details/' + device_id}
              className="bx--link label-firefighter"
              title={device_id}>
              {device_id}
              <br />
            </Link>
            {toLocaleUTCDateString()}
            {/* t('content.details.now') */}
          </div>
          <div className="bx--col-md-2 icon-firefighter-holder">
            {utcTimeDifference < Constants.RECENT_NOTIFICATION_THRESHOLD && (
              <>
                <WarningAltFilled20 />
                <NotificationFilled20 />
              </>
            )}
            {utcTimeDifference > Constants.RECENT_NOTIFICATION_THRESHOLD && (
              <>
                <WarningAltFilled20 />
              </>
            )}
          </div>
        </div>
        <div className={'bx--row dashboard-tile background-' + background}>
          <div className="bx--col bx--col-md-2">
            <div>
              <DeviceGauge
                device_id={device_id}
                type={'CO'}
                value={carbon_monoxide}
                increment={increment}
                unit={'ppm'}
                gauge={Utils.getPercentage('CO', carbon_monoxide, increment)}
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
                increment={increment}
                unit={'ppm'}
                gauge={Utils.getPercentage('NO2', nitrogen_dioxide, increment)}
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
                increment={increment}
                unit={'°C'}
                gauge={Utils.getPercentage('Tmp', temperature, increment)}
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
                increment={increment}
                unit={'%'}
                gauge={Utils.getPercentage('Hum', humidity, increment)}
              />
            </div>
            <div className="label-legend">{t('content.common.humidity')}</div>
          </div>
        </div>
        {utcTimeDifference < Constants.RECENT_NOTIFICATION_THRESHOLD && (
          <div
            className="bx--row"
            style={{
              paddingTop: 0,
              marginTop: 0,
              paddingBottom: 0,
              marginBottom: 0,
            }}>
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
              subtitle={<span>less than a minute ago</span>}
              title="New reading received"
            />
          </div>
        )}
        {utcTimeDifference > Constants.RECENT_NOTIFICATION_THRESHOLD && (
          <div
            className="bx--row"
            style={{
              paddingTop: 0,
              marginTop: 0,
              paddingBottom: 0,
              marginBottom: 0,
            }}>
            <InlineNotification
              lowContrast
              kind="warning-alt"
              style={{
                paddingTop: 0,
                marginTop: 0,
                paddingBottom: 0,
                marginBottom: 0,
              }}
              iconDescription="close"
              subtitle={<span>over several hours</span>}
              title="Dangerous long-term average"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DeviceDashboardGaugeSet;
