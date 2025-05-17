const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  voucher_name: { type: String, required: true },
  discount: { type: Number, required: true },
  minimum_order: { type: Number, required: true },
  code: { type: String, required: true, unique: true },
  expiry_date: { type: String, required: true }, // hoặc Date nếu bạn muốn format chuẩn
  description: { type: String },
  type: { type: String, enum: ["discount", "shipping"], default: "discount" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Voucher", VoucherSchema);
