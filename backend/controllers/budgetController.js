const asyncHandler = require('express-async-handler');
const Budget = require('../models/budgetModel');
const Expense = require('../models/expenseModel');
const {
  createBudgetValidation,
  validateMongodbID,
} = require('../utils/validation');

// @Desc    Get all the budgets
// @route   GET api/v1/budget
// @Access  Private
const getAllBudgets = asyncHandler(async (req, res) => {
  const budgets = await Budget.find({ user: req.user._id });
  res.status(200);
  res.json({ payload: budgets, message: 'All budgets got successfully.' });
});

// @Desc    Get specific the budgets
// @route   GET api/v1/budget/:id
// @Access  Private
const getBudget = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Validate the mongo ID
  if (!validateMongodbID(id)) {
    res.status(400);
    throw new Error('Please enter a valid ID.');
  }
  const budget = await Budget.findById(id);
  // Check if budget exists and the user is the owner
  if (budget && budget.user.toString() === req.user._id.toString()) {
    const expenses = await Expense.find({ budget: budget._id }).populate(
      'budget'
    );
    res.status(200);
    res.json({
      payload: { ...budget._doc, expenses },
      message: `'${budget.title}' got successfully.`,
    });
  } else {
    throw new Error(`Budget with id: ${id} does not exist.`);
  }
});

// @Desc    Create a new budget
// @route   POST api/v1/budget
// @Access  Private
const createBudget = asyncHandler(async (req, res) => {
  const { title, amount } = req.body;
  // Validate the fields
  const { error, message } = createBudgetValidation({
    title,
    amount,
  });
  if (error) {
    throw new Error(message);
  }
  const budget = await Budget.create({
    user: req.user._id,
    title: title,
    amount: amount,
  });
  res.status(201);
  res.json({
    message: `'${budget.title}' budget created successfully.`,
    payload: budget,
  });
});

// @Desc    Update a budget
// @route   PATCH api/v1/budget/:id
// @Access  Private
const updateBudget = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // Validate the mongo ID
  if (!validateMongodbID(id)) {
    res.status(400);
    throw new Error('Please enter a valid ID.');
  }
  const budget = await Budget.findById(id);

  // Check if the budget exist or not and if the user is the owner
  if (budget && budget.user.toString() === req.user._id.toString()) {
    const budget = await Budget.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200);
    res.json({
      message: `'${budget.title}' budget updated successfully.`,
      payload: budget,
    });
  } else {
    res.status(404);
    throw new Error(`Budget with id: ${id} does not exist.`);
  }
});

// @Desc    Delete a budget
// @route   DELETE api/v1/budget/:id
// @Access  Private
const deleteBudget = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate the mongo ID
  if (!validateMongodbID(id)) {
    res.status(400);
    throw new Error('Please enter a valid ID.');
  }
  const budget = await Budget.findById(id);

  // Check if the budget exist or not and if the user is the owner
  if (budget && budget.user.toString() === req.user._id.toString()) {
    const budget = await Budget.findByIdAndDelete(id);
    const expenses = await Expense.deleteMany({ budget: id });
    res.status(200);
    res.json({
      message: `'${budget.title}' budget deleted successfully.`,
      payload: budget,
    });
  } else {
    res.status(404);
    throw new Error(`Budget with id: ${id} does not exist.`);
  }
});

module.exports = {
  getAllBudgets,
  getBudget,
  createBudget,
  deleteBudget,
  updateBudget,
};
