import React, { useEffect, useState } from "react";
import ListEntry from "./listEntry.jsx";
import "../helpers/scroller.css";
import fetchAudoos from "../helpers/fetchAudoos.js";

let List = ({ page, user }) => {
  let [audoos, setAudoos] = useState([]);

  useEffect(() => {
    fetchAudoos(page, setAudoos, user);
  }, [page, user]);

  let columnA = [];
  let columnB = [];

  audoos.forEach((audoo, idx) => {
    if (idx % 2 === 0) {
      columnA.push(
        <ListEntry audoo={audoo} page={page} setAudoos={setAudoos} user={user}/>
      );
    } else {
      columnB.push(
        <ListEntry audoo={audoo} page={page} setAudoos={setAudoos} user={user}/>
      );
    }
  });

  return (
    <div>
      <div className="flex flex-col items-center w-full">
        {audoos.length > 0
          ? columnA.map((memory, idx) => {
              return (
                <div key={idx} className="flex flex-row w-3/4">
                  {memory}
                  {columnB[idx] === undefined ? <div className="my-6 mx-10 w-1/2"></div> : columnB[idx]}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default List;
