import React from "react";
import NewPage from "./newPage";
import MemoriesList from "./memoriesList.jsx";
import SharedList from "./sharedList.jsx";

let Main = ({ user, page, setPage }) => {
  let displayed;
  if (page === "New") {
    displayed = <NewPage setPage={setPage} />;
  } else if (page === "Audoos") {
    displayed = <MemoriesList />;
  } else {
    displayed = <SharedList />;
  }
  return displayed;
};

export default Main;
