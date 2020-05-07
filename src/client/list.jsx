import React, { useEffect, useState } from "react";
import ListEntry from "./listEntry.jsx";
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
      <div class="flex flex-col items-center w-full">
        {audoos.length > 0
          ? columnA.map((memory, idx) => {
              return (
                <div class="flex flex-row w-3/4">
                  {memory}
                  {columnB[idx] === undefined ? <div class="my-6 mx-10 w-1/2"></div> : columnB[idx]}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default List;
