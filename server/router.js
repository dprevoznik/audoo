const express = require("express");
const { Audoos, Nickname } = require("./db.js");
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.post("/username", (req, res) => {
  let { attempt } = req.body;
  Nickname.findOneAsync({ userName: attempt }).then((result) => {
    if (result !== null) {
      res.send(true);
    } else {
      Nickname.createAsync({ userName: attempt });
      res.send(false);
    }
  });
});

module.exports = router;
