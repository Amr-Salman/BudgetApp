import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return user ? children : <Navigate to="/login" />;
};

export default ProtectRoutes;
