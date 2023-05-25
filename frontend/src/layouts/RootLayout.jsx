import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
      <ToastContainer />
    </>
  );
};

export default RootLayout;
