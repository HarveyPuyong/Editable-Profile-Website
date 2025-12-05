const express = require('express');
const router = express.Router();

router.post('/login', require('../controllers/login-controller')); // Login
router.get("/refreshToken", require('../controllers/refresh-token-controller')); //Refresh Token

module.exports = router;