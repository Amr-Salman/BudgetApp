const jwt = require('jsonwebtoken');

const generateToken = (res, userID) => {
  // Generate the JWT token
  const token = jwt.sign({ userID }, process.env.JWT_SECRET);

  // assign it to the response object as httpOnly cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
