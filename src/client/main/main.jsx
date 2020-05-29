import React from "react";
import NewPage from "../new/newPage";
import List from "../list/list";
import StatsPage from "../stats/statsPage";

function Main({ user, page, setPage }) {
  if (page === "New") {
    var displayed = <NewPage setPage={setPage} user={user} />;
  } else if (page === "Stats") {
    var displayed = <StatsPage page={page} user={user} />;
  } else {
    var displayed = <List page={page} user={user} />;
  }
  return <div className="overflow-y-scroll h-screen w-full">{displayed}</div>;
}

export default Main;