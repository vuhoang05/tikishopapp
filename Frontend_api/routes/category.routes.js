const express = require("express");
const router = express.Router();
const Category = require("../models/Category.model");

// GET all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const newCat = new Category(req.body);
    await newCat.save();
    res.status(201).json(newCat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const cat = await Category.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!cat) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const result = await Category.deleteOne({ id: req.params.id });
  if (result.deletedCount === 0)
    return res.status(404).json({ message: "Không tìm thấy" });
  res.json({ message: "Đã xoá" });
});

module.exports = router;
