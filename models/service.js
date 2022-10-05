const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  subTitle: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  }
});

module.exports = new mongoose.model("Service", serviceSchema);
