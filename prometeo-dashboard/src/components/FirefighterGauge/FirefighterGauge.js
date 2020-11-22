import * as d3 from "d3";
import React, { useRef, useEffect } from "react";
import Constants from "../../utils/Constants.js";
import Utils from "../../utils/Utils.js";

function FirefighterGauge({
  firefighterId,
  type,
  initialNumber,
  unit,
  number,
  limit,
}) {
  const ref = useRef();

  /*
  const Chart = ({ dateRange }) => {
    const [data, setData] = useState()
    useEffect(() => {
      // when Chart mounts, do this
      const newData = getDataWithinRange(dateRange)
      setData(newData)
      // when data updates, do this
      // not used right now
      return () => {
        // when data updates, do this
        // not used right now
        // before Chart unmounts, do this
        // not used right now
      }
    }, [dateRange])
    return (
      <svg className="Chart" />
    )
  }
  */


  // On first load
  useEffect(() => {
    console.log("useEffect draw");
    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    draw(firefighterId, type, initialNumber, unit);
  }, []);

  // When data changes
  useEffect(() => {
    console.log("useEffect change");
    change(firefighterId, type, 33, 0.7);
  }, [number]);

  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 80 - margin.left - margin.right,
    height = 80 - margin.top - margin.bottom;

  // For initial load
  const draw = (firefighterId, type, initialNumber, unit) => {
    const color = Utils.getStatusColor(type, initialNumber);
    console.log("draw()", firefighterId, type, initialNumber, unit);

    const svg = d3
      .select(ref.current)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const g = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    g.append("path")
      .datum({ endAngle: Constants.TAU })
      .style("fill", "#ddd")
      .attr("d", Constants.ARC);
    g.append("path")
      .datum({ endAngle: 0 * Constants.TAU })
      .style("fill", color)
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
      .text(initialNumber)
      .attr("x", "0")
      .attr("id", "number-" + type + "-" + firefighterId);
    label
      .append("tspan")
      .attr("class", "label-unit")
      .text(unit)
      .attr("x", "0")
      .attr("dy", "1.2em");
  };

  // On each change
  const change = (firefighterId, type, number, limit) => {
    console.log("change()", firefighterId, type, number, limit);
    d3.select("#angle-" + type + "-" + firefighterId)
      .transition()
      .duration(750)
      .style("fill", Utils.getStatusColor(type, limit))
      .attrTween("d", Utils.arcTween(limit * Constants.TAU));
    d3.select("#number-" + type + "-" + firefighterId).text(number);
  };

  return <svg ref={ref}></svg>;
}

export default FirefighterGauge;
