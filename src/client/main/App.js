import React, { useState } from "react";
import NicknameForm from "../login/nicknameForm";
import Navbar from "./navbar";
import Main from "./main";

function App() {
  var localName = localStorage.getItem("id");
  var [nickname, setNickname] = useState(localName);
  var [page, setPage] = useState("New");
  
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