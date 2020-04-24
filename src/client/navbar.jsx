import React from "react";

let Navbar = (props) => {
  let { nickname, setPage } = props;
  return (
    <div class="bg-teal-300">
      {/* <div class="text-center">
        <h1 class="text-6xl">{`Welcome ${nickname}!`}</h1>
      </div> */}
      <div class="flex justify-center border-gray-800 border-b-8 border-t-8 border-solid">
        <button
          onClick={() => {
            setPage("New");
          }}
          class="text-4xl mx-20 bg-yellow-300 border-yellow-300 border-b-4 border-t-4 border-r-4 border-l-4 hover:bg-gray-400 focus:bg-gray-500 uppercase px-10"
        >
          New
        </button>
        <button
          onClick={() => {
            setPage("Audoos");
          }}
          class="text-4xl mx-20 bg-yellow-300 border-yellow-300 border-b-4 border-t-4 border-r-4 border-l-4 hover:bg-gray-400 focus:bg-gray-500 uppercase px-10"
        >
          Audoos
        </button>
        <button
          onClick={() => {
            setPage("Shared");
          }}
          class="text-4xl mx-20 bg-yellow-300 border-yellow-300 border-b-4 border-t-4 border-r-4 border-l-4 hover:bg-gray-400 focus:bg-gray-500 uppercase px-10"
        >
          Shared
        </button>
      </div>
    </div>
  );
};

export default Navbar;
