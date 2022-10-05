const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  summary: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  }
});

module.exports = new mongoose.model("Webinar", webinarSchema);
