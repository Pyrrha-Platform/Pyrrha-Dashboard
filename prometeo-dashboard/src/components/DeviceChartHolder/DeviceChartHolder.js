import React from 'react';
import DeviceChart from '../DeviceChart';

function DeviceChartHolder({ device_id, type, data, unit, limit, increment }) {
  return (
    <div className="bx--grid bx--grid--full-width details-content">
      <div className="bx--row details-tile">
        <div className="bx--col-md-16 label-firefighter">
          {type}
          <br />
          {increment}
        </div>
      </div>
      <div className="bx--row details-tile">
        <div className="bx--col bx--col-md-16">
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
