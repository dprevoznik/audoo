import React from "react";
import NewPage from "./newPage";

let Main = ({ user, page }) => {
  let displayed;
  if (page === "New") {
    displayed = <NewPage />;
  } else if (page === "Audoos") {
    displayed = <h1>Audoos</h1>;
  } else {
    displayed = <h1>Shared</h1>;
  }
  return displayed;
};

export default Main;
