import axios from "axios";

function fetchAudoos(page, setAudoos, nickname = localStorage.getItem("id")) {
  if (page === "Audoos") {
    axios
      .get(`/service/audoos/${nickname}`)
      .then(({ data }) => setAudoos(data))
      .catch((err) => console.log("err fetching audoos: ", err));
  } else if (page === "Shared") {
    axios
      .get(`/service/shared/${nickname}`)
      .then(({ data }) => setAudoos(data))
      .catch((err) => console.log("err fetching shared: ", err));
  } else if (page === "Feed") {
    axios  
      .get(`/service/feed`)
      .then(({ data }) => setAudoos(data))
      .catch((err) => console.log("err fetching feed: ", err));
  }
};

export default fetchAudoos;