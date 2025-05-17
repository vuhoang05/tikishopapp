const express = require("express");
const router = express.Router();
const Delivery = require("../models/Delivery.model");

router.get("/", async (req, res) => {
  const data = await Delivery.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  try {
    const newItem = await Delivery.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
