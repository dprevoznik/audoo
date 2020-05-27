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
    <div class="flex flex-col text-center items-center bg-gray-500 h-screen pt-16">
      <div class="flex flex-col relative mb-4">
        <input
          onChange={handleChange}
          value={choice}
          placeholder="Choose A Nickname"
          class="border-gray-800 border-solid border-2 rounded w-64 mt-2 focus:outline-none text-center"
        ></input>
        {choice.length >= 6 ? (
          <button
            onClick={handleSubmit}
            class="border-gray-800 border-solid border-2 w-64 border-t-1 bg-blue-600 hover:font-bold uppercase absolute transform translate-y-8 rounded-b"
          >
            <p class="m-2">Choose</p>
          </button>
        ) : null}
      </div>
      {["A", "U", "D", "O", "O"].map(function displayLogo(letter, idx) {
        return (
          <span key={idx} class="text-6xl uppercase hover:text-orange-600">
            {letter}
          </span>
        );
      })}
      <button
        onClick={handleDemoSubmit}
        class="border-gray-800 bg-gray-800 border-solid border-4 rounded w-24 mt-4 transform hover:font-bold hover:scale-125 text-white"
      >
        <p class="m-1 uppercase">Demo</p>
      </button>
    </div>
  );
};

export default NicknameForm;
