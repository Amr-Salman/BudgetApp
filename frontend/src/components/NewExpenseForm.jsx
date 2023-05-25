import {
  Card,
  CardContent,
  TextField,
  Button,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createExpense } from '../features/expense/expenseSlice';
import { toast } from 'react-toastify';

const NewExpenseForm = ({ budgets }) => {
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    budget: '',
  });
  const dispatch = useDispatch();

  // Handle change expense value
  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };
  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createExpense({
        ...expense,
      })
    )
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        setExpense({
          title: '',
          amount: '',
          budget: '',
        });
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    budgets?.length > 0 && (
      <Card>
        <CardHeader title="Create new expense" />
        <CardContent component="form" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 0, md: 2 },
            }}
          >
            <TextField
              name="title"
              label="Title"
              type="text"
              value={expense.title}
              onChange={handleChange}
              sx={{ mb: 2, flexGrow: 1 }}
            />
            <TextField
              name="amount"
              label="Amount"
              type="number"
              value={expense.amount}
              onChange={handleChange}
              sx={{ mb: 2, flexGrow: 1 }}
            />
          </Box>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="budget-label">Budget</InputLabel>
            <Select
              labelId="budget-label"
              id="budget"
              name="budget"
              defaultValue=""
              value={expense.budget}
              label="Budget"
              onChange={handleChange}
            >
              {budgets?.map((budget) => (
                <MenuItem value={budget._id} key={budget._id}>
                  {budget.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" sx={{ display: 'block' }}>
            Submit
          </Button>
        </CardContent>
      </Card>
    )
  );
};

export default NewExpenseForm;
