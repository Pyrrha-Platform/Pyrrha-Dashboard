import React, { useContext } from 'react';
import '@carbon/charts/styles.css';
import { Tile } from 'carbon-components-react';
import DeviceDashboardGaugeSet from '../../components/DeviceDashboardGaugeSet';
import useDashboard from '../../hooks/useDashboard';
import AppContext from '../../context/app';

const DashboardGrid = () => {
  const [
    // loading,
    // setLoading,
    dashboard,
    // setDashboard,
    normal,
    // setNormal,
    warning,
    // setWarning,
    danger,
    // setDanger,
  ] = useDashboard();
  const { t } = useContext(AppContext);

  return (
    <div className="bx--grid bx--grid--full-width dashboard-content">
      <div className="bx--row">
        <div className="bx--col-md-16">
          <h1 className="dashboard-page__heading">
            {t('content.dashboard.heading')}
          </h1>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col-md-16">
          <h2 className="dashboard-page__subheading">
            {t('content.dashboard.subheading')}
          </h2>
        </div>
      </div>

      <div className="bx--row">
        <div className="bx--col bx--no-gutter">
          <div className="bx--grid bx--grid--full-width">
            <div className="bx--row">
              <div className="bx--col">
                <Tile>
                  <div className="bx--grid bx--grid--full-width">
                    <div className="bx--row">
                      <div className="bx--col-md-1 dashboard-page__tile_number">
                        <span className="dashboard-page__danger">{danger}</span>
                      </div>
                      <div className="bx--col-md-7">
                        <div className="dashboard-page__tile_heading">
                          {t('content.dashboard.tileHeadingDanger')}
                        </div>
                        <div className="dashboard-page__tile_subheading">
                          {t('content.dashboard.tileSubheadingDanger')}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tile>
              </div>
              <div className="bx--col">
                <Tile>
                  <div className="bx--grid bx--grid--full-width">
                    <div className="bx--row">
                      <div className="bx--col-md-1 dashboard-page__tile_number">
                        <span className="dashboard-page__warning">
                          {warning}
                        </span>
                      </div>
                      <div className="bx--col-md-7">
                        <div className="dashboard-page__tile_heading">
                          {t('content.dashboard.tileHeadingWarning')}
                        </div>
                        <div className="dashboard-page__tile_subheading">
                          {t('content.dashboard.tileSubheadingWarning')}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tile>
              </div>
              <div className="bx--col">
                <Tile>
                  <div className="bx--grid bx--grid--full-width">
                    <div className="bx--row">
                      <div className="bx--col-md-1 dashboard-page__tile_number">
                        <span className="dashboard-page__normal">{normal}</span>
                      </div>
                      <div className="bx--col-md-7">
                        <div className="dashboard-page__tile_heading">
                          {t('content.dashboard.tileHeadingNormal')}
                        </div>
                        <div className="dashboard-page__tile_subheading">
                          {t('content.dashboard.tileSubheadingNormal')}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tile>
              </div>
            </div>
          </div>
        </div>
      </div>

      {dashboard !== undefined &&
        dashboard.length !== 0 &&
        dashboard.map !== undefined && (
          <div className="bx--row">
            {dashboard.map(
              ({
                device_id,
                timestamp_mins,
                device_timestamp,
                temperature,
                humidity,
                carbon_monoxide,
                nitrogen_dioxide,
                increment,
              }) => (
                <DeviceDashboardGaugeSet
                  device_id={device_id}
                  timestamp_mins={timestamp_mins}
                  device_timestamp={device_timestamp}
                  temperature={temperature}
                  humidity={humidity}
                  carbon_monoxide={carbon_monoxide}
                  nitrogen_dioxide={nitrogen_dioxide}
                  increment={'now'}
                />
              )
            )}
          </div>
        )}

      {(dashboard == undefined ||
        dashboard.length == 0 ||
        dashboard.map == undefined) && (
        <div className="bx--row">
          <div className="bx--grid bx--grid--full-width bx--col-lg-16 bx--col-md-4 bx--col-sm-2">
            <div className="bx--grid bx--grid--full-width dashboard-content">
              <div className={'bx--row dashboard-tile background-'}>
                <div className="bx--grid bx--grid--full-width label-firefighter">
                  {t('content.dashboard.noDevices')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardGrid;
