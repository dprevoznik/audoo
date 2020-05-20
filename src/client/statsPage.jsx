import React, { useEffect, useState } from "react";
import fetchAudoos from "./fetchAudoos.js";
import CountEmotionsGraph from "./countEmotionGraph.jsx"

var StatsPage = ({ page }) => {
  var [data, setData] = useState([]);
  var [selected, setSelected] = useState("Audoos");

  const updateSelected = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    fetchAudoos(selected, setData);
  }, [selected]);

  return (
    <div className="flex-col">
      <select onChange={updateSelected} className="">
        <option value="Audoos">Audoos</option>
        <option value="Shared">Shared</option>
        <option value="Feed">Feed</option>
      </select>
      <CountEmotionsGraph data={data} />
    </div>
  );
};

export default StatsPage;
