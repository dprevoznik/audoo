import React, { useEffect, useState } from "react";
import ListEntry from "./listEntry.jsx";
import "../helpers/scroller.css";
import fetchAudoos from "../helpers/fetchAudoos.js";

function List({ page, user }) {
  var [audoos, setAudoos] = useState([]);
  var columnA = [];
  var columnB = [];

  useEffect(
    function retrieveData() {
      fetchAudoos(page, setAudoos, user);
    },
    [page, user]
  );

  audoos.forEach(function decideColumnPlacement(audoo, idx) {
    if (idx % 2 === 0) {
      columnA.push(
        <ListEntry
          audoo={audoo}
          page={page}
          setAudoos={setAudoos}
          user={user}
        />
      );
    } else {
      columnB.push(
        <ListEntry
          audoo={audoo}
          page={page}
          setAudoos={setAudoos}
          user={user}
        />
      );
    }
  });

  return (
    <div>
      <div className="flex flex-col items-center w-full text-gray-800">
        {audoos.length > 0
          ? columnA.map(function createRow(memory, idx) {
              return (
                <div key={idx} className="flex flex-row w-full justify-center">
                  {memory}
                  {columnB[idx] === undefined ? (
                    <div className="my-6 mx-10 w-1/4"></div>
                  ) : (
                    columnB[idx]
                  )}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default List;
