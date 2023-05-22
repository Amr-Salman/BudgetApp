const asyncHandler = require('express-async-handler');
const Expense = require('../models/expenseModel');
const Budget = require('../models/budgetModel');
const {
  createExpenseValidation,
  validateMongodbID,
} = require('../utils/validation');

// @Desc    Get all expenses
// @route   GET api/expense/
// @Access  Private
const getAllExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }).populate(
    'budget'
  );
  res.json({ payload: expenses, message: '' });
});

// @Desc    Get all expenses
// @route   GET api/expense/
// @Access  Private
const getAllBudgetExpenses = asyncHandler(async (req, res) => {
  const { budgetID } = req.params;
  const expenses = await Expense.find({
    user: req.user._id,
    budget: budgetID,
  }).populate('budget');
  res.json({ payload: expenses, message: '' });
});

// @Desc    Create a new expense
// @route   POST api/expense
// @Access  Private
const createExpense = asyncHandler(async (req, res) => {
  const { budget, title, amount } = req.body;

  // Validate the fields
  const { error, errorsMessages } = createExpenseValidation({
    budget,
    title,
    amount,
  });

  // Validate the fields
  if (error) {
    res.status(400);
    throw { message: errorsMessages };
  }

  // Check if the budget exists and the user is the owner
  const budgetExists = await Budget.findById(budget);
  if (
    budgetExists &&
    budgetExists.user.toString() === req.user._id.toString()
  ) {
    const expense = await Expense.create({
      budget,
      title,
      amount,
      user: req.user._id,
    });
    res.status(201);
    res.json({
      message: `${expense.title} expense created successfully`,
      payload: {
        ...expense._doc,
        budget: budgetExists,
      },
    });
  } else {
    throw new Error('Budget does not exists.');
  }
});

// @Desc    Update specific expense
// @route   PATCH api/expense/:id
// @Access  Private
const updateExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!validateMongodbID(id)) {
    throw new Error('Please enter valid expense ID.');
  }
  const expense = await Expense.findById(id);

  // Check if the expense exists and the user is the owner
  if (expense && expense.user.toString() === req.user.id.toString()) {
    const expense = await Expense.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200);
    res.json({
      message: `${expense.title} expense updated successfully`,
      payload: expense,
    });
  } else {
    res.status(404);
    res.json({
      message: `Expense with ID: ${id} doesn't exist.`,
    });
  }
});

// @Desc    Delete specific expense
// @route   DELETE api/expense/:id
// @Access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate the ID
  if (!validateMongodbID(id)) {
    throw new Error('Please enter a valid expense ID.');
  }
  const expense = await Expense.findById(id);

  // Check if the expense exists and the user is the owner
  if (expense && expense.user.toString() === req.user._id.toString()) {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    res.status(200);
    res.json({
      message: `${deletedExpense.title} expense deleted successfully`,
      payload: deletedExpense,
    });
  } else {
    res.status(404);
    res.json({
      message: `Expense with ID: ${id} doesn't exist.`,
    });
  }
});

module.exports = {
  getAllExpenses,
  getAllBudgetExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
};
