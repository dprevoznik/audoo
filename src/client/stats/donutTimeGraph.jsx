import React, { useEffect, useState } from "react";
import * as d3 from "d3";

function DonutTimeGraph({ data }) {
  var [counts, setCounts] = useState([]);
  var [translateCount, setTranslateCount] = useState(0);
  var [hovered, setHovered] = useState("");

  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2 - 40;
  const durationTime = 1000;

  var color = d3
    .scaleOrdinal()
    .domain(["Morning", "Noon", "Evening", "Night"])
    .range(["#feb2b2", "#fbd38d", "#38a169", "#718096"]);

  var labelArc = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius((2 * radius) / 3);

  useEffect(
    function updateTimeCounts() {
      if (counts.length > 0) {
        if (translateCount === 0) {
          var svg = d3
            .select("#graphDonut")
            .append("g")
            .attr(
              "transform",
              "translate(" + width / 2 + "," + height / 2 + ")"
            );
          setTranslateCount(1);
        } else {
          var svg = d3.select("#graphDonut g");
        }

        if (d3.select("#graphDonut").select(".title").node() === null) {
          let titleFontSize = 24;
          let graph = d3.select("#graphDonut");
          graph
            .append('line')
            .attr('x1', 38)
            .attr('x2', 145)
            .attr('y1', 30)
            .attr('y2', 30)
            .attr('stroke-width', 2)
            .attr('stroke', '#718096')
          graph
            .append("text")
            .attr("class", "title")
            .attr("x", 40)
            .attr("y", 20)    
            .attr('fill', '#718096')  
            .style('font-size', `${titleFontSize}px`)
            .style('font-family', 'bold')
      
            .text("By Time");
        }

        var pie = d3
          .pie()
          .value((d) => d.percentage)
          .sort(function (a, b) {
            console.log(a);
            return d3.ascending(a.key, b.key);
          });

        var pieData = pie(counts);

        var path = svg.selectAll("path").data(pieData);

        path.exit().transition().duration(durationTime).remove();

        path
          .enter()
          .append("path")
          .on("mouseenter", (e) => setHovered(e.data.key))
          .on("mouseleave", (e) => setHovered(""))
          .merge(path)
          .style("opacity", 0.8)
          .attr("stroke", "white")
          .attr("fill", function (d) {
            return color(d.data.key);
          })
          .transition()
          .duration(durationTime)
          .attr("d", d3.arc().innerRadius(70).outerRadius(radius))
          .style("stroke-width", "12px");

        var text = svg.selectAll("text").data(pie(counts));

        text
          .exit()
          .transition()
          .duration(durationTime * 2)
          .style("opacity", 0.0)
          .remove();

        text
          .enter()
          .append("text")
          .on("mouseenter", (e) => setHovered(e.data.key))
          .on("mouseleave", (e) => setHovered(""))
          .merge(text)
          .style("opacity", 0.0)
          .text(function (d) {
            return d.data.percentage + "%";
          })
          .attr("text-anchor", "middle")
          .attr("dy", "0.5em")
          .attr("transform", function (d) {
            return "translate(" + labelArc.centroid(d) + ")";
          })
          .attr('fill', "#2d3748")
          .transition()
          .duration(durationTime * 2)
          .attr('font-weight', 700)
          .style("opacity", 1.0);
      }
    },
    [counts]
  );

  useEffect(
    function aggregateTimeFrequency() {
      let times = { Morning: 0, Noon: 0, Evening: 0, Night: 0 };
      if (data.length > 0) {
        for (let memory of data) {
          let dateObj = new Date(memory.created);
          let hourCreated = dateObj.getHours();
          if (hourCreated >= 22 && hourCreated < 4) {
            times.Night += 1;
          } else if (hourCreated >= 4 && hourCreated < 10) {
            times.Morning += 1;
          } else if ((hourCreated >= 10) & (hourCreated < 16)) {
            times.Noon += 1;
          } else if (hourCreated >= 16 && hourCreated < 22) {
            times.Evening += 1;
          }
        }
        let output = [];
        let total = 0;
        for (let period in times) {
          total += times[period];
          if (times[period] !== 0) {
            output.push({ key: period, value: times[period] });
          }
        }
        let finalOutput = output.map(function addPercentage(entry) {
          entry.percentage = Math.round((entry.value / total) * 100);
          return entry;
        });
        setCounts(finalOutput);
      }
    },
    [data]
  );

  return (
    <div className="relative">
      {hovered.length > 0 ? (
        <button
          style={{
            transform: `translate(${width / 2 - 48}px,${height / 2 - 22}px)`,
          }}
          className="absolute h-12 w-24 border-2 border-gray-800 bg-gray-300 text-lg text-gray-800 uppercase font-semibold"
          disabled
        >
          {hovered}
        </button>
      ) : null}
      <svg
        id="graphDonut"
        style={{ width: `${width}px`, height: `${height}px` }}
      ></svg>
    </div>
  );
}

export default DonutTimeGraph;
