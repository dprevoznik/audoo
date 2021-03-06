import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function CountEmotionsGraph({ data }) {
  var [counts, setCounts] = useState([]);

  const width = 250;
  const height = 250;
  const margin = { top: 20, bottom: 25, left: 30, right: 30 };
  const fontSize = 30;

  var svg = d3.select("#graphCount");
  svg.attr("transform", `translate(25, 25)`);
  var xScale = d3
    .scalePoint()
    .range([margin.right, width - margin.right])
    .padding(0.5);
  var yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
  var yAxis = d3.axisRight().scale(yScale).ticks(3);
  var yAxis2 = d3.axisLeft().scale(yScale).ticks(3);
  var xAxis = d3.axisBottom().scale(xScale);

  if (svg.select(".yAxis").node() === null) {
    svg.append("g").attr("class", "xAxis");
    svg.append("g").attr("class", "yAxis");
    svg.append("g").attr("class", "yAxis2");
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

      var yMax = d3.max(counts, (d) => d.count);
      yScale.domain([0, yMax + 1]).nice();

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

      var xDomain = counts.map((d) => d.key);
      xScale.domain(xDomain);

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
        .attr("y", (d) => yScale(d.count) + 0.5 * fontSize);

      enter
        .merge(text)
        .transition(t)
        .attr("x", (d) => xScale(d.key) - 20)
        .attr("y", (d) => yScale(d.count) + 0.5 * fontSize)
        .attr("font-size", `${fontSize}px`);

      svg
        .selectAll(".xAxis text")
        .attr("font-weight", "bold")
        .attr("font-size", "15px");
      svg
        .selectAll(".yAxis text")
        .attr("font-weight", "bold")
        .attr("font-size", "15px");
      svg
        .selectAll(".yAxis2 text")
        .attr("font-weight", "bold")
        .attr("font-size", "15px");
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