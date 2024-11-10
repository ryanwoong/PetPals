// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA2gw3P50Tl9AYFfbHuTI6herPo4W4W_Es",
  authDomain: "pet-pals-f8fd1.firebaseapp.com",
  projectId: "pet-pals-f8fd1",
  storageBucket: "pet-pals-f8fd1.firebasestorage.app",
  messagingSenderId: "63211036286",
  appId: "1:63211036286:web:8dc5bcb7cc430fb5b0022f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
