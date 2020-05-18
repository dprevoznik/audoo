import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import fetchAudoos from "./fetchAudoos.js";

var StatsPage = ({ page }) => {
  var [data, setData] = useState([]);
  var [counts, setCounts] = useState([]);
  var [selected, setSelected] = useState("Audoos");

  const width = 250;
  const height = 250;
  const margin = { top: 20, bottom: 20, left: 20, right: 30 };
  const svg = d3.select("svg");
  svg.attr("transform", `translate(25, 25)`);
  var xScale = d3
    .scaleBand()
    .rangeRound([margin.left, width - margin.right], 10, 10)
    .paddingInner(0)
    .paddingOuter(0.5)
    .align(0.5);
  var yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
  var yAxis = d3.axisRight().scale(yScale).ticks(3);
  var xAxis = d3.axisBottom().scale(xScale);
  if (svg.select(".yAxis").node() === null) {
    svg.append("g").attr("class", "xAxis");
    svg.append("g").attr("class", "yAxis");
  }
  const updateSelected = (e) => {
    setSelected(e.target.value);
  };
  useEffect(() => {
    fetchAudoos(selected, setData);
  }, [selected]);

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

  useEffect(() => {}, []);

  useEffect(() => {
    const t = d3.transition().duration(1000);

    let yMax = d3.max(counts, (d) => d.count);
    yScale.domain([0, yMax + 1]).nice();

    svg
      .select(".yAxis")
      .attr("transform", `translate(${width - margin.right}, 0)`)
      .transition(t)
      .call(yAxis);

    let xDomain = counts.map((d) => d.key);
    xScale.domain(xDomain);

    let colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    let circles = svg.selectAll("circle").data(counts, (d) => d.key);

    circles.exit().transition(t).attr("r", 0).remove();
    let enter = circles
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.key))
      .attr("cy", (d) => yScale(d.count))
      .style("opacity", 0.5);

    enter
      .merge(circles)
      .attr("fill", (d) => colorScale(d.key))
      .transition(t)
      .attr("r", 10)
      .attr("cx", (d) => xScale(d.key))
      .attr("cy", (d) => yScale(d.count));
  }, [counts]);

  return (
    <div>
      <select onChange={updateSelected}>
        <option value="Audoos">Audoos</option>
        <option value="Shared">Shared</option>
        <option value="Feed">Feed</option>
      </select>
      <svg style={{ width: `${width}px`, height: `${height}px` }}></svg>
    </div>
  );
};

export default StatsPage;
