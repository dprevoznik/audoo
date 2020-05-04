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

  let columnA = [];
  let columnB = [];

  audoos.forEach((audoo, idx) => {
    if (idx % 2 === 0) {
      columnA.push(
        <ListEntry audoo={audoo} page={page} setAudoos={setAudoos} />
      );
    } else {
      columnB.push(
        <ListEntry audoo={audoo} page={page} setAudoos={setAudoos} />
      );
    }
  });

  return (
    <div>
      <div class="scroller flex flex-col items-center overflow-y-scroll h-screen w-screen">
        {audoos.length > 0
          ? columnA.map((memory, idx) => {
              return (
                <div class="flex flex-row w-screen">
                  {memory}
                  {columnB[idx] === undefined ? null : columnB[idx]}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default List;
