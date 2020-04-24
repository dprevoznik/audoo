import React, { useEffect, useState } from "react";
import MemoryEntry from "./memoryEntry.jsx";
import axios from "axios";
import "./scroller.css";

let MemoriesList = () => {
  // use state to get data
  let [audoos, setAudoos] = useState([]);
  // use effect and fetch the data needed for this area
  useEffect(() => {
    let nickname = localStorage.getItem("id");
    axios
      .get(`/service/audoos/${nickname}`)
      .then(({ data }) => setAudoos(data))
      .catch((err) => console.log("err fetching audoos: ", err));
  }, []);
  // for each return a formatted memory
  return (
    <div>
      <div class="scroller flex flex-col items-center overflow-y-scroll h-screen">
        {audoos.length > 0
          ? audoos.map((audoo) => {
              return <MemoryEntry audoo={audoo} />;
            })
          : null}
      </div>
    </div>
  );
};

export default MemoriesList;
