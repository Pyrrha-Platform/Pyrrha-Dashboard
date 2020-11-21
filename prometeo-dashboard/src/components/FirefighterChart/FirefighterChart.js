import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import coData from './co.csv';
import no2Data from './no2.csv';

function FirefighterChart({ w, h, firefighterId, type, initialNumber, unit }){
    const ref = useRef();

    //
    var margin = {top: 10, right: 30, bottom: 30, left: 50},
        width = 1200 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var red = 'red';
    var yellow = 'yellow';
    var green = 'green';
    var initialColor = '#ddd';
 
    const getStatusColor = (type, initialNumber) => {
        var color = initialColor;
        if (type === 'CO') {
            if (initialNumber <= 0.81) {
                color = green;
            } else if (initialNumber >= 0.99 || initialNumber === -1) {
                color = red;
            } else if (initialNumber > 0.81 && initialNumber < 0.99) {
                color = yellow;
            }
        } else if (type === 'NO2') {
            if (initialNumber <= 0.81) {
                color = green;
            } else if (initialNumber >= 0.99 || initialNumber === -1) {
                color = red;
            } else if (initialNumber > 0.81 && initialNumber < 0.99) {
                color = yellow;
            }
        } else if (type === 'Tmp') {
            if (initialNumber <= 0.25) {
                color = green;
            } else if (initialNumber >= 0.35) {
                color = red;
            } else if (initialNumber > 0.25 && initialNumber < 0.35) {
                color = yellow;
            }
        } else if (type === 'Hum') {
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
    //

    useEffect(() => {
        const svg = d3.select(ref.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          
    }, []);

    useEffect(() => {
        draw(firefighterId, type, initialNumber, unit);
    }, [initialColor]);

    const draw = (firefighterId, type, initialNumber, unit) => {
        
        const svg = d3.select(ref.current).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var color = getStatusColor(type, initialNumber);

        var csv = coData;
        var threshold = 40;
        if (type === 'CO') {
            csv = coData;
            threshold = 40;
        } else if (type === 'NO2') {
            csv = no2Data;
            threshold = 20;
        }

        // Read the data
        d3.csv(csv,

            // When reading the csv, I must format variables:
            function(d){
                return { time: d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.time), value: d.value }
            },

            // Now I can use this dataset:
        ).then(function(data) {

                // Add X axis --> it is a time format
                var x = d3.scaleTime()
                .domain(d3.extent(data, function(d) { return d.time; }))
                .range([ 0, width ]);

                svg.append("g")
                .attr("transform", "translate(0, " + height + ")")
                .call(d3.axisBottom(x));

                svg.append("text")             
                .attr("transform", "translate(" + (width / 2) + ", " + (height + margin.top + 20) + ")")
                .style("text-anchor", "middle")
                .text("Time");

                // Add Y axis
                var y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return +d.value; })])
                .range([ height, 0 ]);

                svg.append("g")
                .call(d3.axisLeft(y));

                svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x",0 - (height / 2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .text("Measure (PPM)");  

                // Add the area
                svg.append("path")
                .datum(data)
                .attr("fill", "#a6c8ff")
                .attr("stroke", "#0043ce")
                .attr("stroke-width", 1.5)
                .attr("d", d3.area()
                    .x(function(d) { return x(d.time) })
                    .y0(y(0))
                    .y1(function(d) { return y(d.value) })
                    );

                // Add the threshold
                console.log(width);
                console.log(threshold);
                svg.append("line")
                .style("stroke", "red")
                    .attr("x1", 0)
                    .attr("y1", y(threshold))
                    .attr("x2", width)
                    .attr("y2", y(threshold));

            }

        );

    }

    return (
        <svg ref={ref}></svg>
    )

}

export default FirefighterChart;