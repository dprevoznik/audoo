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
    <div class="flex flex-col items-center text-center w-full">
      <input
        value={searchTerm}
        onChange={handleSearchTermChange}
        type="search"
        class="outline-none border-b-2 border-t-2 border-solid rounded-lg border-gray-600 w-1/2 h-16 text-xl text-center mt-16"
        placeholder={`Let's Record A Memory ${user}!`}
      ></input>
      {searchResults.length > 0 && chosen === null
        ? searchResults.map((item) => {
            return (
              <div
                onClick={() => {
                  setChosen(item);
                }}
                class="hover:bg-red-300 border-2 border-solid border-gray-600 p-2 w-1/2 text-lg"
              >
                {item.snippet.title}
              </div>
            );
          })
        : null}
        {chosen !== null ? (
          <MemoryForm setPage={setPage} chosen={chosen} />
        ) : null}
    </div>
  );
};
// FORM after URL is chosen

export default NewPage;
