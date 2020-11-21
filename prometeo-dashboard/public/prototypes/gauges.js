// From http://bl.ocks.org/mbostock/5100636

var tau = 2 * Math.PI;

var arc = d3.arc().innerRadius(21).outerRadius(30).startAngle(0);

var width = 80;
var height = 60;

function arcTween(newAngle) {
  return function (d) {
    var interpolate = d3.interpolate(d.endAngle, newAngle);
    return function (t) {
      d.endAngle = interpolate(t);
      return arc(d);
    };
  };
}

var red = "red";
var yellow = "yellow";
var green = "green";
var initialColor = "#ddd";

function renderGauge(parent, firefighterId, type, initialNumber, unit) {
  var color = getStatusColor(type, initialNumber);
  var svg = d3
    .select(parent)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  g = svg
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  var bg = g
    .append("path")
    .datum({ endAngle: tau })
    .style("fill", "#ddd")
    .attr("d", arc);
  var fg = g
    .append("path")
    .datum({ endAngle: 0 * tau })
    .style("fill", color)
    .attr("d", arc);
  var label = g.append("text").attr("dy", "0").attr("x", "0").attr("y", "0");
  var num = label
    .append("tspan")
    .attr("class", "label-num")
    .text(initialNumber)
    .attr("x", "0");
  var unit = label
    .append("tspan")
    .attr("class", "label-unit")
    .text(unit)
    .attr("x", "0")
    .attr("dy", "1.2em");
  return { fg: fg, num: num };
}

function getStatusColor(type, initialNumber) {
  var color = initialColor;
  if (type == "CO") {
    if (initialNumber <= 0.81) {
      color = green;
    } else if (initialNumber >= 0.99 || initialNumber == -1) {
      color = red;
    } else if (initialNumber > 0.81 && initialNumber < 0.99) {
      color = yellow;
    }
  } else if (type == "NO2") {
    if (initialNumber <= 0.81) {
      color = green;
    } else if (initialNumber >= 0.99 || initialNumber == -1) {
      color = red;
    } else if (initialNumber > 0.81 && initialNumber < 0.99) {
      color = yellow;
    }
  } else if (type == "Tmp") {
    if (initialNumber <= 0.25) {
      color = green;
    } else if (initialNumber >= 0.35) {
      color = red;
    } else if (initialNumber > 0.25 && initialNumber < 0.35) {
      color = yellow;
    }
  } else if (type == "Hum") {
    if (initialNumber <= 0.6) {
      color = green;
    } else if (initialNumber >= 0.8) {
      color = red;
    } else if (initialNumber > 0.6 && initialNumber < 0.8) {
      color = yellow;
    }
  }
  return color;
}

function getWhole(value, type) {
  var number = 0.0;
  if (type == "Tmp") {
    var upper = 40;
    var lower = 0;
    var range = upper - lower;
    number = value / range;
  } else if (type == "Hum") {
    var upper = 100;
    var lower = 0;
    var range = upper - lower;
    number = value / range;
  }
  return number;
}
