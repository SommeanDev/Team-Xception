import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBkxr45nnpNvZkjAk_Vo5JguyrFNOPOvPI",
    authDomain: "study-group-app-71cd9.firebaseapp.com",
    projectId: "study-group-app-71cd9",
    storageBucket: "study-group-app-71cd9.firebasestorage.app",
    messagingSenderId: "60154233127",
    appId: "1:60154233127:web:ab6f9c59e2601f18642902",
    measurementId: "G-WV1D5TC831"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);