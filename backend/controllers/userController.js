const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { registerValidation, loginValidation } = require('../utils/validation');
const generateToken = require('../utils/generateToken');

// @Desc    Register a user
// @route   POST api/v1/user/register
// @Access  Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validate fields
  const { error, errorsMessages } = registerValidation({
    username,
    email,
    password,
    confirmPassword,
  });
  if (error) {
    res.status(401);
    throw { message: errorsMessages };
  }

  // Confirm that passwords matches
  if (password !== confirmPassword) {
    throw new Error('Passwords does not match!');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists!');
  }

  // Create user
  const newUser = await User.create({ ...req.body, password });

  if (newUser) {
    generateToken(res, newUser._id);
    res.json({
      message: 'User created successfully.',
      payload: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
});

// @Desc    Login a user
// @route   POST api/v1/user/login
// @Access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate the fields
  const { error, errorsMessages } = loginValidation({ email, password });
  if (error) {
    res.status(400);
    throw { message: errorsMessages };
  }

  // Get the user from DB
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User does not exist!');
  }

  // Validate password
  if (user.matchPassword(password)) {
    generateToken(res, user._id);
    res.status(200).json({
      message: 'User logged in successfully.',
      payload: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credentials');
  }
});

// @desc Logout a user
// @route POST /api/v1/user/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'User logged out.' });
});

module.exports = {
  register,
  login,
  logout,
};
