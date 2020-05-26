import React, { useEffect, useState } from "react";
import fetchAudoos from "./fetchAudoos.js";
import CountEmotionsGraph from "./countEmotionGraph.jsx";
import EmotionTimeGraph from "./emotionTimeGraph.jsx";

var StatsPage = ({ user }) => {
  var [data, setData] = useState([]);
  var [selected, setSelected] = useState("Audoos");

  const updateSelected = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    fetchAudoos(selected, setData, user);
  }, [selected, user]);

  return (
    <div className="flex flex-col items-center">
      <select onChange={updateSelected} className="w-full">
        <option value="Audoos">Audoos</option>
        <option value="Shared">Shared</option>
        <option value="Feed">Feed</option>
      </select>
      <div className="mb-16">
        <CountEmotionsGraph data={data} />
      </div>
      <div className="">
        <EmotionTimeGraph data={data}/>
      </div>
    </div>
  );
};

export default StatsPage;
