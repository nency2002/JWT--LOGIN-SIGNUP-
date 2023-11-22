const mongoose = require("mongoose");

let User = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const UserData = mongoose.model("users", User);

module.exports = UserData;
