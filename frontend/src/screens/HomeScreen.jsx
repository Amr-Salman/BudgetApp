import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets, resetBudgets } from '../features/budget/budgetSlice';
import { Badge, Container, Grid, Typography } from '@mui/material';
import NewBudgetForm from '../components/NewBudgetForm';
import NewExpenseForm from '../components/NewExpenseForm';
import { getExpenses, resetExpenses } from '../features/expense/expenseSlice';
import BudgetsList from '../components/BudgetsList';
import ExpensesTable from '../components/ExpensesTable';

function HomeScreen() {
  const { budgets } = useSelector((state) => state.budgets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getExpenses());
    return () => {
      dispatch(resetBudgets());
      dispatch(resetExpenses());
    };
  }, [dispatch]);

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12} md={6}>
          <NewBudgetForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <NewExpenseForm budgets={budgets} />
        </Grid>
      </Grid>
      <Typography variant="h5" component="h1" sx={{ my: 4 }}>
        <Badge badgeContent={budgets?.length || 0} color="primary">
          Budgets
        </Badge>
      </Typography>
      <BudgetsList />
      <ExpensesTable />
    </Container>
  );
}

export default HomeScreen;
