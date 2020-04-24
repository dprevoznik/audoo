var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));
// var example = require("./example.js");

mongoose.connect("mongodb://localhost:27017/audoo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;

/* ******************* */
/* **Nickname Model*** */
/* ******************* */
var nicknameSchema = new mongoose.Schema({
  userName: String,
});

var Nickname = db.model("Nickname", nicknameSchema);

/* ******************* */
/* ***Audoos Model**** */
/* ******************* */

var audoosSchema = new mongoose.Schema({
  userName: String,
  memory: String,
  url: String,
  date: String,
  sharedWithUsers: [String],
  sharedBy: String,
  shared: Boolean,
});

var Audoos = db.model("Audoos", audoosSchema);

// Nickname.createAsync({ userName: "Dan222" });
// Audoos.createAsync(example);

module.exports.Nickname = Nickname;
module.exports.Audoos = Audoos;
