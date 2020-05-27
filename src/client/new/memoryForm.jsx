import React, { useState } from "react";
import axios from "axios";
import allEmoji from "../helpers/allEmoji";

let MemoryForm = ({ chosen, setPage }) => {
  let [memory, setMemory] = useState("");
  let [date, setDate] = useState("");
  let [involved, setInvolved] = useState("");
  let [feeling, setFeeling] = useState(null);

  let handleSubmit = () => {
    // get memory, date, and involved, and any chosen data you need
    let localUser = localStorage.getItem("id");
    let userName = localUser === null ? "Dan222" : localUser;
    let sharedWithUsers = involved !== "" ? involved.split(",") : "";
    let url = chosen.id.videoId;
    let sharedBy = userName;
    let shared = sharedWithUsers === "" ? false : true;
    let emoji = feeling === null ? "neutral" : feeling;
    let truthy = false;
    let created = new Date();
    // make axios request to post that data into Audoos collection
    axios
      .post("/service/memory", {
        sharedWithUsers,
        userName,
        memory,
        url,
        date,
        sharedBy,
        shared,
        emoji,
        public: truthy,
        created,
      })
      .then(() => setPage("Audoos"))
      .catch((err) => console.log("err posting audoo: ", err));
  };

  return (
    <div className="text-left w-1/2 shadow-2xl pr-4 pl-4 pb-4 rounded-b border-solid border-gray-600 border-2 mt-2">
      <h1 className="uppercase font-bold text-lg mt-2 italic">
        {chosen.snippet.title.length > 40 ? chosen.snippet.title.slice(0, 40) + "..." : chosen.snippet.title}
      </h1>
      <div className="flex flex-row">
        <div className="flex flex-col w-2/5 text-lg text-left">
          <img
            className="rounded-lg mt-4"
            src={chosen.snippet.thumbnails.high.url}
            alt=""
          ></img>
        </div>
        <div className="flex flex-col w-3/5 m-2 ml-6">
          <div className="flex flex-col w-full mb-2">
            <h1 className="font-bold font-serif">Memory:</h1>
            <input
              onChange={(e) => {
                setMemory(e.target.value);
              }}
              value={memory}
              className="border-2 border-solid rounded-lg border-gray-600 text-m font-serif outline-none pl-2"
            ></input>
          </div>
          <div className="flex flex-col w-full mb-2">
            <span className="font-bold font-serif">Date:</span>
            <input
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              type="date"
              className="border-2 border-solid rounded-lg border-gray-600 text-m font-serif outline-none pl-2"
            ></input>
          </div>
          <div className="flex flex-col w-full mb-2">
            <span className="font-bold font-serif">Friends Involved:</span>
            <input
              value={involved}
              onChange={(e) => {
                setInvolved(e.target.value);
              }}
              className="border-2 border-solid rounded-lg border-gray-600 text-m font-serif outline-none pl-2"
              placeholder="Greg333,Case13,Dan222"
            ></input>
          </div>
          <div className="flex flex-col w-full mb-2">
            <span className="font-bold font-serif">Feeling Experienced:</span>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row text-center">
                {allEmoji.map((emoji, idx) => {
                  return (
                    <div key={idx} className="mx-1">
                      <input
                        className="transform hover:scale-125 text-white mx-1"
                        onClick={() => {
                          setFeeling(emoji[0]);
                        }}
                        type="radio"
                        id={emoji[0]}
                        value={emoji[0]}
                        name="feeling"
                      />
                      <label htmlFor={emoji[0]}>{emoji[1]}</label>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handleSubmit}
                type="button"
                className="border-2 px-2 border-solid rounded-lg border-gray-600 h-8 text-center hover:bg-gray-600 font-bold font-serif focus:outline-none focus:border-gray-700 hover:text-white transform hover:scale-110"
              >
                Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryForm;
