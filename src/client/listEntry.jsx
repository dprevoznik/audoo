import React from "react";
import axios from "axios";
import fetchAudoos from "./fetchAudoos.js";

let ListEntry = ({ audoo, page, setAudoos }) => {
  const handleDeletion = () => {
    axios
      .put(`/service/delete/${audoo._id}`)
      .then(() => fetchAudoos(page, setAudoos))
      .catch((err) => console.log("Err deleting post: ", err));
  };

  return (
    <div class="m-2 p-2 w-3/5">
      <div class="flex flex-row">
        <div>
          <iframe
            class="rounded-l-full"
            allowTransparency
            style={{ position: "relative", height: "100%", width: "25vw" }}
            title={audoo.memory + audoo.date}
            src={`https://www.youtube.com/embed/${audoo.url}`}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div class="text-xl text-gray-900 flex flex-col text-left w-full rounded-r-lg overflow-y-auto border-t-2 border-r-2 border-b-2 border-gray-600">
          <div class="flex justify-between border-gray-600 border-b-2">
            <div>
              <span class="font-bold ml-4">{audoo.date}</span>
              <span class="font-bold text-gray-900">
                {page === "Shared" ? ` | From ${audoo.sharedBy}` : null}
              </span>
            </div>
            <button
              onClick={handleDeletion}
              class="inline-block align-middle mr-2 focus:outline-none"
            >
              <i class="fas fa-times-circle fa-xs text-red-600 hover:text-red-500"></i>
            </button>
          </div>
          <p class="font-bold text-gray-900 m-2 ml-4">{audoo.memory}</p>
        </div>
      </div>
    </div>
  );
};

export default ListEntry;
