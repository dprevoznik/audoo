import React, { useState } from "react";
import NicknameForm from "./nicknameForm";
import Navbar from "./navbar";
import Main from "./main";

function App() {
  let [nickname, setNickname] = useState(localStorage.getItem("id"));
  let [page, setPage] = useState("New");
  return (
    <div>
      {nickname === null ? (
        <NicknameForm setNickname={setNickname} />
      ) : (
        <>
          <Navbar page={page} nickname={nickname} setPage={setPage} />
          <Main user={nickname} page={page} setPage={setPage}/>
        </>
      )}
    </div>
  );
}

export default App;
