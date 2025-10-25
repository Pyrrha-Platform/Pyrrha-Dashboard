import React from 'react';
import DeviceChart from '../DeviceChart';
import { Grid, Column } from '@carbon/react';

function DeviceChartHolder({ device_id, type, data, unit, limit, increment }) {
  return (
    <div className="device-details-gauge-set">
      <Grid narrow fullWidth>
        <Column sm={4} md={8} lg={16}>
          <div className="dashboard-tile background-database">
            <div className="label-firefighter">
              {type}
              <br />
              {increment}
            </div>
          </div>
        </Column>
        <Column sm={4} md={8} lg={16}>
          <div className="dashboard-tile background-database">
            <div id="device-chart-tooltip" className="cds--cc--tooltip" />
            <DeviceChart
              device_id={device_id}
              type={type}
              data={data}
              unit={unit}
              limit={limit}
              increment={increment}
            />
          </div>
        </Column>
      </Grid>
    </div>
  );
}

export default DeviceChartHolder;
