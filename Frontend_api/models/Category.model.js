const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  id: String,
  name: String, 
  img: String,
  createdAt: String,
});

module.exports = mongoose.model("Category", CategorySchema);
