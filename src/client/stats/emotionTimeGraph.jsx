import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function EmotionTimeGraph({ data }) {
  var [counts, setCounts] = useState([]);

  const width = 700;
  const height = 275;
  const margin = { top: 50, bottom: 25, left: 35, right: 35 };
  const rectWidth = 20;
  
  var svg = d3.select("#graphTime");
  svg.attr("transform", `translate(25, 25)`);
  var xScale = d3
    .scalePoint()
    .range([margin.right, width - margin.right])
    .padding(0.5);
  var yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
  var yAxis = d3.axisRight().scale(yScale).ticks(3);
  var yAxis2 = d3.axisLeft().scale(yScale).ticks(3);
  var xAxis = d3.axisBottom().scale(xScale);
  var heightScale = d3.scaleLinear().range([0, height - margin.top - margin.bottom]);
  
  if (svg.select(".yAxis").node() === null) {
    svg.append("g").attr("class", "xAxis");
    svg.append("g").attr("class", "yAxis");
    svg.append("g").attr("class", "yAxis2");
  }

  if (svg.select(".title").node() === null) {
    let titleFontSize = 24;
    svg
      .append('line')
      .attr('x1', margin.left - 2)
      .attr('x2', 145)
      .attr('y1', 30)
      .attr('y2', 30)
      .attr('stroke-width', 2)
      .attr('stroke', '#718096')
    svg
      .append("text")
      .attr("class", "title")
      .attr("x", margin.left)
      .attr("y", margin.top * 0.4)    
      .attr('fill', '#718096')  
      .style('font-size', `${titleFontSize}px`)
      .style('font-family', 'bold')
      .text("By Year");
  }

  useEffect(function countYears() {
    if (data.length > 0) {
      let output = {};
      for (let memory of data) {
        let year = memory.date.length === 10 ? memory.date.slice(0,4) : 'none';
        if (!output.hasOwnProperty(year)) {
          output[year] = 1;
        } else {
          output[year]++;
        }
      }
      let outputArray = [];
      for (let key in output) {
        outputArray.push({ key, count: output[key] });
      }
      outputArray.sort((a, b) => {
        var num1 = parseInt(a);
        var num2 = parseInt(b);
        return num1 < num2 ? -1 : 1;
      });
      // Don't show none dated data
      outputArray.pop();
      setCounts(outputArray);
    } else {
      setCounts([]);
    }
  }, [data]);

  useEffect(function updateYears() {
    var t = d3.transition().duration(1000);

    var yMax = d3.max(counts, (d) => d.count);
    yScale.domain([0, yMax + 1]).nice();
    heightScale.domain([0, yMax + 1]).nice();

    svg
      .select(".yAxis")
      .attr("transform", `translate(${width - margin.right}, 0)`)
      .transition(t)
      .call(yAxis);
    svg
      .select(".yAxis2")
      .attr("transform", `translate(${margin.left}, 0)`)
      .transition(t)
      .call(yAxis2);

    xScale.domain(counts.map(item => item.key));

    svg
      .select(".xAxis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .transition(t)
      .call(xAxis);

    var rect = svg.selectAll("rect").data(counts, (d) => d.key);
    rect.exit()
    .transition(t)
    .attr('y', height - margin.bottom)
    .attr('height', 0)
    .remove();
    var enter = rect.enter()
      .append("rect")
      .attr('x', (d) => xScale(d.key))
      .attr('y', d => yScale(d.count))
      .attr('width', rectWidth)
      .attr('height', d => heightScale(d.count))
      .attr('fill', '#718096');

    enter
      .merge(rect)
      .attr('width', rectWidth)
      .transition(t)
      .attr('x', (d) => xScale(d.key) - (.5 * rectWidth))
      .attr('y', d => yScale(d.count))
      .attr('height', d => heightScale(d.count))
      .attr('fill', '#718096');

    svg.selectAll(".xAxis text")
      .attr("font-weight", "bold")
      .attr("font-size", "18px")
      .attr("fill", "#2d3748");
    svg.selectAll(".yAxis text")
      .attr("font-weight", "bold")
      .attr("font-size", "18px")
      .attr("fill", "#2d3748");
    svg.selectAll(".yAxis2 text")
      .attr("font-weight", "bold")
      .attr("font-size", "18px")
      .attr("fill", "#2d3748");
  }, [counts]);

  return (
    <svg
      id="graphTime"
      style={{ width: `${width}px`, height: `${height}px` }}
    ></svg>
  );
};

export default EmotionTimeGraph;