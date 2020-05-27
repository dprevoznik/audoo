import React from "react";

let Navbar = (props) => {
  let { page, setPage } = props;
  let options = ["New", "Audoos", "Shared", "Feed", "Stats"];
  return (
    <div class="h-screen border-gray-600 border-solid border-r-2 flex flex-col items-center justify-center px-2 bg-gray-500">
      {options.map(
        function createNavbarElement(item, idx) {
          return (
            <div key={idx}>
              <button
                onClick={() => {
                  setPage(item);
                }}
                class={`focus:outline-none text-5xl hover:text-orange-500 uppercase transform hover:scale-110 ${
                  page === item ? "text-orange-600" : ""
                }`}
              >
                {item}
              </button>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Navbar;
