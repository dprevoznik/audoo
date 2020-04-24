const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const router = require("./router.js");
const port = 3020;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../build")));

app.use("/service", router);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
