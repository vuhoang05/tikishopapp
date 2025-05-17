const express = require("express");
const router = express.Router();
const Order = require("../models/Order.model");

// Lấy tất cả đơn hàng
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Thêm đơn hàng mới
router.post("/", async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
