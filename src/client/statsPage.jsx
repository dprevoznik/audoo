import React, { useEffect, useState } from "react";
import fetchAudoos from "./fetchAudoos.js";
import CountEmotionsGraph from "./countEmotionGraph.jsx";
import CountEmotionsGraph2 from "./countEmotionGraph2.jsx";

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
    <div className="">
      <select onChange={updateSelected} className="">
        <option value="Audoos">Audoos</option>
        <option value="Shared">Shared</option>
        <option value="Feed">Feed</option>
      </select>
      <div className="flex flex-row">
        <CountEmotionsGraph data={data} />
        <CountEmotionsGraph2 data={data} />
      </div>
    </div>
  );
};

export default StatsPage;
