import React from "react";

let Navbar = (props) => {
  let { nickname, setPage } = props;
  return (
    <div>
      <div class="text-center">
        <h1 class="text-6xl">{`Welcome ${nickname}!`}</h1>
      </div>
      <div class="flex justify-center">
        <button
          onClick={() => {
            setPage("New");
          }}
          class="text-6xl mx-20 border-yellow-600 border-b-4 hover:bg-gray-200 uppercase px-10"
        >
          New
        </button>
        <button
          onClick={() => {
            setPage("Audoos");
          }}
          class="text-6xl mx-20 border-yellow-600 border-b-4 hover:bg-gray-200 uppercase px-10"
        >
          Audoos
        </button>
        <button
          onClick={() => {
            setPage("Shared");
          }}
          class="text-6xl mx-20 border-yellow-600 border-b-4 hover:bg-gray-200 uppercase px-10"
        >
          Shared
        </button>
      </div>
    </div>
  );
};

export default Navbar;
