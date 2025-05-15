const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bookRoutes = require("./routes/book.routes");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/user.routes"); // <-- thêm

const User = require("./models/User.model");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/books", bookRoutes);
app.use("/auth", authRoutes); // <-- thêm route auth

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Thêm người dùng mẫu nếu DB rỗng
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashed = await bcrypt.hash("123456", 10);
      await User.create([
        { email: "admin@mail.com", password: hashed, role: "admin" },
        { email: "user@mail.com", password: hashed, role: "user" }
      ]);
      console.log("✅ Đã tạo người dùng mẫu");
    }

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("❌", err));
