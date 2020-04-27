import axios from "axios";

const fetchAudoos = (page, setAudoos) => {
  let nickname = localStorage.getItem("id");
  if (page === "Audoos") {
    axios
      .get(`/service/audoos/${nickname}`)
      .then(({ data }) => setAudoos(data))
      .catch((err) => console.log("err fetching audoos: ", err));
  } else {
    axios
      .get(`/service/shared/${nickname}`)
      .then(({ data }) => setAudoos(data))
      .catch((err) => console.log("err fetching shared: ", err));
  }
};

export default fetchAudoos;
