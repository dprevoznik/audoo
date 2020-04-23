import React, { useState } from "react";
import axios from "axios";

let MemoryForm = ({ chosen }) => {
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
      .then((results) => {
        console.log("results of posting audoo: ", results);
        // ??????????????????????
        // move the user to the Audoos tab (so may need to pass down the setPage function)
        // ??????????????????????
      })
      .catch((err) => console.log("err posting audoo: ", err));
  };

  return (
    <div class="bg-orange-300 w-1/2 items-center">
      <div class="shadow-xl">
        <h1 class="text-xl">{chosen.snippet.title}</h1>
        <img src={chosen.snippet.thumbnails.medium.url} alt="video thumbnail" />
      </div>
      <div class="shadow-xl">
        <span class="text-xl mr-2">Memory:</span>
        <input
          onChange={(e) => {
            setMemory(e.target.value);
          }}
          value={memory}
          class="bg-orange-200 border-4 border-solid rounded-lg border-gray-600 w-1/2 h-16 text-xl text-center"
        ></input>
      </div>
      <div class="shadow-xl">
        <span class="text-xl mr-2">Date:</span>
        <input
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          type="date"
          class="bg-orange-200 border-4 border-solid rounded-lg border-gray-600 w-1/2 h-16 text-xl text-center"
        ></input>
      </div>
      <div class="shadow-xl">
        <span class="text-xl mr-2">Friends Involved:</span>
        <input
          value={involved}
          onChange={(e) => {
            setInvolved(e.target.value);
          }}
          class="bg-orange-200 border-4 border-solid rounded-lg border-gray-600 w-1/2 h-16 text-xl text-center"
        ></input>
      </div>
      <div class="shadow-xl">
        <button
          onClick={handleSubmit}
          type="button"
          class="border-4 border-solid rounded-lg border-gray-600 h-16 text-xl text-center"
        >
          Record
        </button>
      </div>
    </div>
  );
};

export default MemoryForm;
