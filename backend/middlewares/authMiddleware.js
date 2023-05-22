const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      // Decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get the user
      const user = await User.findById(decoded.userID).select('-password');
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized');
    }
  } else {
    res.status(401);
    throw new Error('Unauthorized, there is no token');
  }
});

module.exports = authMiddleware;
