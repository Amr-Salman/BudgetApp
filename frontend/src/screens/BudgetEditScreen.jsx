import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getBudget,
  resetBudget,
  updateBudget,
} from '../features/budget/budgetSlice';
import { toast } from 'react-toastify';

const BudgetEditScreen = () => {
  const { budgetID } = useParams();
  const [budgetData, setBudgetData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch budget
  useEffect(() => {
    dispatch(getBudget(budgetID))
      .unwrap()
      .then((res) => setBudgetData(res.payload))
      .catch((err) => {
        toast.error(err.message);
        navigate('/');
      });

    return () => {
      dispatch(resetBudget());
    };
  }, [dispatch, budgetID, navigate]);

  // Handle change
  const handleChange = (e) => {
    setBudgetData({
      ...budgetData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle update budget
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updateBudget(budgetData))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate('/budget/' + budgetID);
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    budgetData && (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 7,
        }}
      >
        <Card>
          <CardHeader title={`Updated '${budgetData.title}' budget`} />
          <CardContent component="form" onSubmit={handleEdit}>
            <TextField
              type="text"
              name="title"
              fullWidth
              value={budgetData.title}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              type="number"
              name="amount"
              fullWidth
              value={budgetData.amount}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained">
              Edit
            </Button>
          </CardContent>
        </Card>
      </Box>
    )
  );
};

export default BudgetEditScreen;
