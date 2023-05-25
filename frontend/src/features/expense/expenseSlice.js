import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expenseServices from './expenseServices';

// Get all user expenses
export const getExpenses = createAsyncThunk(
  'expense/getExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const res = await expenseServices.getExpenses();
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create new expense
export const createExpense = createAsyncThunk(
  'expense/createExpense',
  async (expenseData, { rejectWithValue }) => {
    try {
      const res = await expenseServices.createExpense(expenseData);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create new expense
export const deleteExpense = createAsyncThunk(
  'expense/deleteExpense',
  async (budgetID, { rejectWithValue }) => {
    try {
      const res = await expenseServices.deleteExpense(budgetID);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  expenses: [],
  isError: false,
  isLoading: false,
  message: '',
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    resetExpenses: (state) => {
      state.expenses = [];
      state.isError = false;
      state.isLoading = false;
      state.message = '';
    },
    filterExpenses: (state, action) => {
      state.expenses = state.expenses.filter(
        (exp) => exp._id.toString() !== action.payload.toString()
      );
      state.isError = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = action.payload.payload;
        state.message = action.payload.message;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses.push(action.payload.payload);
        state.message = action.payload.message;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.expenses = state.expenses.filter(
          (exp) => exp._id.toString() !== action.payload.payload._id.toString()
        );
        state.message = action.payload.message;
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setExpenses, resetExpenses, filterExpenses } =
  expenseSlice.actions;
export default expenseSlice.reducer;
