const express = require("express");
const Candidates = require("../models/candidates");

function candidateController() {
  return express
    .Router({ mergeParams: true })
    .use(express.json())
    .post("/", addCandidate)
    .get("/", getAllCandidates)
    .put("/", getFilteredCandidates);
}

const addCandidate = async (req, res) => {
  try {
    console.log(req.body);
    const data = new Candidates(req.body);
    const result = await data.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllCandidates = async (req, res) => {
  try {
    // console.log(req.body);
    const finalData = await Candidates.find()
      .skip(Number(req.query.skip))
      .limit(Number(req.query.limit));
    // console.log(finalData);
    res.status(200).json(finalData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getFilteredCandidates = async (req, res) => {
  try {
    // console.log(req.body);
    const obj = {};
    for (let key in req.body) {
      if (req.body[key] && req.body[key].length > 0) {
        if (Array.isArray(req.body[key])) obj[key] = { $in: req.body[key] };
        else obj[key] = { $regex: req.body[key] };
        // { $regex: /Ghost/, $options: 'i' }
      }
    }

    // console.log(obj);

    const finalData = await Candidates.find(obj)
      .skip(Number(req.query.skip))
      .limit(Number(req.query.limit));
    // console.log(finalData);
    res.status(200).json(finalData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = candidateController;
