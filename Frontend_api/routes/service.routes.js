const express = require("express");
const router = express.Router();
const Service = require("../models/Service.model");

router.get("/", async (req, res) => {
  const data = await Service.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  try {
    const newItem = await Service.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
