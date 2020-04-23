const express = require("express");
const { Audoos, Nickname } = require("./db.js");
const trySavingInvolved = require("./saveInvolved.js");
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// **************************** //
// ********** GET ************* //
// **************************** //

router.get("/audoos/:nickname", (req, res) => {
  let { nickname } = req.params;
  Audoos.find({ userName: nickname, sharedBy: nickname })
    .then((audoos) => res.send(audoos))
    .catch((err) => res.send(500));
});

router.get("/shared/:nickname", (req, res) => {
  let { nickname } = req.params;
  Audoos.find({ userName: nickname, sharedBy: {"$ne": nickname} })
    .then((audoos) => res.send(audoos))
    .catch((err) => res.send(500));
});

// **************************** //
// ********* POST ************* //
// **************************** //

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

router.post("/memory", (req, res) => {
  Audoos.createAsync(req.body)
    .then((result) => {
      console.log("Created new memory: ", result);
      res.send(201);
      if (req.body.shared) {
        let involved = req.body.sharedWithUsers;
        trySavingInvolved(involved, req.body);
      }
    })
    .catch((err) => {
      console.log("Error creating new memory: ", err);
      res.send(500);
    });
});

module.exports = router;
