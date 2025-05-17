const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  sale: { type: Number, default: 0 },
  orderDate: { type: String },
  deliveryDate: { type: String },
  paymentMethod: { type: String, enum: ["cash", "card", "momo", "bank"], default: "cash" },

  service: { type: Number, ref: "Service" },
  deliveryId: { type: Number, ref: "Delivery" },

  shippingDiscount: { type: Number, default: 0 },
  voucherDiscount: { type: Number, default: 0 },

  sku: String,
  seller: String,

  book: { type: Object, required: true }, // Hoặc tham chiếu Book nếu dùng ref

}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
