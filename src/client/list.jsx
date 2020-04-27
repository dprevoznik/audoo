import React, { useEffect, useState } from "react";
import ListEntry from "./listEntry.jsx";
import axios from "axios";
import "./scroller.css";
import fetchAudoos from "./fetchAudoos.js";

let List = ({ page }) => {
  // use state to get data
  let [audoos, setAudoos] = useState([]);
  // use effect and fetch the data needed for this area
  useEffect(() => {
    fetchAudoos(page, setAudoos);
  }, [page]);

  return (
    <div>
      <div class="scroller flex flex-col items-center overflow-y-scroll h-screen">
        {audoos.length > 0
          ? audoos.map((audoo) => {
              return (
                <ListEntry audoo={audoo} page={page} setAudoos={setAudoos} />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default List;
