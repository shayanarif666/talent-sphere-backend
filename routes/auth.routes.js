const express = require("express");
const {
  registerUser,
  verifyOtp,
  loginUser,
  resendOtp
} = require("../controllers/auth.controller.js");
const upload = require("../upload");

const router = express.Router();

// Register user + workspace
router.post("/register", upload.single("logoUrl"), registerUser);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// Resend OTP
router.post("/resend-otp", resendOtp)

// Login
router.post("/login", loginUser);

module.exports = router;