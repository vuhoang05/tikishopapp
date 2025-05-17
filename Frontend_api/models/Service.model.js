const mongoose = require("mongoose");
const ServiceSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  serviceName: { type: String, required: true },
  deliveryFee: { type: Number, required: true },
});
module.exports = mongoose.model("Service", ServiceSchema);
