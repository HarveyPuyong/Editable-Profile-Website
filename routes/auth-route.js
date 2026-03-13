const express = require('express');
const router = express.Router();
const  verifyResetPasswordToken = require("../middleware/verify-reset-password-token");

// =======================
// LOGIN
// =======================
router.post('/login', require('../controllers/login-controller')); 

// =======================
// SEND OTP
// =======================            
router.post("/sendOTP", require('../controllers/otp-controller').sendOtp);

// =======================
// VERIFY OTP
// =======================
router.post("/verifyOTP", require('../controllers/otp-controller').verifyOtp); 

// =======================
// CHANGE PASSWORD
// =======================
router.patch("/changePassword",
              verifyResetPasswordToken,
              require('../controllers/change-password-controller')); 

// =======================
// REFRESH TOKEN
// =======================              
router.get("/refreshToken", require('../controllers/refresh-token-controller')); //Refresh Token

module.exports = router;