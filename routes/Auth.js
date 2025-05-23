const express = require('express');
const router = express.Router();
const auth = require('../controllers/Auth');

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
// This code defines the routes for user authentication in an Express.js application.