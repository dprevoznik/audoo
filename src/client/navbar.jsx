import React from "react";

let Navbar = (props) => {
  let { page, setPage } = props;
  return (
    <div class="border-gray-600 border-solid border-b-2 mx-32">
      <div class="flex justify-center">
        <button
          onClick={() => {
            setPage("New");
          }}
          class={`focus:outline-none text-5xl hover:text-orange-500 uppercase px-10 ${
            page === "New" ? "text-orange-600" : ""
          }`}
        >
          New
        </button>
        <button
          onClick={() => {
            setPage("Audoos");
          }}
          class={`focus:outline-none text-5xl hover:text-orange-500 uppercase px-10 ${
            page === "Audoos" ? "text-orange-600" : ""
          }`}
        >
          Audoos
        </button>
        <button
          onClick={() => {
            setPage("Shared");
          }}
          class={`focus:outline-none text-5xl hover:text-orange-500 uppercase px-10 ${
            page === "Shared" ? "text-orange-600" : ""
          }`}
        >
          Shared
        </button>
      </div>
    </div>
  );
};

export default Navbar;
