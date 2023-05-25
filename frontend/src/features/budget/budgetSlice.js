import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import budgetServices from './budgetServices';

// Get all user budgets
export const getBudgets = createAsyncThunk(
  'budget/getBudgets',
  async (_, { rejectWithValue }) => {
    try {
      const res = await budgetServices.getBudgets();
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get single budget
export const getBudget = createAsyncThunk(
  'budget/getBudget',
  async (budgetID, { rejectWithValue }) => {
    try {
      const res = await budgetServices.getBudget(budgetID);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create new budget
export const createBudget = createAsyncThunk(
  'budget/createBudget',
  async (budgetData, { rejectWithValue }) => {
    try {
      const res = await budgetServices.createBudget(budgetData);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete budget
export const deleteBudget = createAsyncThunk(
  'budget/deleteBudget',
  async (budgetID, { rejectWithValue }) => {
    try {
      const res = await budgetServices.deleteBudget(budgetID);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update budget
export const updateBudget = createAsyncThunk(
  'budget/updateBudget',
  async (budgetData, { rejectWithValue }) => {
    try {
      const res = await budgetServices.updateBudget(budgetData);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  budgets: [],
  budget: false,
  isError: false,
  message: '',
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    resetBudgets: (state) => {
      state.budgets = [];
      state.budget = false;
      state.isError = false;
      state.message = '';
    },
    resetBudget: (state) => {
      state.budget = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBudgets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBudgets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets = action.payload.payload;
        state.message = action.payload.message;
      })
      .addCase(getBudgets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets.push(action.payload.payload);
        state.message = action.payload.message;
      })
      .addCase(createBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budgets = state.budgets.filter(
          (budget) =>
            budget._id.toString() !== action.payload.payload._id.toString()
        );
        state.budget = false;
        state.message = action.payload.message;
      })
      .addCase(deleteBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budget = action.payload.payload;
        state.message = action.payload.message;
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBudget.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBudget.fulfilled, (state, action) => {
        state.isLoading = false;
        state.budget = action.payload.payload;
        state.message = action.payload.message;
      })
      .addCase(getBudget.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetBudgets, resetBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
