import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import fetchAudoos from "./fetchAudoos.js";

let StatsPage = ({ page }) => {
  let [data, setData] = useState([]);
  let [counts, setCounts] = useState([]);

  const width = 250;
  const height = 250;

  useEffect(() => {
    fetchAudoos("Audoos", setData);
  }, []);

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
      setCounts(outputArray);
    }
  }, [data]);

  useEffect(() => {
    const svg = d3.select("svg");
    svg.attr("transform", "translate(25,25)");
    let xDomain = counts.map((d) => d.key);
    let xScale = d3.scaleBand().domain(xDomain).rangeRound([0, width], 10, 10).paddingInner(0).paddingOuter(.5).align(.5)
    let yMax = d3.max(counts, (d) => d.count);
    let yScale = d3.scaleLinear().domain([0, yMax + 1]).range([height, 0]);
    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let circles = svg
      .selectAll("circle")
      .data(counts, (d) => d.key)

    circles.exit().remove();
    let enter = circles
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.key))
      .attr("cy", (d) => yScale(d.count))
      .attr('r', 10)
      .style('opacity', .5);

    enter
      .merge(circles)
      .attr("fill", (d) => colorScale(d.key))
      .transition().duration(1000)
      .attr("cx", (d) => xScale(d.key))
      .attr("cy", (d) => yScale(d.count));
  }, [counts]);

  return (
    <div>
      <svg style={{ width: `${width}px`, height: `${height}px`, 'border': '10px solid black'}}></svg>
    </div>
  );
};

export default StatsPage;
