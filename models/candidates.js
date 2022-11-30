const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const candidateSchema = new Schema({
  firstName: String,
  lastName: String,
  gender: String,
  locations: [String],
  skills: [String],
});

module.exports = mongoose.model("Candidates", candidateSchema);
