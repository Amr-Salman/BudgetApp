import { Button, Container, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    dispatch(register(formData))
      .unwrap()
      .then(() => {
        toast.success('Registered Successfully.');
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
        Register
      </Typography>
      <Container component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
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
        <TextField
          label="Confirm Password"
          fullWidth
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Register
        </Button>
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Container>
    </Container>
  );
};

export default RegisterScreen;
