const express = require("express");
const router = express.Router();
const Voucher = require("../models/Voucher.model");

// GET tất cả voucher
router.get("/", async (req, res) => {
  const vouchers = await Voucher.find();
  res.json(vouchers);
});

// POST thêm mới
router.post("/", async (req, res) => {
  try {
    const newVoucher = await Voucher.create(req.body);
    res.status(201).json(newVoucher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
