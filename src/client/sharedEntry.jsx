import React from "react";

let SharedEntry = ({ share }) => {
  return (
    <div class="m-2 p-2 w-3/5">
      <div class="flex flex-row">
        <div>
          <iframe
            class="rounded-l-full"
            allowTransparency
            style={{ position: "relative", height: "20vh", width: "25vw" }}
            title={share.memory + share.date}
            src={`https://www.youtube.com/embed/${share.url}`}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div class="text-xl text-gray-900 bg-green-300 flex flex-col text-left w-full rounded-r-lg overflow-y-auto">
          <div class="bg-blue-700">
            <span class="font-bold text-white ml-4 inline-flex">{share.date}</span>
            <span class="text-right object-right font-bold text-gray-900">{` | From ${share.sharedBy}`}</span>
          </div>
          <p class="font-bold text-gray-900 m-2 ml-4">{share.memory}</p>
        </div>
      </div>
    </div>
  );
};

export default SharedEntry;
