import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import moment from 'moment';
import PrograssBar from './PrograssBar';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteBudget } from '../features/budget/budgetSlice';
import { filterExpenses } from '../features/expense/expenseSlice';

const BudgetItem = ({ budget, expenses, isBudgetScreen = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState('');

  // Filter the budget expenses
  const budgetExpenses = expenses?.filter(
    (exp) => exp.budget._id === budget._id
  );

  // Calculate the Total budget expenses
  const totlaExpenses = budgetExpenses?.reduce(
    (total, exp) => total + Number(exp.amount),
    0
  );
  // Calculate the reminder
  const reminderValue =
    budget.amount > totlaExpenses ? budget.amount - totlaExpenses : 0;

  // Calculate the prograss bar value
  const prograssBarValue =
    budget.amount > totlaExpenses ? (totlaExpenses / budget.amount) * 100 : 100;

  // Handle open specific targeted modal
  const handleOpenModal = (budgetID) => {
    setIsModalOpen(true);
    setSelectedModal(budgetID);
  };

  // Handle close specific targeted modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedModal('');
  };

  // Handle delete expense
  const handleDelete = (budgetID) => {
    dispatch(deleteBudget(budgetID))
      .unwrap()
      .then((res) => {
        navigate('/');
        dispatch(filterExpenses(res.payload._id));
        toast.success(res.message);
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    budget && (
      <Card>
        <CardHeader
          title={<Typography variant="h6">{budget.title}</Typography>}
          subheader={moment(budget.createdAt).format('DD/MM/YYYY')}
          action={
            isBudgetScreen && (
              <>
                <IconButton
                  aria-label="edit"
                  color="success"
                  component={Link}
                  to={`/budget/${budget._id}/edit`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleOpenModal(budget._id)}
                >
                  <DeleteIcon />
                </IconButton>
                <DeleteModal
                  isModalOpen={isModalOpen}
                  handleDelete={handleDelete}
                  handleCloseModal={handleCloseModal}
                  item={budget}
                  selectedModal={selectedModal}
                />
              </>
            )
          }
        />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Expenses: {totlaExpenses}</Typography>
            <Typography>Amount: {budget.amount}</Typography>
          </Box>
          <PrograssBar value={prograssBarValue} />
          <Typography sx={{ mt: 2 }}>Reminder: {reminderValue}</Typography>
          {!isBudgetScreen && (
            <Button
              component={Link}
              to={`/budget/${budget._id}`}
              variant="outlined"
            >
              View
            </Button>
          )}
        </CardContent>
      </Card>
    )
  );
};

export default BudgetItem;
