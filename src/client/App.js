import React, { useState, useEffect } from "react";
import axios from "axios";
import NicknameForm from "./nicknameForm";

function App() {
  let [nickname, setNickname] = useState(localStorage.getItem("id"));
  let [searchTerm, setSearchTerm] = useState();
  return (
    <div>
      {nickname === null ? (
        <NicknameForm setNickname={setNickname}/>
      ) : (
        <div>
          <h1 class="text-6xl">{`Welcome Back ${nickname}!`}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
