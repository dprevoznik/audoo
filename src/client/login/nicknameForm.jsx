import React, { useState } from "react";
import Axios from "axios";

function NicknameForm(props) {
  var { setNickname } = props;
  var [choice, setChoice] = useState("");

  function handleChange(e) {
    setChoice(e.target.value);
  };

  function handleSubmit(e) {
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

  function handleDemoSubmit(e) {
    e.preventDefault();
    setNickname("Dan222");
  };

  return (
    <div className="flex flex-col text-center items-center bg-gray-500 h-screen pt-12">
      {["A", "U", "D", "O", "O"].map(function displayLogoLetter(letter, idx) {
        return (
          <span key={idx} className="text-6xl text-gray-800 uppercase hover:text-orange-600 transform transition duration-500 hover:scale-110">
            {letter}
          </span>
        );
      })}
      <div className="flex flex-col relative mb-8 mt-4">
        <input
          onChange={handleChange}
          value={choice}
          placeholder="Choose A Nickname"
          className="border-gray-800 border-solid border-2 rounded w-64 mt-2 focus:outline-none text-center"
        ></input>
        {choice.length >= 6 ? (
          <button
            onClick={handleSubmit}
            className="border-gray-800 border-solid border-2 w-64 border-t-1 bg-blue-600 hover:font-bold uppercase absolute transform translate-y-8 rounded-b"
          >
            <p className="m-2">Choose</p>
          </button>
        ) : null}
      </div>
      <button
        onClick={handleDemoSubmit}
        className="border-gray-800 bg-gray-800 border-solid border-4 rounded w-24 mt-6 transition duration-700 transform hover:font-bold hover:scale-125 text-white"
      >
        <p className="m-1 uppercase">Demo</p>
      </button>
    </div>
  );
};

export default NicknameForm;