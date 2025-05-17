const express = require("express");
const router = express.Router();
const User = require("../models/User.model"); // Đảm bảo đường dẫn chính xác
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Đăng ký
router.post("/register", async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email đã tồn tại" });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashed, role }); // Lưu cả role
        res.status(201).json({ message: "Đăng ký thành công", user: { id: newUser._id, email: newUser.email, role: newUser.role } }); // Chỉ trả về các trường cần thiết
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err });
    }
});

// Đăng nhập
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Sai email hoặc mật khẩu" });

        const token = jwt.sign({ userId: user._id }, "secret_key", { expiresIn: "1d" });

        // Lựa chọn các trường trả về (quan trọng)
        const userForFrontend = {
            id: user._id,
            email: user.email,
            role: user.role,
            fullName: user.fullName, // Thêm các trường bạn cần
            nickName: user.nickName,
            birthDay: user.birthDay,
            gender: user.gender,
            phone: user.phone,
            address: user.address,
        };

        res.json({ token, user: userForFrontend }); // Trả về đối tượng đã được lọc
    } catch (err) {
        res.status(500).json({ message: "Lỗi server", error: err });
    }
});

module.exports = router;
