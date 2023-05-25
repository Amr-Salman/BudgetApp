const validator = require('validator');

const registerValidation = ({ email, username, password, confirmPassword }) => {
  let error = false;
  let message = '';

  // Validate Email
  if (!validator.isEmail(email)) {
    error = true;
    message = 'Please enter a valid email.';
    return { error, message };
  }

  // Validate Username
  if (!validator.isLength(username, { min: 3, max: 30 })) {
    error = true;
    message =
      'Username should be equal or greater than 3 charachters, and equal or less than 30 charachters.';
    return { error, message };
  }

  // Validate Password
  if (!validator.isStrongPassword(password)) {
    error = true;
    message =
      'Please enter a strong password, strong password contains at least 8 characters, 1 lowsercase, 1 uppercase, 1 number, 1 symbol.';
    return { error, message };
  }

  // Validate Password with ConfirmPassword
  if (password !== confirmPassword) {
    error = true;
    message = "Password and Confirm password doesn't match.";
    return { error, message };
  }
  return { error, message };
};

const loginValidation = ({ email, password }) => {
  let error = false;
  let message = '';

  // Validate Email
  if (!validator.isEmail(email)) {
    error = true;
    message = 'Please enter a valid email.';
    return { error, message };
  }

  // Validate Password
  if (!validator.isStrongPassword(password)) {
    error = true;
    message =
      'Please enter a strong password, strong password contains at least 8 characters, 1 lowsercase, 1 uppercase, 1 number, 1 symbol.';
    return { error, message };
  }
  return { error, message };
};

const createBudgetValidation = ({ title, amount }) => {
  let error = false;
  let message = '';
  // Validate the fields
  if (!title || !amount) {
    error = true;
    message = 'Please fill all the fields.';
    return { error, message };
  }
  if (!validator.isLength(title, { min: 3, max: 50 })) {
    error = true;
    message =
      'Please enter a valid budget title, budget title should be equal or greater than 3 characters, and equal or less than 50 characters.';

    return { error, message };
  }
  if (Number(amount) <= 0) {
    error = true;
    message =
      'Please enter a valid budget amount, budget amount should be greater than zero.';
    return { error, message };
  }
  return { error, message };
};

const createExpenseValidation = ({ budget, title, amount }) => {
  let error = false;
  let message = '';
  // Validate the fields
  if (!budget || !title || !amount) {
    error = true;
    message = 'Please fill all the fields.';
    return { error, message };
  }
  if (!validator.isLength(title, { min: 3, max: 50 })) {
    error = true;
    message =
      'Please enter a valid expense title, expense title should be equal or greater than 3 characters, and equal or less than 50 characters.';
    return { error, message };
  }
  if (!validateMongodbID(budget)) {
    error = true;
    message = 'Please enter a valid budget ID.';
    return { error, message };
  }
  if (Number(amount) <= 0) {
    error = true;
    message =
      'Please enter a valid expense amount, expense amount should be greater than zero.';
    return { error, message };
  }
  return { error, message };
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
