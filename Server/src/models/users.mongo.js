const mongoose = require("mongoose");
const usersScheme = new mongoose.Schema({
  id: {
    type: String,
    require: true,
    default: "1",
  },
  shifts: [],
});
const model = mongoose.model("user", usersScheme);
module.exports = model;
