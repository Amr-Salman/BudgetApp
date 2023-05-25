import {
  Card,
  CardContent,
  TextField,
  Button,
  CardHeader,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBudget } from '../features/budget/budgetSlice';
import { toast } from 'react-toastify';

const NewBudgetForm = () => {
  const [budget, setBudget] = useState({
    title: '',
    amount: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBudget(budget))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setBudget({
          title: '',
          amount: '',
        });
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <Card>
      <CardHeader title="Create new budget" />
      <CardContent component="form" onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Title"
          fullWidth
          type="text"
          value={budget.title}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="amount"
          label="Amount"
          fullWidth
          type="number"
          InputProps={{
            inputProps: {
              min: 0,
            },
          }}
          value={budget.amount}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewBudgetForm;
