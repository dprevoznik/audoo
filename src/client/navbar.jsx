import React from "react";

let Navbar = (props) => {
  let { page, setPage } = props;
  return (
    <div class="h-screen border-gray-600 border-solid border-r-2 flex flex-col items-center justify-center px-2 bg-gray-300">
      <div>
        <button
          onClick={() => {
            setPage("New");
          }}
          class={`focus:outline-none text-5xl hover:text-orange-500 uppercase ${
            page === "New" ? "text-orange-600" : ""
          }`}
        >
          New
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setPage("Audoos");
          }}
          class={`focus:outline-none text-5xl hover:text-orange-500 uppercase ${
            page === "Audoos" ? "text-orange-600" : ""
          }`}
        >
          Audoos
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setPage("Shared");
          }}
          class={`focus:outline-none text-5xl hover:text-orange-500 uppercase ${
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
