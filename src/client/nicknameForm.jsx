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
  return (
    <div class="m-24">
      <h1 class="text-6xl uppercase">Choose A Nickname</h1>
      <input
        onChange={handleChange}
        value={choice}
        class="border-gray-800 border-solid border-4"
      ></input>
      <button
        onClick={handleSubmit}
        class="ml-6 border-gray-800 border-solid border-4"
      >
        <p class="m-2">Choose</p>
      </button>
    </div>
  );
};

export default NicknameForm;
