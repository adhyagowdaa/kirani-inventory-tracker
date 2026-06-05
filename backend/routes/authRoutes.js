const express = require('express');
const router = express.Router();
const { register, login} = require('../controllers/authController');

// This means when the frontend calls /api/auth/register, it runs the register function
router.post('/register', register);
router.post('/login', login);

module.exports = router;