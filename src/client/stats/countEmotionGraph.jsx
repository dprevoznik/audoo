import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function CountEmotionsGraph({ data }) {
  var [counts, setCounts] = useState([]);

  const width = 700;
  const height = 275;
  const margin = { top: 50, bottom: 25, left: 35, right: 35 };
  const fontSize = 38;

  var svg = d3.select("#graphCount");
  svg.attr("transform", `translate(25, 25)`);
  var xScale = d3.scaleLinear().range([margin.left, width - margin.right]);
  var yScale = d3
    .scalePoint()
    .range([margin.left, height - margin.bottom])
    .padding(0.5);
  var xAxis = d3.axisBottom().scale(xScale).ticks(4);

  if (svg.select(".xAxis").node() === null) {
    svg.append("g").attr("class", "xAxis");
  }
  if (svg.select(".title").node() === null) {
    let titleFontSize = 24;
    svg
      .append("line")
      .attr("x1", margin.left - 2)
      .attr("x2", 145)
      .attr("y1", 30)
      .attr("y2", 30)
      .attr("stroke-width", 2)
      .attr("stroke", "#718096");
    svg
      .append("text")
      .attr("class", "title")
      .attr("x", margin.left)
      .attr("y", margin.top * 0.4)
      .attr("fill", "#718096")
      .style("font-size", `${titleFontSize}px`)
      .style("font-family", "bold")

      .text("By Feeling");
  }

  useEffect(
    function countFeelings() {
      if (data.length > 0) {
        let output = {};
        for (let memory of data) {
          if (!output.hasOwnProperty(memory.emoji)) {
            output[memory.emoji] = 1;
          } else {
            output[memory.emoji]++;
          }
        }
        let outputArray = [];
        for (let key in output) {
          outputArray.push({ key, count: output[key] });
        }
        outputArray.sort((a, b) => {
          var textA = a.key.toUpperCase();
          var textB = b.key.toUpperCase();
          return textA < textB ? 1 : -1;
        });
        setCounts(outputArray);
      } else {
        setCounts([]);
      }
    },
    [data]
  );

  useEffect(
    function updateFeelings() {
      var t = d3.transition().duration(1000);

      var xMax = d3.max(counts, (d) => d.count);
      xScale.domain([0, xMax + 2]);

      var yDomain = counts.map((d) => d.key);
      yScale.domain(yDomain);

      svg
        .select(".xAxis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .transition(t)
        .call(xAxis);

      var text = svg.selectAll(".graphData").data(counts, (d) => d.key);
      text.exit().transition(t).style("opacity", 0).remove();
      var enter = text
        .enter()
        .append("text")
        .attr("class", "graphData")
        .text((d) => {
          if (d.key === "smiley") return "😊";
          if (d.key === "neutral") return "😐";
          if (d.key === "frowning") return "☹️";
        })
        .attr("x", (d) => xScale(d.count) - fontSize * 0.7);

      enter
        .merge(text)
        .transition(t)
        .attr("x", (d) => xScale(d.count) - fontSize * 0.7)
        .attr("y", (d) => yScale(d.key))
        .attr("font-size", `${fontSize}px`);

      svg
        .selectAll(".xAxis text")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .attr("fill", "#2d3748");
    },
    [counts]
  );

  return (
    <svg
      id="graphCount"
      style={{ width: `${width}px`, height: `${height}px` }}
    ></svg>
  );
}

export default CountEmotionsGraph;