import React from "react";

let MemoryEntry = ({ audoo }) => {
  return (
    <div class="m-2 p-2 w-3/5">
      <div class="flex flex-row">
        <div>
          <iframe
            class="rounded-l-full"
            allowTransparency
            style={{ position: "relative", height: "20vh", width: "25vw" }}
            title={audoo.memory + audoo.date}
            src={`https://www.youtube.com/embed/${audoo.url}`}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div class="text-xl text-gray-800 bg-green-300 flex flex-col text-left w-full rounded-r-lg overflow-y-auto">
          <div class="bg-blue-400">
            <span class="font-bold text-orange-700 ml-4">{audoo.date}</span>
          </div>
          <p class="font-bold text-gray-800 m-2 ml-4">{audoo.memory}</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryEntry;
