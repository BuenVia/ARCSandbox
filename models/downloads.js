const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    require: true
  }
});

module.exports = mongoose.model("Download", downloadSchema);
