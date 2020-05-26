import React, { useEffect, useState } from "react";
import fetchAudoos from "./fetchAudoos.js";
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
      <div class="relative">
        <button
          onClick={function toggleDropDown() {
            setDropdown(!dropdown);
          }}
          class="block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-gray-500"
        >
          <i class="fas fa-database"></i>
        </button>
        {dropdown === true ? (
          <div class="absolute z-10 flex flex-col bg-gray-500 w-48 rounded-lg py-2 mt-1 border-gray-600 border-2 shadow-xl">
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

/*
<select onChange={updateSelected} className="w-1/3 focus:outline-none">
        {["Audoos", "Shared", "Feed"].map(function createDataOptions(item, idx) {
          return <option key={idx} value={item} className="text-center">{item}</option>
        })}
      </select>

*/
