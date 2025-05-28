// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyAt14Z4vSyAS5kQ8KlVGIYp7AM1HdGGpNQ",
  authDomain: "multivendor-d3341.firebaseapp.com",
  projectId: "multivendor-d3341",
  storageBucket: "multivendor-d3341.firebasestorage.app",
  messagingSenderId: "510916677135",
  appId: "1:510916677135:web:aeead9030eac3705a3dd7a",
  measurementId: "G-EH8W6LT3PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add these scopes for better user data
googleProvider.addScope('profile');
googleProvider.addScope('email');

export { auth, googleProvider };
export default app;