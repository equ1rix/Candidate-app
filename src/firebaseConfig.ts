import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCnUY41gfqoldcT2dov7dryeuX-nI5CcUU',
  authDomain: 'candidate-app-4cbf7.firebaseapp.com',
  projectId: 'candidate-app-4cbf7',
  storageBucket: 'candidate-app-4cbf7.appspot.com',
  messagingSenderId: '390865329830',
  appId: '1:390865329830:web:6c5bc9f60c236f324b5e67',
  measurementId: 'G-2E9XY1KHH7'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
