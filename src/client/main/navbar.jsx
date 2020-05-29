import React, { useState } from "react";

function Navbar({ page, setPage }) {
  var options = ["New", "Audoos", "Shared", "Feed", "Stats"];
  var [showNavbar, setShowNavbar] = useState(false);

  function toggleNavbar() {
    setShowNavbar(!showNavbar);
  }

  return (
    <div className="relative flex-col flex items-end bg-gray-500">
      <div className="w-16">
        <button onClick={toggleNavbar} className="absolute ml-4 mt-2 focus:outline-none">
          <i class="fas fa-bars text-4xl text-gray-800 hover:text-orange-500 transform transition duration-200 hover:scale-110"></i>
        </button>
      </div>
      <div className="h-screen border-gray-600 border-solid border-r-2 flex flex-col items-center justify-center px-8 bg-gray-500">
        {showNavbar
          ? options.map(function createNavbarOption(item, idx) {
              return (
                <div key={idx}>
                  <button
                    onClick={() => {
                      setPage(item);
                    }}
                    className={`focus:outline-none text-5xl text-gray-800 transition duration-500 hover:text-orange-500 uppercase transform hover:scale-125 ${
                      page === item ? "text-orange-600" : ""
                    }`}
                  >
                    {item}
                  </button>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Navbar;
