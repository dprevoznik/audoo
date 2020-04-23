const { Audoos, Nickname } = require("./db.js");
const Promise = require("bluebird");

let trySavingInvolved = (friends, originalObj) => {
  let promises = [];
  let newObj = Object.assign({}, originalObj);
  for (let friend of friends) {
    promises.push(Nickname.findOneAsync({ userName: friend }));
  }
  Promise.all(promises)
    .then((result) => {
      console.log("result of promise all: ", result);
      for (let item of result) {
        if (item !== null) {
          let saveObj = Object.assign({}, newObj, { userName: item.userName });
          Audoos.createAsync(saveObj).catch((err) =>
            console.log("err saving individual friend involved: ", err)
          );
        }
      }
    })
    .catch((err) => console.log("err in promise.all action: ", err));
};

module.exports = trySavingInvolved;
