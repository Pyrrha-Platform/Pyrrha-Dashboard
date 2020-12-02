import * as d3 from "d3";
import React, { useRef, useEffect, useContext } from "react";
import Constants from "../../utils/Constants";
import Utils from "../../utils/Utils";
import Context from "../../context/app";

function FirefighterGauge({
  firefighterId,
  type,
  value,
  unit,
  increment,
  gauge,
}) {
  const ref = useRef();
  const { t } = useContext(Context);

  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 80 - margin.left - margin.right,
    height = 80 - margin.top - margin.bottom;

  // On first load
  useEffect(() => {
    let svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);
    draw(svg, firefighterId, type, value, unit, increment, gauge);
  }, []);

  // When data changes
  useEffect(() => {
    change(firefighterId, type, value, unit, increment, gauge);
  }, [value]);

  // On first load
  const draw = (svg, firefighterId, type, value, unit, increment, gauge) => {
    svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let g = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    g.append("path")
      .datum({ endAngle: Constants.TAU })
      .style("fill", "#ddd")
      .attr("d", Constants.ARC);
    g.append("path")
      .datum({ endAngle: 0 * Constants.TAU })
      .style("fill", Utils.getStatusColor(type, value, increment, gauge))
      .attr("d", Constants.ARC)
      .attr("id", "angle-" + type + "-" + firefighterId);

    const label = g
      .append("text")
      .attr("dy", "0")
      .attr("x", "0")
      .attr("y", "0");
    label
      .append("tspan")
      .attr("class", "label-num")
      .text(value)
      .attr("x", "0")
      .attr("id", "number-" + type + "-" + firefighterId);
    label
      .append("tspan")
      .attr("class", "label-unit")
      .text(unit)
      .attr("x", "0")
      .attr("dy", "1.2em");
  };

  // When data changes
  const change = (firefighterId, type, value, unit, increment, gauge) => {
    console.log("firefighterId", firefighterId);
    console.log("type", type);
    console.log("value", value);
    console.log("unit", unit);
    console.log("increment", increment);
    console.log("gauge", gauge);
    let valueToUse = value;
    if (type === "Tmp" || type === "Hum") {
      valueToUse = Utils.getWhole(type, value);
    } else {
      valueToUse = gauge;
    }
    d3.select("#angle-" + type + "-" + firefighterId)
      .transition()
      .duration(750)
      .style("fill", Utils.getStatusColor(type, value, increment, gauge))
      .attrTween("d", Utils.arcTween(valueToUse * Constants.TAU));
    d3.select("#number-" + type + "-" + firefighterId).text(value);
  };

  return <svg ref={ref}></svg>;
}

export default FirefighterGauge;
