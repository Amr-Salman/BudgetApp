const BASE_URL = 'http://localhost:5000/api/v1/expense/';

// Get all user expense
const getExpenses = async () => {
  const res = await fetch(BASE_URL, {
    method: 'GET',
    credentials: 'include',
  });
  const result = await res.json();
  if (res.ok) {
    return result;
  } else {
    throw result;
  }
};

// Create a new expense
const createExpense = async (expenseData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(expenseData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  if (res.ok) {
    return result;
  } else {
    throw result;
  }
};

// Create a new expense
const deleteExpense = async (expensesID) => {
  const res = await fetch(BASE_URL + expensesID, {
    method: 'DELETE',
    credentials: 'include',
  });
  const result = await res.json();
  if (res.ok) {
    return result;
  } else {
    throw result;
  }
};

export default {
  getExpenses,
  createExpense,
  deleteExpense,
};
