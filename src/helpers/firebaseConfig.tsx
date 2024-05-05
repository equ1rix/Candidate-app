import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.APP_FIREBASE_API_KEY,
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
export const provider = new GoogleAuthProvider();
