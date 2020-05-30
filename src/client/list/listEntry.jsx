import React, { useState } from "react";
import axios from "axios";
import fetchAudoos from "../helpers/fetchAudoos.js";

function ListEntry({ audoo, page, setAudoos, user }) {
  var [hover, setHover] = useState(false);
  var [innerHover, setInnerHover] = useState(false);
  var [truthy, setTruthy] = useState(audoo.public);

  function handleDeletion() {
    axios
      .put(`/service/delete/${audoo._id}`)
      .then(() => fetchAudoos(page, setAudoos, user))
      .catch((err) => console.log("Err deleting post: ", err));
  }

  function onHoverToggle(e) {
    e.preventDefault();
    setHover(!hover);
  }

  function onInnerHoverToggle(e) {
    e.preventDefault();
    setInnerHover(!innerHover);
  };

  function onPublicToggle() {
    axios
      .put(`/service/public/${audoo._id}/${!truthy}`)
      .catch((err) => console.log("Error updating public status: ", err));
    setTruthy(!truthy);
  };

  return (
    <div
      className="my-6 mx-10 w-1/2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      onMouseEnter={onHoverToggle}
      onMouseLeave={onHoverToggle}
    >
      <div className="flex flex-col">
        <div
          className={`text-lg text-gray-900 flex flex-col text-left w-full rounded-lg overflow-y-auto border-2 border-gray-600`}
        >
          <div
            className={`flex justify-between border-gray-600 border-b-2  ${
              page === "Audoos" ? decideMoodColor(audoo.emoji) : ""
            }`}
          >
            <div>
              <span className="font-bold ml-4">{audoo.date}</span>
              <span className="font-bold text-gray-900">
                {page === "Shared" || page === "Feed"
                  ? ` | ${audoo.sharedBy}`
                  : null}
              </span>
            </div>
            {page !== "Feed" ? (
              <button
                onClick={handleDeletion}
                className="inline-block align-middle mr-2 focus:outline-none"
              >
                <i className="fas fa-times-circle fa-xs text-red-600 transition duration-500 hover:text-red-700 transform hover:scale-125"></i>
              </button>
            ) : null}
          </div>
          <div className="">
            <iframe
              className=""
              style={{ position: "relative", height: "100%", width: "100%" }}
              title={audoo.memory + audoo.date}
              src={`https://www.youtube.com/embed/${audoo.url}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {hover === true ? (
            <div
              onMouseEnter={onInnerHoverToggle}
              onMouseLeave={onInnerHoverToggle}
              className="border-gray-600 border-t-2 flex flex-col"
            >
              <p className="text-sm font-bold text-gray-900 m-2 ml-4">
                {audoo.memory}
              </p>
              {page === "Audoos" && innerHover === true ? (
                <button
                  className={`text-xs p-1 focus:outline-none border-gray-600 border-t transition ease-in-out duration-1000 ${
                    truthy === true
                      ? "bg-blue-600 hover:font-bold"
                      : "bg-gray-300 hover:font-bold"
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

function decideMoodColor(emotion) {
  if (emotion === "") return "";
  if (emotion === "smiley") return "bg-green-200";
  if (emotion === "neutral") return "";
  if (emotion === "frowning") return "bg-red-200";
}

export default ListEntry;
