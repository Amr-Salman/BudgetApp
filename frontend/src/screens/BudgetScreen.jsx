import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBudget, resetBudgets } from '../features/budget/budgetSlice';
import { toast } from 'react-toastify';
import BudgetItem from '../components/BudgetItem';
import NewExpenseForm from '../components/NewExpenseForm';
import { Container, Grid } from '@mui/material';
import { resetExpenses, setExpenses } from '../features/expense/expenseSlice';
import ExpensesTable from '../components/ExpensesTable';

const BudgetScreen = () => {
  const { budgetID } = useParams();
  const { budget } = useSelector((state) => state.budgets);
  const { expenses } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetching the budget
  useEffect(() => {
    dispatch(getBudget(budgetID))
      .unwrap()
      .then((res) => {
        dispatch(setExpenses(res.payload.expenses));
      })
      .catch((err) => {
        navigate('/');
        toast.error(err.message);
      });
    return () => {
      dispatch(resetBudgets());
      dispatch(resetExpenses());
    };
  }, [dispatch, budgetID, navigate]);

  return (
    budget && (
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <BudgetItem
              budget={budget}
              expenses={expenses}
              isBudgetScreen={true}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <NewExpenseForm budgets={[budget]} />
          </Grid>
        </Grid>
        <ExpensesTable isBudgetScreen={true} />
      </Container>
    )
  );
};

export default BudgetScreen;
