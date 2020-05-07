import React, { useState } from "react";
import axios from "axios";
import fetchAudoos from "./fetchAudoos.js";

let ListEntry = ({ audoo, page, setAudoos }) => {
  const handleDeletion = () => {
    axios
      .put(`/service/delete/${audoo._id}`)
      .then(() => fetchAudoos(page, setAudoos))
      .catch((err) => console.log("Err deleting post: ", err));
  };

  const decideMoodColor = (emotion) => {
    if (emotion === "") return "";
    if (emotion === "smiley") return "bg-green-200";
    if (emotion === "neutral") return "";
    if (emotion === "frowning") return "bg-red-200";
  };

  let [hover, setHover] = useState(false);
  let [innerHover, setInnerHover] = useState(false);
  const onHoverToggle = (e) => {
    e.preventDefault();
    setHover(!hover);
  };

  const onInnerHoverToggle = (e) => {
    e.preventDefault();
    setInnerHover(!innerHover);
  };

  let [truthy, setTruthy] = useState(audoo.public);
  const onPublicToggle = () => {
    axios
      .put(`/service/public/${audoo._id}/${!truthy}`)
      // .then(() => fetchAudoos(page, setAudoos)) <-- I will always be on Audoo page. I do not need to update my list now.
      .catch((err) => console.log("Error updating public status: ", err));
    setTruthy(!truthy);
  };

  return (
    <div
      class="my-6 mx-10 w-1/2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      onMouseEnter={onHoverToggle}
      onMouseLeave={onHoverToggle}
    >
      <div class="flex flex-col">
        <div
          class={`text-lg text-gray-900 flex flex-col text-left w-full rounded-lg overflow-y-auto border-2 border-gray-600`}
        >
          <div
            class={`flex justify-between border-gray-600 border-b-2  ${
              page === "Audoos" ? decideMoodColor(audoo.emoji) : ""
            }`}
          >
            <div>
              <span class="font-bold ml-4">{audoo.date}</span>
              <span class="font-bold text-gray-900">
                {page === "Shared" || page === "Feed"
                  ? ` | ${audoo.sharedBy}`
                  : null}
              </span>
            </div>
            <button
              onClick={handleDeletion}
              class="inline-block align-middle mr-2 focus:outline-none"
            >
              <i class="fas fa-times-circle fa-xs text-red-600 hover:text-red-500"></i>
            </button>
          </div>
          <div class="">
            <iframe
              class=""
              allowTransparency
              style={{ position: "relative", height: "100%", width: "100%" }}
              title={audoo.memory + audoo.date}
              src={`https://www.youtube.com/embed/${audoo.url}`}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {hover === true ? (
            <div
              onMouseEnter={onInnerHoverToggle}
              onMouseLeave={onInnerHoverToggle}
              class="border-gray-600 border-t-2 flex flex-col"
            >
              <p class="text-sm font-bold text-gray-900 m-2 ml-4">
                {audoo.memory}
              </p>
              {page === "Audoos" && innerHover === true ? (
                <button
                  class={`text-xs p-1 focus:outline-none border-gray-600 border-t transition ease-in-out duration-1000 ${
                    truthy === true ? "bg-blue-600 hover:font-bold" : "bg-gray-300 hover:font-bold"
                  }`}
                  onClick={onPublicToggle}
                >
                  {truthy === true ? "Public" : "Private"}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ListEntry;
