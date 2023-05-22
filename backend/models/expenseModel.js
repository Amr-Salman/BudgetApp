const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please add a budget'],
      ref: 'Budget',
    },
    title: {
      type: String,
      required: [true, 'Please add a expense title.'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add a expense amount.'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);
