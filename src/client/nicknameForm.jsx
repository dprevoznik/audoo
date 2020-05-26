import React, { useState } from "react";
import Axios from "axios";
let NicknameForm = (props) => {
  let { setNickname } = props;
  let [choice, setChoice] = useState("");

  let handleChange = (e) => {
    setChoice(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    // make sure username is over 6 letters && not equal to "name is taken"
    if (choice.length > 5 && choice !== "Name Taken") {
      // try querying the database to check if the username is taken
      Axios.post("/service/username", { attempt: choice })
        .then(({ data }) => {
          // if it isn't
          if (!data) {
            setNickname(choice);
            localStorage.setItem("id", choice);
          } else {
            setChoice("Name Taken");
          }
        })
        .catch((err) => console.log("err: ", err));
    }
  };
  let handleDemoSubmit = (e) => {
    e.preventDefault();
    setNickname("Dan222");
  };
  return (
    <div class="m-24">
      <h1 class="text-6xl uppercase">Choose A Nickname</h1>
      <div class="w-1/6 flex flex-col">
        <input
          onChange={handleChange}
          value={choice}
          class="border-gray-800 border-solid border-4 focus:outline-none text-center"
        ></input>
        {choice.length >= 6 ? 
        <button
          onClick={handleSubmit}
          class="border-gray-800 border-solid border-4 mb-2 border-t-0 bg-blue-600 hover:font-bold uppercase"
        >
          <p class="m-2">Choose</p>
        </button>
        : 
        null}
        <button
          onClick={handleDemoSubmit}
          class="border-gray-800 border-solid border-4 mt-16 w-32 hover:font-bold"
        >
          <p class="m-1 uppercase">Demo</p>
        </button>
      </div>
    </div>
  );
};

export default NicknameForm;
