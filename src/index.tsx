import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import reportWebVitals from './reportWebVitals';

import App from './App';

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
