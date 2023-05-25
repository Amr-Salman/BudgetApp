import { Grid, Typography } from '@mui/material';
import BudgetItem from './BudgetItem';
import { useSelector } from 'react-redux';

const BudgetsList = () => {
  const { budgets } = useSelector((state) => state.budgets);
  const { expenses } = useSelector((state) => state.expenses);
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {budgets?.map((budget) => (
        <Grid item xs={12} md={6} key={budget._id}>
          <BudgetItem budget={budget} expenses={expenses} />
        </Grid>
      ))}
      {budgets?.length === 0 && (
        <Grid item xs={12}>
          <Typography sx={{ textAlign: 'center' }}>
            There is no budgets yet.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default BudgetsList;
