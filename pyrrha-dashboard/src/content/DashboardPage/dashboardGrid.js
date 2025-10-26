import React, { useContext } from 'react';
import '@carbon/charts/styles.css';
import { Tile, Grid, Column } from '@carbon/react';
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
    <Grid className="dashboard-content main-container" fullWidth>
      <Column sm={4} md={8} lg={16}>
        <h1 className="dashboard-page__heading">
          {t('content.dashboard.heading')}
        </h1>
      </Column>

      <Column sm={4} md={8} lg={16}>
        <h2 className="dashboard-page__subheading">
          {t('content.dashboard.subheading')}
        </h2>
      </Column>

      <Column sm={4} md={8} lg={16} className="dashboard-summary-tiles">
        <Grid narrow fullWidth>
          <Column sm={4} md={8} lg={5}>
            <Tile>
              <Grid narrow fullWidth>
                <Column sm={1} md={1} lg={2}>
                  <div className="dashboard-page__tile_number">
                    <span className="dashboard-page__danger">{danger}</span>
                  </div>
                </Column>
                <Column sm={3} md={7} lg={3}>
                  <div className="dashboard-page__tile_heading">
                    {t('content.dashboard.tileHeadingDanger')}
                  </div>
                  <div className="dashboard-page__tile_subheading">
                    {t('content.dashboard.tileSubheadingDanger')}
                  </div>
                </Column>
              </Grid>
            </Tile>
          </Column>
          <Column sm={4} md={8} lg={5}>
            <Tile>
              <Grid narrow fullWidth>
                <Column sm={1} md={1} lg={2}>
                  <div className="dashboard-page__tile_number">
                    <span className="dashboard-page__warning">{warning}</span>
                  </div>
                </Column>
                <Column sm={3} md={7} lg={3}>
                  <div className="dashboard-page__tile_heading">
                    {t('content.dashboard.tileHeadingWarning')}
                  </div>
                  <div className="dashboard-page__tile_subheading">
                    {t('content.dashboard.tileSubheadingWarning')}
                  </div>
                </Column>
              </Grid>
            </Tile>
          </Column>
          <Column sm={4} md={8} lg={6}>
            <Tile>
              <Grid narrow fullWidth>
                <Column sm={1} md={1} lg={2}>
                  <div className="dashboard-page__tile_number">
                    <span className="dashboard-page__normal">{normal}</span>
                  </div>
                </Column>
                <Column sm={3} md={7} lg={4}>
                  <div className="dashboard-page__tile_heading">
                    {t('content.dashboard.tileHeadingNormal')}
                  </div>
                  <div className="dashboard-page__tile_subheading">
                    {t('content.dashboard.tileSubheadingNormal')}
                  </div>
                </Column>
              </Grid>
            </Tile>
          </Column>
        </Grid>
      </Column>

      {dashboard !== undefined &&
        dashboard.length !== 0 &&
        dashboard.map !== undefined &&
        dashboard.map(
          ({
            device_id,
            device_name,
            timestamp_mins,
            device_timestamp,
            temperature,
            humidity,
            carbon_monoxide,
            nitrogen_dioxide,
            increment,
          }) => (
            <DeviceDashboardGaugeSet
              key={device_id}
              device_id={device_id}
              device_name={device_name}
              timestamp_mins={timestamp_mins}
              device_timestamp={device_timestamp}
              temperature={temperature}
              humidity={humidity}
              carbon_monoxide={carbon_monoxide}
              nitrogen_dioxide={nitrogen_dioxide}
              increment={'now'}
            />
          ),
        )}

      {(dashboard == undefined ||
        dashboard.length == 0 ||
        dashboard.map == undefined) && (
        <Column sm={4} md={8} lg={16}>
          <div className="dashboard-tile background-">
            <div className="label-firefighter">
              {t('content.dashboard.noDevices')}
            </div>
          </div>
        </Column>
      )}
    </Grid>
  );
};

export default DashboardGrid;
