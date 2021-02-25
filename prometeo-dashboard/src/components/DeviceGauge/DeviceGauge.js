import * as d3 from 'd3';
import React, { useRef, useEffect, useContext } from 'react';
import Constants from '../../utils/Constants';
import Utils from '../../utils/Utils';
import AppContext from '../../context/app';

function DeviceGauge({ device_id, type, value, unit, increment, gauge }) {
  const ref = useRef();
  const { t } = useContext(AppContext);

  const url_safe_device_id = device_id.replaceAll(':', '_');

  /*
  console.log("DeviceGauge");
  console.log("url_safe_device_id", url_safe_device_id);
  console.log("type", type);
  console.log("value", value);
  console.log("unit", unit);
  console.log("increment", increment);
  console.log("gauge", gauge);
  console.log("----------------");
  */

  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 80 - margin.left - margin.right,
    height = 80 - margin.top - margin.bottom;

  // On first load
  useEffect(() => {
    let svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height);
    draw(svg, url_safe_device_id, type, value, unit, increment, gauge);
  }, []);

  // When data changes
  useEffect(() => {
    change(url_safe_device_id, type, value, unit, increment, gauge);
  }, [value]);

  // On first load
  const draw = (svg, url_safe_device_id, type, value, unit, increment, gauge) => {
    /*
    console.log("draw()");
    console.log("url_safe_device_id", url_safe_device_id);
    console.log("type", type);
    console.log("value", value);
    console.log("unit", unit);
    console.log("increment", increment);
    console.log("gauge", gauge);
    console.log("----");
    */

    svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    let g = svg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    g.append('path')
      .datum({ endAngle: Constants.TAU })
      .style('fill', '#e0e0e0')
      .attr('d', Constants.ARC);
    g.append('path')
      .datum({ endAngle: 0 * Constants.TAU })
      .style('fill', Utils.getStatusColor(type, value, increment, gauge))
      .attr('d', Constants.ARC)
      .attr('id', 'angle-' + type + '-' + increment + '-' + url_safe_device_id);

    const label = g
      .append('text')
      .attr('dy', '0')
      .attr('x', '0')
      .attr('y', '0');
    label
      .append('tspan')
      .attr('class', 'label-num')
      .text(Utils.formatFloat(value, 2))
      .attr('x', '0')
      .attr('id', 'number-' + type + '-' + increment + '-' + url_safe_device_id);
    label
      .append('tspan')
      .attr('class', 'label-unit')
      .text(unit)
      .attr('x', '0')
      .attr('dy', '1.2em');
  };

  // When data changes
  const change = (url_safe_device_id, type, value, unit, increment, gauge) => {
    /*
    console.log("change()");
    console.log("url_safe_device_id", url_safe_device_id);
    console.log("type", type);
    console.log("value", value);
    console.log("unit", unit);
    console.log("increment", increment);
    console.log("gauge", gauge);
    */

    let valueToUse = value;
    if (type === 'Tmp' || type === 'Hum') {
      valueToUse = Utils.getPercentage(type, value, increment);
    } else {
      valueToUse = gauge;
    }

    /*
    console.log("arcTween", valueToUse * Constants.TAU);
    console.log("----");
    */

    d3.select('#angle-' + type + '-' + increment + '-' + url_safe_device_id)
      .transition()
      .duration(750)
      .style('fill', Utils.getStatusColor(type, value, increment, gauge))
      .attrTween('d', Utils.arcTween(valueToUse * Constants.TAU));
    d3.select('#number-' + type + '-' + increment + '-' + url_safe_device_id).text(
      Utils.formatFloat(value, 2)
    );
  };

  return <svg ref={ref}></svg>;
}

export default DeviceGauge;
