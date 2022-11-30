const express = require("express");

const mongoose = require("mongoose");

const candidateController = require("./controllers/candidates");
const cors = require("cors");
mongoose.connect("mongodb://127.0.0.1:27017/taskappserver", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors());

app.use("/candidates", candidateController());

app.listen(8000, () => {
  console.log("Server running");
});
