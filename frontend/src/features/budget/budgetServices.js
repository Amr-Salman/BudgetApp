const BASE_URL = 'http://localhost:5000/api/v1/budget/';

// Get all user budgets
const getBudgets = async () => {
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

// Get single budget
const getBudget = async (budgetID) => {
  const res = await fetch(BASE_URL + budgetID, {
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

// Create a new budget
const createBudget = async (budgetData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(budgetData),
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

// Delete budget
const deleteBudget = async (budgetID) => {
  const res = await fetch(BASE_URL + budgetID, {
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

// Update budget
const updateBudget = async (budgetData) => {
  const res = await fetch(BASE_URL + budgetData._id, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify(budgetData),
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

export default {
  getBudgets,
  getBudget,
  createBudget,
  deleteBudget,
  updateBudget,
};
