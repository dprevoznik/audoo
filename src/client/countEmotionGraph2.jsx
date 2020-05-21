import React, { useEffect, useState } from "react";
import * as d3 from "d3";

var CountEmotionsGraph2 = ({ data }) => {
  var [counts, setCounts] = useState([]);

  const width = 700;
  const height = 250;
  const margin = { top: 20, bottom: 25, left: 30, right: 30 };
  const fontSize = 30;
  const svg = d3.select("#graphCount2");
  svg.attr("transform", `translate(25, 25)`);
  var xScale = d3.scaleLinear().range([margin.left, width - margin.right])
  var yScale = d3
    .scalePoint()
    .range([margin.left, height - margin.bottom])
    .padding(0.5);
  var xAxis = d3.axisBottom().scale(xScale).ticks(3);
  if (svg.select(".xAxis").node() === null) {
    svg.append("g").attr("class", "xAxis");
  }

  useEffect(() => {
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
        let textA = a.key.toUpperCase();
        let textB = b.key.toUpperCase();
        return textA < textB ? 1 : -1;
      });
      setCounts(outputArray);
    } else {
      setCounts([]);
    }
  }, [data]);

  useEffect(() => {
    const t = d3.transition().duration(1000);

    let xMax = d3.max(counts, (d) => d.count);
    xScale.domain([0, xMax + 2])

    let yDomain = counts.map((d) => d.key);
    yScale.domain(yDomain);

    svg
      .select(".xAxis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .transition(t)
      .call(xAxis);

    let text = svg.selectAll(".graphData").data(counts, (d) => d.key);
    text.exit().transition(t).style("opacity", 0).remove();
    let enter = text
      .enter()
      .append("text")
      .attr("class", "graphData")
      .text((d) => {
        if (d.key === "smiley") return "😊";
        if (d.key === "neutral") return "😐";
        if (d.key === "frowning") return "☹️";
      })
      .attr("x", (d) => xScale(d.count) - fontSize * 0.6);

    enter
      .merge(text)
      .transition(t)
      .attr("x", (d) => xScale(d.count) - fontSize * 0.6)
      .attr("y", (d) => yScale(d.key))
      .attr("font-size", `${fontSize}px`);

    svg.selectAll(".xAxis text")
      .attr("font-weight", "bold")
      .attr("font-size", "18px");
    
  }, [counts]);

  return (
    <svg
      id="graphCount2"
      style={{ width: `${width}px`, height: `${height}px` }}
    ></svg>
  );
};

export default CountEmotionsGraph2;