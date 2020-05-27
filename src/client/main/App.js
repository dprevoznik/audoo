import React, { useState } from "react";
import NicknameForm from "../login/nicknameForm";
import Navbar from "./navbar";
import Main from "./main";

function App() {
  let localName = localStorage.getItem("id");
  let [nickname, setNickname] = useState(localName);
  let [page, setPage] = useState("New");
  return (
    <div>
      {nickname === null ? (
        <NicknameForm setNickname={setNickname} />
      ) : (
        <div className="flex flex-row">
          <Navbar page={page} setPage={setPage} />
          <Main user={nickname} page={page} setPage={setPage}/>
        </div>
      )}
    </div>
  );
}

export default App;
