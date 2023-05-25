import React from 'react';
import ReactDOM from 'react-dom/client';
import HomeScreen from './screens/HomeScreen';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './app/store.js';
import { Provider } from 'react-redux';
import ProtectRoutes from './components/ProtectRoutes.jsx';
import RootLayout from './layouts/RootLayout.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import BudgetScreen from './screens/BudgetScreen.jsx';

import './index.css';
import RegisterScreen from './screens/RegisterScreen.jsx';
import BudgetEditScreen from './screens/BudgetEditScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectRoutes>
            <HomeScreen />
          </ProtectRoutes>
        ),
      },
      {
        path: 'login',
        element: <LoginScreen />,
      },
      {
        path: 'budget/:budgetID',
        element: (
          <ProtectRoutes>
            <BudgetScreen />
          </ProtectRoutes>
        ),
      },
      {
        path: 'budget/:budgetID/edit',
        element: (
          <ProtectRoutes>
            <BudgetEditScreen />
          </ProtectRoutes>
        ),
      },
      {
        path: 'register',
        element: <RegisterScreen />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
