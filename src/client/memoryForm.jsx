import React, { useState } from "react";
import axios from "axios";
import allEmoji from "./allEmoji";

let MemoryForm = ({ chosen, setPage }) => {
  let [memory, setMemory] = useState("");
  let [date, setDate] = useState("");
  let [involved, setInvolved] = useState("");
  let [feeling, setFeeling] = useState(null);

  let handleSubmit = () => {
    // get memory, date, and involved, and any chosen data you need
    let userName = localStorage.getItem("id");
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
        created
      })
      .then(() => setPage("Audoos"))
      .catch((err) => console.log("err posting audoo: ", err));
  };

  return (
    <div class="flex flex-row text-left w-1/2 shadow-2xl pr-4 pl-4 pb-4 rounded-b border-solid border-gray-600 border-2 mt-2">
      <div class="flex flex-col w-2/5 text-lg text-left">
        <img
          class="rounded-lg mt-4"
          src={chosen.snippet.thumbnails.high.url}
          alt=""
        ></img>
        <h1 class="uppercase font-bold">{chosen.snippet.title}</h1>
      </div>
      <div class="flex flex-col w-3/5 m-2 ml-6">
        <div class="flex flex-col w-full mb-2">
          <h1 class="font-bold font-serif">Memory:</h1>
          <input
            onChange={(e) => {
              setMemory(e.target.value);
            }}
            value={memory}
            class="border-2 border-solid rounded-lg border-gray-600 text-m font-serif outline-none pl-2"
          ></input>
        </div>
        <div class="flex flex-col w-full mb-2">
          <span class="font-bold font-serif">Date:</span>
          <input
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            type="date"
            class="border-2 border-solid rounded-lg border-gray-600 text-m font-serif outline-none pl-2"
          ></input>
        </div>
        <div class="flex flex-col w-full mb-2">
          <span class="font-bold font-serif">Friends Involved:</span>
          <input
            value={involved}
            onChange={(e) => {
              setInvolved(e.target.value);
            }}
            class="border-2 border-solid rounded-lg border-gray-600 text-m font-serif outline-none pl-2"
            placeholder="Greg333,Case13,Dan222"
          ></input>
        </div>
        <div class="flex flex-col w-full mb-2">
          <span class="font-bold font-serif">Feeling Experienced:</span>
          <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row text-center">
              {allEmoji.map((emoji) => {
                return (
                  <div class="mx-1">
                    <input
                      class="transform hover:scale-125 text-white"
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
              class="border-2 px-2 border-solid rounded-lg border-gray-600 h-8 text-center hover:bg-gray-600 hover:opacity-50 font-bold font-serif focus:outline-none"
            >
              Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryForm;
