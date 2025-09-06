// routes/login.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// POST /api/login/user-login
router.post("/user-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📩 Incoming login request:", { email, password });

    // 1. Check if user exists
    const user = await User.findOne({ email });
    console.log("📥 USER:", user);

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match?", isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "mySuperSecretKey", // fallback if no env set
      { expiresIn: "1h" }
    );

    // 4. Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
