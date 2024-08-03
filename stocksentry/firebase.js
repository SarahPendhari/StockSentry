// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBnGC5GnZisIR6LEbNwWfw_LfzP4uxaLK4",
    authDomain: "stocksentry-c3868.firebaseapp.com",
    projectId: "stocksentry-c3868",
    storageBucket: "stocksentry-c3868.appspot.com",
    messagingSenderId: "730095808356",
    appId: "1:730095808356:web:126e2a5d3cbe68fe79d471",
    measurementId: "G-6QWDCR9PTJ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
