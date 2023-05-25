import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import budgetReducer from '../features/budget/budgetSlice';
import expenseReducer from '../features/expense/expenseSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    budgets: budgetReducer,
    expenses: expenseReducer,
  },
});

export default store;
