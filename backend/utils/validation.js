const validator = require('validator');

const registerValidation = ({ email, username, password, confirmPassword }) => {
  let error;
  let errorsMessages = [];

  // Validate Email
  if (!validator.isEmail(email)) {
    error = true;
    errorsMessages.push('Please enter a valid email.');
  }

  // Validate Username
  if (!validator.isLength(username, { min: 3, max: 30 })) {
    error = true;
    errorsMessages.push(
      'Username should be equal or greater than 3 charachters, and equal or less than 30 charachters.'
    );
  }

  // Validate Password
  if (!validator.isStrongPassword(password)) {
    error = true;
    errorsMessages.push(
      'Please enter a strong password, strong password contains at least 8 characters, 1 lowsercase, 1 uppercase, 1 number, 1 symbol.'
    );
  }

  // Validate Password with ConfirmPassword
  if (password !== confirmPassword) {
    error = true;
    errorsMessages.push("Password and Confirm password doesn't match.");
  }
  return { error, errorsMessages };
};

const loginValidation = ({ email, password }) => {
  let error;
  let errorsMessages = [];

  // Validate Email
  if (!validator.isEmail(email)) {
    error = true;
    errorsMessages.push('Please enter a valid email.');
  }

  // Validate Password
  if (!validator.isStrongPassword(password)) {
    error = true;
    errorsMessages.push(
      'Please enter a strong password, strong password contains at least 8 characters, 1 lowsercase, 1 uppercase, 1 number, 1 symbol.'
    );
  }
  return { error, errorsMessages };
};

const createBudgetValidation = ({ title, amount, color }) => {
  let error;
  let errorsMessages = [];
  // Validate the fields
  if (!color || !title || !amount) {
    error = true;
    errorsMessages.push('Please fill all the fields.');
  }
  if (!validator.isLength(title, { min: 3, max: 50 })) {
    error = true;
    errorsMessages.push(
      'Please enter a valid budget title, budget title should be equal or greater than 3 characters, and equal or less than 50 characters.'
    );
  }
  if (
    !color.startsWith('#') ||
    !validator.isLength(color, { min: 7, max: 7 })
  ) {
    error = true;
    errorsMessages.push(
      'Please enter a valid color, color should be a hexcolor.'
    );
  }
  if (Number(amount) <= 0) {
    error = true;
    errorsMessages.push(
      'Please enter a valid budget amount, budget amount should be greater than zero.'
    );
  }
  return { error, errorsMessages };
};

const createExpenseValidation = ({ budget, title, amount }) => {
  let error;
  let errorsMessages = [];
  // Validate the fields
  if (!budget || !title || !amount) {
    error = true;
    errorsMessages.push('Please fill all the fields.');
  }
  if (!validator.isLength(title, { min: 3, max: 50 })) {
    error = true;
    errorsMessages.push(
      'Please enter a valid expense title, expense title should be equal or greater than 3 characters, and equal or less than 50 characters.'
    );
  }
  if (!validateMongodbID(budget)) {
    error = true;
    errorsMessages.push('Please enter a valid budget ID.');
  }
  if (Number(amount) <= 0) {
    error = true;
    errorsMessages.push(
      'Please enter a valid expense amount, expense amount should be greater than zero.'
    );
  }
  return { error, errorsMessages };
};

const validateMongodbID = (id) => {
  return validator.isMongoId(id);
};
module.exports = {
  registerValidation,
  loginValidation,
  createBudgetValidation,
  createExpenseValidation,
  validateMongodbID,
};
