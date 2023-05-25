import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Badge, Button, TableHead, Typography } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteExpense } from '../features/expense/expenseSlice';
import { toast } from 'react-toastify';
import DeleteModal from './DeleteModal';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ExpensesTable({ isBudgetScreen = false }) {
  const { expenses } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedModal, setSelectedModal] = React.useState('');

  // Handle open specific targeted modal
  const handleOpenModal = (expID) => {
    setIsModalOpen(true);
    setSelectedModal(expID);
  };
  // Handle close specific targeted modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedModal('');
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expenses.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle delete expense
  const handleDelete = (expenseID) => {
    dispatch(deleteExpense(expenseID))
      .unwrap()
      .then((res) => toast.success(res.message))
      .catch((err) => toast.error(err.message));
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" component="h1" sx={{ my: 4 }}>
        <Badge badgeContent={expenses?.length || 0} color="primary">
          Expenses
        </Badge>
      </Typography>

      {expenses?.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Expense title</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Amount</TableCell>
                {!isBudgetScreen && (
                  <TableCell align="center">Budget</TableCell>
                )}
                {isBudgetScreen && (
                  <TableCell align="center">Actions</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? expenses.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : expenses
              ).map((exp) => (
                <TableRow key={exp._id}>
                  <TableCell component="th" scope="row">
                    {exp.title}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    {moment(exp.createdAt).format('hh:mm A')}
                    <br />
                    {moment(exp.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="center">
                    ${exp.amount}
                  </TableCell>
                  {!isBudgetScreen && (
                    <TableCell style={{ width: 160 }} align="center">
                      <Button
                        component={Link}
                        to={`/budget/${exp.budget._id}`}
                        variant="outlined"
                        size="small"
                        sx={{ mt: 1 }}
                      >
                        {exp.budget.title}
                      </Button>
                    </TableCell>
                  )}
                  {isBudgetScreen && (
                    <TableCell style={{ width: 160 }} align="center">
                      <IconButton
                        color="error"
                        aria-label="delete"
                        onClick={() => handleOpenModal(exp._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <DeleteModal
                        isModalOpen={isModalOpen}
                        handleDelete={handleDelete}
                        handleCloseModal={handleCloseModal}
                        item={exp}
                        selectedModal={selectedModal}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={expenses.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
      {expenses?.length === 0 && (
        <Typography sx={{ textAlign: 'center' }}>
          There is no expenses yet.
        </Typography>
      )}
    </Box>
  );
}
