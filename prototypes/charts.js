// From https://www.d3-graph-gallery.com/graph/area_basic.html

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 50 },
  width = 600 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var red = 'red';
var yellow = 'yellow';
var green = 'green';
var initialColor = '#ddd';

function renderChart(parent, firefighter_id, type, value, unit) {
  var color = getStatusColor(type, value);
  var svg = d3
    .select(parent)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var csv = 'co.csv';
  var threshold = 40;
  if (type == 'CO') {
    csv = 'co.csv';
    threshold = 40;
  } else if (type == 'NO2') {
    csv = 'no2.csv';
    threshold = 20;
  }

  // Read the data
  d3.csv(
    csv,

    // When reading the csv, I must format variables:
    function (d) {
      return {
        date: d3.utcParse('%Y-%m-%dT%H:%M:%S+00:00')(d.date),
        value: d.value,
      };
    },

    // Now I can use this dataset:
    function (data) {
      // Add X axis --> it is a date format
      var x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            return d.date;
          })
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
          'translate(' + width / 2 + ', ' + (height + margin.top + 20) + ')'
        )
        .style('text-anchor', 'middle')
        .text('Time');

      // Add Y axis
      var y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d.value;
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
        .text('Measure (PPM)');

      // Add the area
      svg
        .append('path')
        .datum(data)
        .attr('fill', '#a6c8ff')
        .attr('stroke', '#0043ce')
        .attr('stroke-width', 1.5)
        .attr(
          'd',
          d3
            .area()
            .x(function (d) {
              return x(d.date);
            })
            .y0(y(0))
            .y1(function (d) {
              return y(d.value);
            })
        );

      // Add the threshold
      svg
        .append('line')
        .style('stroke', 'red')
        .attr('x1', 0)
        .attr('y1', y(threshold))
        .attr('x2', width)
        .attr('y2', y(threshold));
    }
  );
}

function getStatusColor(type, value) {
  var color = initialColor;
  if (type == 'CO') {
    if (value <= 0.81) {
      color = green;
    } else if (value >= 0.99 || value == -1) {
      color = red;
    } else if (value > 0.81 && value < 0.99) {
      color = yellow;
    }
  } else if (type == 'NO2') {
    if (value <= 0.81) {
      color = green;
    } else if (value >= 0.99 || value == -1) {
      color = red;
    } else if (value > 0.81 && value < 0.99) {
      color = yellow;
    }
  } else if (type == 'Tmp') {
    if (value <= 0.25) {
      color = green;
    } else if (value >= 0.35) {
      color = red;
    } else if (value > 0.25 && value < 0.35) {
      color = yellow;
    }
  } else if (type == 'Hum') {
    if (value <= 0.6) {
      color = green;
    } else if (value >= 0.8) {
      color = red;
    } else if (value > 0.6 && value < 0.8) {
      color = yellow;
    }
  }
  return color;
}

function getPercentage(value, type) {
  var number = 0.0;
  if (type == 'Tmp') {
    var upper = 40;
    var lower = 0;
    var range = upper - lower;
    number = value / range;
  } else if (type == 'Hum') {
    var upper = 100;
    var lower = 0;
    var range = upper - lower;
    number = value / range;
  }
  return number;
}
