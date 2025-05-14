const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bookRoutes = require("./routes/book.routes");
const BookModel = require("./models/Book.model");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Book inserted successfully");
    // Sau khi thêm sách thì mới khởi động server
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("❌", err));