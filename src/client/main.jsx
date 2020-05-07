import React from "react";
import NewPage from "./newPage";
import List from "./list";
import StatsPage from "./statsPage";

let Main = ({ user, page, setPage }) => {
  let displayed;
  if (page === "New") {
    displayed = <NewPage setPage={setPage} user={user} />;
  } else if (page === "Audoos") {
    displayed = <List page={page} />;
  } else if (page === "Shared") {
    displayed = <List page={page} />;
  } else if (page === "Feed") {
    displayed = <List page={page} />;
  } else if (page === "Stats") {
    displayed = <StatsPage page={page} />;
  }
  return <div class="overflow-y-scroll h-screen w-full">{displayed}</div>;
};

export default Main;
