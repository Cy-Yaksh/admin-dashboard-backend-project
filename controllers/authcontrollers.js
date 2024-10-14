const User = require('../models/users')
const bodyParser = require('body-parser')
const express = require('express')
const jsonParser = bodyParser.json()
const mongoose = require('mongoose')

// Make sure these functions are exported
exports.renderSignupForm = (req, res) => {
  res.render('signup');
};

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
      const user = new User({ username, password });
      await user.save();
      // const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
      // res.send({ token });
      res.redirect('/login');
  } catch (error) {
      res.status(400).send(error);
  }
};

exports.renderLoginForm = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
      return res.status(404).send('User not found');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
      return res.status(400).send('Invalid credentials');
  }
  // const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
  // res.send({ token });
  res.redirect('/');
};

  