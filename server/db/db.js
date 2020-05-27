var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));
const { DB_USERNAME, DB_PASSWORD } = require("./db.config.js");

mongoose.connect("mongodb://18.188.108.40:27017/audoo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: DB_USERNAME,
  pass: DB_PASSWORD,
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
  emoji: String,
  public: Boolean,
  created: String
});

var Audoos = db.model("Audoos", audoosSchema);

module.exports.Nickname = Nickname;
module.exports.Audoos = Audoos;
