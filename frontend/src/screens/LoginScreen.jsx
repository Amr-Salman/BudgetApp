import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData))
      .unwrap()
      .then(() => {
        toast.success('Logged In Successfully.');
        navigate('/');
      })
      .catch((err) => toast.error(err));
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 7,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <Container component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          New user? <Link to="/register">Register</Link>
        </Typography>
      </Container>
    </Container>
  );
};

export default LoginScreen;
