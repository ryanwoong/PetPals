// src/config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyA2gw3P50Tl9AYFfbHuTI6herPo4W4W_Es",
    authDomain: "pet-pals-f8fd1.firebaseapp.com",
    projectId: "pet-pals-f8fd1",
    storageBucket: "pet-pals-f8fd1.firebasestorage.app",
    messagingSenderId: "63211036286",
    appId: "1:63211036286:web:8dc5bcb7cc430fb5b0022f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
export const auth = getAuth(app);

export default app;