import * as d3 from 'd3';
import React, { useRef, useEffect, useContext } from 'react';
import Constants from '../../utils/Constants';
import Utils from '../../utils/Utils';
import AppContext from '../../context/app';

function DeviceChart({ device_id, type, data, unit, limit, increment }) {
  const ref = useRef();
  const { t } = useContext(AppContext);

  const margin = { top: 10, right: 30, bottom: 30, left: 50 },
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // On first load
  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
  }, []);

  // On first load
  useEffect(() => {
    draw(device_id, type, data, unit);
  }, [data]);

  const draw = (device_id, type, data, unit) => {
    // console.log("draw()");
    d3.select(ref.current).selectAll('*').remove();

    const svg = d3
      .select(ref.current)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const [yellowThreshold, redThreshold] = Utils.getChartLimit(
      type,
      increment,
    );

    // Add X axis --> it is a time format
    const x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          // console.log("d.device_timestamp", d.device_timestamp);
          // console.log("d.device_timestamp d3.utcParse", d3.utcParse("%Y-%m-%dT%H:%M:%S")(d.device_timestamp));
          return d3.utcParse('%Y-%m-%dT%H:%M:%S+00:00')(d.device_timestamp);
        }),
      )
      .range([0, width]);

    svg
      .append('g')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(x));

    svg
      .append('text')
      .attr(
        'transform',
        'translate(' + width / 2 + ', ' + (height + margin.top + 20) + ')',
      )
      .style('text-anchor', 'middle')
      .text(t('content.details.time'));

    // Add Y axis
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          // console.log("d.value", +d.value);
          return +d.value > redThreshold ? +d.value : redThreshold;
        }),
      ])
      .range([height, 0]);

    svg.append('g').call(d3.axisLeft(y));

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(t('content.details.measure'));

    // Add the yellow threshold
    /*
    console.log("width", width);
    console.log("yellowThreshold", yellowThreshold);
    */
    svg
      .append('line')
      .style('stroke', Constants.YELLOW)
      .attr('stroke-width', 1.5)
      .attr('x1', 0)
      .attr('y1', y(yellowThreshold))
      .attr('x2', width)
      .attr('y2', y(yellowThreshold));

    // Add the red threshold
    /*
    console.log("redThreshold", redThreshold);
    console.log("-----");
    */
    svg
      .append('line')
      .style('stroke', Constants.RED)
      .attr('stroke-width', 1.5)
      .attr('x1', 0)
      .attr('y1', y(redThreshold))
      .attr('x2', width)
      .attr('y2', y(redThreshold));

    // Add the line
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', Constants.BLUE_DK)
      .attr('stroke-width', 3)
      .attr(
        'd',
        d3
          .line()
          .x(function (d) {
            return x(
              d3.utcParse('%Y-%m-%dT%H:%M:%S+00:00')(d.device_timestamp),
            );
          })
          .y(function (d) {
            return y(d.value);
          })
          .curve(d3.curveLinear),
      );

    // Tooltip
    const mouseover = function (event, d) {
      // console.log('mouseover', d);
      d3.select('#device-chart-tooltip')
        .html(
          `
        <div class="content-box">
          <ul class="multi-tooltip">
            <li>
            <div class="datapoint-tooltip">
              <p class="label">Value</p>
              <p class="value">${d.value}</p>
            </div>
            </li>
            <li>
            <div class="datapoint-tooltip">
              <p class="label">Time</p>
              <p class="value">${d3
                .utcParse('%Y-%m-%dT%H:%M:%S+00:00')(d.device_timestamp)
                .toTimeString()}</p>
            </div>
            </li>
          </ul>
        </div>    
      `,
        )
        .style('opacity', 1)
        .transition()
        .duration(200);
    };

    const mousemove = function (event, d) {
      // console.log('mousemove', d);
      d3.select('#device-chart-tooltip')
        .html(
          `
          <div class="content-box">
            <ul class="multi-tooltip">
              <li>
              <div class="datapoint-tooltip">
                <p class="label">Value</p>
                <p class="value">${d.value}</p>
              </div>
              </li>
              <li>
              <div class="datapoint-tooltip">
                <p class="label">Time</p>
                <p class="value">${d3
                  .utcParse('%Y-%m-%dT%H:%M:%S+00:00')(d.device_timestamp)
                  .toTimeString()}</p>
              </div>
              </li>
            </ul>
          </div>    
        `,
        )
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY + 10 + 'px');
    };

    const mouseout = function (event, d) {
      // console.log('mouseout', d);
      d3.select('#device-chart-tooltip')
        .transition()
        .duration(200)
        .style('opacity', 0);
    };

    // Highlight the data points
    svg
      .selectAll('data-points')
      .data(data)
      .enter()
      .append('circle')
      .attr('fill', Constants.WHITE)
      .attr('stroke', Constants.BLUE_DK)
      .attr('stroke-width', 1)
      .attr('cx', function (d) {
        return x(d3.utcParse('%Y-%m-%dT%H:%M:%S+00:00')(d.device_timestamp));
      })
      .attr('cy', function (d) {
        return y(d.value);
      })
      .attr('r', 3)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);
  };

  return <svg ref={ref}></svg>;
}

export default DeviceChart;
