import React, { useState, useEffect } from "react";
import axios from "axios";
import API_KEY from "../api.config";
import MemoryForm from "./memoryForm";

let NewPage = ({ setPage, user }) => {
  // state for URL choice
  let [chosen, setChosen] = useState(null);
  let [searchTerm, setSearchTerm] = useState("");
  let [searchResults, setSearchResults] = useState([]);

  let handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      axios
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&type=video&q=${searchTerm
            .split(" ")
            .join("+")}&videoEmbeddable=true&key=${API_KEY}`
        )
        .then(({ data }) => {
          let { items } = data;
          setSearchResults(items);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  }, [searchTerm]);
  return (
    <div class="flex flex-col items-center text-center w-full h-screen justify-center">
      <div class="w-1/2 border-gray-600 border-2 rounded">
        <input
          value={searchTerm}
          onChange={handleSearchTermChange}
          type="search"
          class="outline-none h-16 text-xl text-center w-full"
          placeholder={`Let's Record A Memory ${user}!`}
        ></input>
      </div>
      <div class="w-1/2 shadow-2xl">
        {searchResults.length > 0 && chosen === null
          ? searchResults.map((item, idx) => {
              return (
                <div
                  onClick={() => {
                    setChosen(item);
                  }}
                  class={`flex flex-row hover:bg-gray-500 hover:font-semibold border-solid border-r-2 border-l-2 border-gray-600 bg-white p-2 w-full text-m ${
                    idx === 0 ? "mt-2 rounded-t border-t-2" : ""
                  } ${
                    idx === searchResults.length - 1
                      ? "rounded-b border-b-2"
                      : ""
                  }`}
                >
                  <img
                    class="rounded-full"
                    style={{
                      position: "relative",
                      width: "10%",
                      height: "100%",
                    }}
                    src={item.snippet.thumbnails.default.url}
                    alt={`search result ${idx}`}
                  />
                  <p class="ml-2 pt-2">{item.snippet.title}</p>
                </div>
              );
            })
          : null}
      </div>
      {chosen !== null ? (
        <MemoryForm setPage={setPage} chosen={chosen} />
      ) : null}
    </div>
  );
};
// FORM after URL is chosen

export default NewPage;
