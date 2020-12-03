import * as d3 from "d3";
import React, { useRef, useEffect, useContext } from "react";
import Constants from "../../utils/Constants";
import Context from "../../context/app";

function FirefighterChart({
  firefighterId,
  type,
  data,
  unit,
  limit,
  increment,
}) {
  const ref = useRef();
  const { t } = useContext(Context);

  var margin = { top: 10, right: 30, bottom: 30, left: 50 },
    width = 1200 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // On first load
  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
  }, []);

  // On first load
  useEffect(() => {
    draw(firefighterId, type, data, unit);
  }, [data]);

  const draw = (firefighterId, type, data, unit) => {
    console.log("draw()");
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var redThreshold = Constants.CO_RED;
    var yellowThreshold = Constants.CO_YELLOW;
    if (type === "NO2") {
      redThreshold = Constants.NO2_RED;
      yellowThreshold = Constants.NO2_YELLOW;
    }

    // Add X axis --> it is a time format
    var x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function (d) {
          console.log("d.deviceTimestamp", d.deviceTimestamp);
          console.log(
            "d.deviceTimestamp d3.utcParse",
            d3.utcParse("%Y-%m-%dT%H:%M:%S")(d.deviceTimestamp)
          );
          return d3.utcParse("%Y-%m-%dT%H:%M:%S")(d.deviceTimestamp);
        })
      )
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", "translate(0, " + height + ")")
      .call(d3.axisBottom(x));

    svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + ", " + (height + margin.top + 20) + ")"
      )
      .style("text-anchor", "middle")
      .text(t("content.details.time"));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          console.log("d.value", +d.value);
          return +d.value;
        }),
      ])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(t("content.details.measure"));

    // Add the area
    svg
      .append("path")
      .datum(data)
      .attr("fill", Constants.BLUE_LT)
      .attr("stroke", Constants.BLUE_DK)
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .area()
          .x(function (d) {
            return x(d3.utcParse("%Y-%m-%dT%H:%M:%S")(d.deviceTimestamp));
          })
          .y0(y(0))
          .y1(function (d) {
            return y(d.value);
          })
      );

    // Add the yellow threshold
    console.log("width", width);
    console.log("yellowThreshold", yellowThreshold);
    svg
      .append("line")
      .style("stroke", Constants.YELLOW)
      .attr("x1", 0)
      .attr("y1", y(yellowThreshold))
      .attr("x2", width)
      .attr("y2", y(yellowThreshold));

    // Add the red threshold
    console.log("redThreshold", redThreshold);
    console.log("-----");
    svg
      .append("line")
      .style("stroke", Constants.RED)
      .attr("x1", 0)
      .attr("y1", y(redThreshold))
      .attr("x2", width)
      .attr("y2", y(redThreshold));
  };

  return <svg ref={ref}></svg>;
}

export default FirefighterChart;
