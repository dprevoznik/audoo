import React, { useState } from "react";
import axios from "axios";

let MemoryForm = ({ chosen, setPage }) => {
  let [memory, setMemory] = useState("");
  let [date, setDate] = useState("");
  let [involved, setInvolved] = useState("");

  let handleSubmit = () => {
    // get memory, date, and involved, and any chosen data you need
    let userName = localStorage.getItem("id");
    let sharedWithUsers = involved !== "" ? involved.split(",") : "";
    let url = chosen.id.videoId;
    let sharedBy = userName;
    let shared = sharedWithUsers === "" ? false : true;
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
      })
      .then(() => setPage("Audoos"))
      .catch((err) => console.log("err posting audoo: ", err));
  };

  return (
    <div class="flex flex-row bg-teal-300 text-left w-1/2 shadow-2xl mr-4 ml-4 mb-4">
      <div class="flex flex-col w-2/5 text-xl">
        <h1>{chosen.snippet.title}</h1>
        <iframe
          class=""
          style={{ position: "relative", height: "100%", width: "100%" }}
          title={chosen.videoId}
          src={`https://www.youtube.com/embed/${chosen.videoId}`}
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div class="flex flex-col w-3/5 m-2">
        <div class="flex flex-col w-full">
          <h1 class="">Memory:</h1>
          <input
            onChange={(e) => {
              setMemory(e.target.value);
            }}
            value={memory}
            class="bg-orange-200 border-4 border-solid rounded-lg border-gray-600 text-xl"
          ></input>
        </div>
        <div class="flex flex-col w-full">
          <span class="text-xl mr-2">Date:</span>
          <input
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            type="date"
            class="bg-orange-200 border-4 border-solid rounded-lg border-gray-600 text-xl"
          ></input>
        </div>
        <div class="flex flex-col w-full">
          <span class="text-xl mr-2">Friends Involved:</span>
          <input
            value={involved}
            onChange={(e) => {
              setInvolved(e.target.value);
            }}
            class="bg-orange-200 border-4 border-solid rounded-lg border-gray-600 text-xl"
          ></input>
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          class="border-4 mt-4 border-solid rounded-lg border-gray-600 h-8 text-center"
        >
          Record
        </button>
      </div>
    </div>
  );
};

export default MemoryForm;
