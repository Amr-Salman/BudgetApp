const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a budget title.'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add a budget amount.'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Budget', budgetSchema);
