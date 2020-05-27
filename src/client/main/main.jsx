import React from "react";
import NewPage from "../new/newPage";
import List from "../list/list";
import StatsPage from "../stats/statsPage";

let Main = ({ user, page, setPage }) => {
  let displayed;
  if (page === "New") {
    displayed = <NewPage setPage={setPage} user={user} />;
  } else if (page === "Stats") {
    displayed = <StatsPage page={page} user={user}/>;
  } else {
    displayed = <List page={page} user={user}/>;
  }  
  return <div className="overflow-y-scroll h-screen w-full">{displayed}</div>;
};

export default Main;
