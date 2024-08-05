import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import 'tailwindcss/tailwind.css';

import theme from 'helpers/theme';
import { UserAuthContextProvider } from 'context/UserAuthContext';
import { ModalContextProvider } from 'context/ModalTaskContext';
import ProtectedRoute from 'helpers/ProtectedRoute';

import Homepage from 'pages/Homepage';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ModalContextProvider>
              <UserAuthContextProvider>
                <Routes>
                  <Route path="/" element={<Navigate to="/signup" />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
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
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
