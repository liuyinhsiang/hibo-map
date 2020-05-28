const mongoose = require('mongoose');
const User = require('../models/User');
// const User = mongoose.model('users');

const passport = require('../services/passport');
const asyncHandler = require('../middlewares/async');

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { displayName, email, password } = req.body;
  try {
    // Create user
    const user = await User.create({
      displayName,
      email,
      password,
    });
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.redirect('/register');
  }
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  });
};
