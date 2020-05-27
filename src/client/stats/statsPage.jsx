import React, { useEffect, useState } from "react";
import fetchAudoos from "../helpers/fetchAudoos.js";
import CountEmotionsGraph from "./countEmotionGraph.jsx";
import EmotionTimeGraph from "./emotionTimeGraph.jsx";

var StatsPage = ({ user }) => {
  var [data, setData] = useState([]);
  var [selected, setSelected] = useState("Audoos");
  var [dropdown, setDropdown] = useState(false);

  const updateSelected = (item) => {
    setSelected(item);
  };

  useEffect(() => {
    fetchAudoos(selected, setData, user);
  }, [selected, user]);

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="relative">
        <button
          onClick={function toggleDropDown() {
            setDropdown(!dropdown);
          }}
          className="block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 hover:bg-gray-600 focus:outline-none focus:border-gray-700 transform hover:scale-110"
        >
          <i className="fas fa-database"></i>
        </button>
        {dropdown === true ? (
          <div className="absolute w-48 mt-1 py-2 z-10 flex flex-col transform -translate-x-20 bg-gray-500 border-gray-600 border-2 shadow-xl rounded-lg">
            {["Audoos", "Shared", "Feed"].map(function createDataOptions(
              item,
              idx
            ) {
              return (
                <p
                  className="text-gray-800 px-4 py-1 hover:bg-white hover:font-semibold"
                  onClick={function updateDataOption() {
                    updateSelected(item);
                    setDropdown(!dropdown);
                  }}
                  value={item}
                  key={idx}
                >
                  {item}
                </p>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="mb-16">
        <CountEmotionsGraph data={data} />
      </div>
      <div className="">
        <EmotionTimeGraph data={data} />
      </div>
    </div>
  );
};

export default StatsPage;
