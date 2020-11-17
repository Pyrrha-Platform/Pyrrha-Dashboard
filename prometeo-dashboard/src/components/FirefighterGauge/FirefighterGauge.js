import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function FirefighterGauge({ firefighterId, type, initialNumber, unit, number, limit }){
    const ref = useRef();

    // On first load
    useEffect(() => {
        console.log('useEffect draw');
        const svg = d3.select(ref.current)
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);
        draw(firefighterId, type, initialNumber, unit);
    }, []);

    // When data changes
    useEffect(() => {
        console.log('useEffect change');
        change(firefighterId, type, 33, 0.7);
    }, [number]);

    //
    var tau = 2 * Math.PI;

    var arc = d3.arc()
        .innerRadius(21)
        .outerRadius(30)
        .startAngle(0);
    
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = 80 - margin.left - margin.right,
        height = 80 - margin.top - margin.bottom;
    
    const arcTween = (newAngle) => {
        return function(d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return function(t) {
                d.endAngle = interpolate(t);
                return arc(d);
            };
        };
    }
   
    var red = 'red';
    var yellow = 'yellow';
    var green = 'green';
    var initialColor = '#ddd';
   
    const getStatusColor = (type, initialNumber) => {
        var color = initialColor;
        if (type == 'CO') {
            if (initialNumber <= 0.81) {
                color = green;
            } else if (initialNumber >= 0.99 || initialNumber == -1) {
                color = red;
            } else if (initialNumber > 0.81 && initialNumber < 0.99) {
                color = yellow;
            }
        } else if (type == 'NO2') {
            if (initialNumber <= 0.81) {
                color = green;
            } else if (initialNumber >= 0.99 || initialNumber == -1) {
                color = red;
            } else if (initialNumber > 0.81 && initialNumber < 0.99) {
                color = yellow;
            }
        } else if (type == 'Tmp') {
            if (initialNumber <= 0.25) {
                color = green;
            } else if (initialNumber >= 0.35) {
                color = red;
            } else if (initialNumber > 0.25 && initialNumber < 0.35) {
                color = yellow;
            }
        } else if (type == 'Hum') {
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
    
    const getWhole = (value, type) => {
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
    //

    const draw = (firefighterId, type, initialNumber, unit) => {
        const color = getStatusColor(type, initialNumber);
        console.log('draw()', firefighterId, type, initialNumber, unit);

        const svg = d3.select(ref.current).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        g.append("path").datum({endAngle: tau}).style("fill", "#ddd").attr("d", arc);
        g.append("path").datum({endAngle: 0 * tau}).style("fill", color).attr("d", arc).attr("id", "angle-" + type + "-" + firefighterId);
        
        const label = g.append("text").attr("dy", "0").attr("x", "0").attr("y", "0");
        label.append("tspan").attr("class", "label-num").text(initialNumber).attr("x", "0").attr("id", "number-" + type + "-" + firefighterId);
        label.append("tspan").attr("class", "label-unit").text(unit).attr("x", "0").attr("dy", "1.2em");
    }

    const change = (firefighterId, type, number, limit) => {
        console.log('change()', firefighterId, type, number, limit);
        d3.select("#angle-" + type + "-" + firefighterId).transition().duration(750).style("fill", getStatusColor(type, limit)).attrTween("d", arcTween(limit * tau));
        d3.select("#number-" + type + "-" + firefighterId).text(number);
    }

    return (
        <svg ref={ref}></svg>
    )

}

export default FirefighterGauge;