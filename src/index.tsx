import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './index.css';
import { UserAuthContextProvider } from 'context/UserAuthContext';
import ProtectedRoute from 'helpers/ProtectedRoute';

import _Homepage from 'pages/Homepage';
import Authpage from 'pages/Authpage';
import Homepage from 'pages/Homepage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Authpage />} />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserAuthContextProvider>
  </React.StrictMode>
);
