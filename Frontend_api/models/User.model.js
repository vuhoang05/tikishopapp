const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["user", "admin"], default: "user" },
  fullName: { type: String },
  nickName: { type: String },
  birthDay: { type: String },
  gender:   { type: String, enum: ["male", "female", "other"] },
  phone:    { type: String },
  address:  { type: String },
});

module.exports = mongoose.model("User", UserSchema);
