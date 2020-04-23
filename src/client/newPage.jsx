import React, { useState, useEffect } from "react";
import axios from "axios";
import API_KEY from "../api.config";
import MemoryForm from "./memoryForm";

let NewPage = (props) => {
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
    <>
      <div class="flex justify-center mt-16">
        <input
          value={searchTerm}
          onChange={handleSearchTermChange}
          type="search"
          class="bg-orange-200 border-4 border-solid rounded-lg border-gray-600 w-1/2 h-16 text-xl text-center"
        ></input>
      </div>
      <div>
        {searchResults.length > 0 && chosen === null
          ? searchResults.map((item) => {
              return (
                <div
                  onClick={() => {
                    setChosen(item);
                  }}
                  class="flex justify-center"
                >
                  <span class="hover:text-blue-900 hover:bg-red-300 border-4 border-solid border-gray-600 p-2 w-1/2 text-xl">
                    {item.snippet.title}
                  </span>
                </div>
              );
            })
          : null}
      </div>
      <div>{chosen !== null ? <MemoryForm chosen={chosen} /> : null}</div>
    </>
  );
};
// FORM after URL is chosen

export default NewPage;
