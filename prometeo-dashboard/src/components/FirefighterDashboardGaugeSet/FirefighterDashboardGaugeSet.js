import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import FirefighterGauge from '../FirefighterGauge';
import Context from '../../context/app';
import Utils from '../../utils/Utils';

function FirefighterDashboardGaugeSet({
  firefighter_id,
  firefighter_code,
  firefighter_first,
  firefighter_last,
  firefighter_email,
  device_id,
  timestamp_mins,
  temperature,
  humidity,
  carbon_monoxide,
  nitrogen_dioxide,
  increment,
}) {
  const { t } = useContext(Context);

  return (
    <div className="bx--col-lg-8 bx--col-md-4 bx--col-sm-2">
      <div className="bx--grid bx--grid--full-width dashboard-content">
        <div className="bx--row dashboard-tile">
          <div className="bx--col-md-8 label-firefighter">
            <Link
              to={'/details/' + firefighter_id}
              className="bx--link label-firefighter">
              <a title={firefighter_code}>{firefighter_first} {firefighter_last}</a>
              <br />
            </Link>
            {t('content.details.now')}
          </div>
        </div>
        <div className="bx--row dashboard-tile">
          <div className="bx--col bx--col-md-2">
            <div>
              <FirefighterGauge
                firefighter_id={firefighter_id}
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
              <FirefighterGauge
                firefighter_id={firefighter_id}
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
              <FirefighterGauge
                firefighter_id={firefighter_id}
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
              <FirefighterGauge
                firefighter_id={firefighter_id}
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
      </div>
    </div>
  );
}

export default FirefighterDashboardGaugeSet;
