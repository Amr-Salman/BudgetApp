const asyncHandler = require('express-async-handler');
const Budget = require('../models/budgetModel');
const Expense = require('../models/expenseModel');
const { createBudgetValidation } = require('../utils/validation');

// @Desc    Get all the budgets
// @route   GET api/budget
// @Access  Private
const getAllBudgets = asyncHandler(async (req, res) => {
  const budgets = await Budget.find({ user: req.user._id });
  res.status(200);
  res.json({ payload: budgets, message: '' });
});

// @Desc    Get specific the budgets
// @route   GET api/budget/:id
// @Access  Private
const getBudget = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const budget = await Budget.findById(id);
  // Check if budget exists and the user is the owner
  if (budget && budget.user.toString() === req.user._id.toString()) {
    const expenses = await Expense.find({ budget: budget._id });
    res.status(200);
    res.json({ payload: { budget, expenses }, message: '' });
  } else {
    res.status(404);
    res.json({ message: `Budget with id: ${id} does not exist.` });
  }
});

// @Desc    Create a new budget
// @route   POST api/budget
// @Access  Private
const createBudget = asyncHandler(async (req, res) => {
  const { title, amount, color } = req.body;

  // Validate the fields
  const { error, errorsMessages } = createBudgetValidation({
    title,
    amount,
    color,
  });
  if (error) {
    throw { message: errorsMessages };
  }
  const budget = await Budget.create({
    user: req.user._id,
    title: title,
    amount: amount,
    color: color,
  });
  res.status(201);
  res.json({
    message: `${budget.title} budget created successfully.`,
    payload: budget,
  });
});

// @Desc    Update a budget
// @route   PATCH api/budget/:id
// @Access  Private
const updateBudget = asyncHandler(async (req, res) => {
  const { id } = req.params;
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
      message: `${budget.title} budget updated successfully.`,
      payload: budget,
    });
  } else {
    res.status(404);
    res.json({
      message: `Budget with id: ${id} does not exist.`,
    });
  }
});

// @Desc    Delete a budget
// @route   DELETE api/budget/:id
// @Access  Private
const deleteBudget = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const budget = await Budget.findById(id);

  // Check if the budget exist or not and if the user is the owner
  if (budget && budget.user.toString() === req.user._id.toString()) {
    const budget = await Budget.findByIdAndDelete(id);
    const expenses = await Expense.deleteMany({ budget: id });
    res.status(200);
    res.json({
      message: `${budget.title} budget deleted successfully.`,
      payload: budget,
    });
  } else {
    res.status(404);
    res.json({
      message: `Budget with id: ${id} does not exist.`,
    });
  }
});

module.exports = {
  getAllBudgets,
  getBudget,
  createBudget,
  deleteBudget,
  updateBudget,
};
