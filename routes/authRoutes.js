const express = require('express');
const router = express.Router();
const User = require('../models/users'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');
const auth = require('../controllers/authcontrollers')
// Routes
router.get('/signup', auth.renderSignupForm);
router.post('/signup', auth.signup);
router.get('/login', auth.renderLoginForm);
router.post('/login', auth.login);

module.exports = router;
