import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './index.css';
import { UserAuthContextProvider } from 'context/UserAuthContext';
import ProtectedRoute from 'helpers/ProtectedRoute';

import _Homepage from 'pages/Homepage';
import Authpage from 'pages/Authpage';
import Homepage from 'pages/Homepage';

const firebaseConfig = {
  apiKey: 'AIzaSyCnUY41gfqoldcT2dov7dryeuX-nI5CcUU',
  authDomain: 'candidate-app-4cbf7.firebaseapp.com',
  databaseURL:
    'https://candidate-app-4cbf7-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'candidate-app-4cbf7',
  storageBucket: 'candidate-app-4cbf7.appspot.com',
  messagingSenderId: '390865329830',
  appId: '1:390865329830:web:6c5bc9f60c236f324b5e67',
  measurementId: 'G-2E9XY1KHH7'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

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
