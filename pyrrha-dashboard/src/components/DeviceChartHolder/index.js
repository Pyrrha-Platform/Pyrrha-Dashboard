import React from 'react';
import DeviceChart from '../DeviceChart';

function DeviceChartHolder({ device_id, type, data, unit, limit, increment }) {
  return (
    <div className="cds--grid cds--grid--full-width details-content">
      <div className="cds--row details-tile">
        <div className="cds--col-md-16 label-firefighter">
          {type}
          <br />
          {increment}
        </div>
      </div>
      <div className="cds--row details-tile">
        <div id="device-chart-tooltip" className="cds--cc--tooltip" />
        <div className="cds--col cds--col-md-16">
          <DeviceChart
            device_id={device_id}
            type={type}
            data={data}
            unit={unit}
            limit={limit}
            increment={increment}
          />
        </div>
      </div>
    </div>
  );
}

export default DeviceChartHolder;
