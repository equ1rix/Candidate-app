import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './index.css';
import 'tailwindcss/tailwind.css';

import theme from 'helpers/theme';
import { UserAuthContextProvider } from 'context/UserAuthContext';
import { ModalContextProvider } from 'context/ModalTaskContext';
import ProtectedRoute from 'helpers/ProtectedRoute';

import Homepage from 'pages/Homepage';
import SingIn from 'pages/SingIn';
import SingUp from 'pages/SingUp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ModalContextProvider>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/singup" />} />
              <Route path="/singin" element={<SingIn />} />
              <Route path="/singup" element={<SingUp />} />
              <Route
                path="/homepage"
                element={
                  <ProtectedRoute>
                    <Homepage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </UserAuthContextProvider>
        </ModalContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
