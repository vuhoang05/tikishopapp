const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  deliveryName: { type: String, required: true },
  deliveryLocation: { type: String, required: true },
});

module.exports = mongoose.model("Delivery", DeliverySchema);
