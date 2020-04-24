import React, { useEffect, useState } from "react";
import SharedEntry from "./sharedEntry.jsx";
import axios from "axios";
import "./scroller.css";

let SharedList = () => {
  // use state to get data
  let [shared, setShared] = useState([]);
  // use effect and fetch the data needed for this area
  useEffect(() => {
    let nickname = localStorage.getItem("id");
    axios
      .get(`/service/shared/${nickname}`)
      .then(({ data }) => setShared(data))
      .catch((err) => console.log("err fetching shared: ", err));
  }, []);
  // for each return a formatted memory
  return (
    <div class="scroller flex flex-col items-center overflow-y-scroll h-screen">
      {shared.length > 0
        ? shared.map((share) => {
            return <SharedEntry share={share} />;
          })
        : null}
    </div>
  );
};

export default SharedList;
