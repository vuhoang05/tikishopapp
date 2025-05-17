const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Thêm dòng này
require("dotenv").config();

const Delivery = require("./models/Delivery.model");
const Service = require("./models/Service.model");
const Voucher = require("./models/Voucher.model");
const User = require("./models/User.model"); // Model người dùng

const { deliveries, services, vouchers } = require("./models/test");

const bookRoutes = require("./routes/book.routes");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/user.routes");
const voucherRoutes = require("./routes/voucher.routes");
const deliveryRoutes = require("./routes/delivery.routes");
const serviceRoutes = require("./routes/service.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/vouchers", voucherRoutes);
app.use("/delivery", deliveryRoutes);
app.use("/service", serviceRoutes);
app.use("/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // const saltRounds = 10;
    // const rawUsers = [
    //   {
    //     email: "admin@admin.com",
    //     password: "admin123", // Mật khẩu thuần
    //     role: "admin",
    //     fullName: "Admin User",
    //     nickName: "Admin",
    //     birthDay: "01/01/1980",
    //     gender: "male",
    //     phone: "+840123456789",
    //     address: "123 Admin Street, Hanoi, Vietnam"
    //   },
    //   {
    //     email: "huyhoang@gmail.com",
    //     password: "123456", // Mật khẩu thuần
    //     role: "user",
    //     fullName: "huyhoang",
    //     nickName: "River",
    //     birthDay: "03/07/2003",
    //     gender: "male",
    //     phone: "+0373700584",
    //     address: "456 User Lane, Ho Chi Minh City, Vietnam"
    //   }
    // ];

    // // Mã hóa mật khẩu trước khi insert
    // const users = await Promise.all(rawUsers.map(async (user) => ({
    //   ...user,
    //   password: await bcrypt.hash(user.password, saltRounds)
    // })));

    // // Reset dữ liệu
    // await User.deleteMany();
    // await User.insertMany(users);
    // console.log("✅ Đã reset người dùng với mật khẩu đã mã hóa");

    // // Optional: reset delivery/service/voucher
    // // await Delivery.deleteMany(); await Delivery.insertMany(deliveries);
    // // await Service.deleteMany(); await Service.insertMany(services);
    // // await Voucher.deleteMany(); await Voucher.insertMany(vouchers);

    // // Start server
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("❌ Mongo Error", err));
