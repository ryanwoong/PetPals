// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebaseConfig"; // Import Firebase auth configuration
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";

// Create context for authentication
const AuthContext = createContext({});

const API_URL = "http://localhost:5100"; // Base URL for API requests

// Provider component wrapping the application with authentication context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to hold the authenticated user
    const [loading, setLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        // Firebase listener to check user authentication status on app load
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user); // Set user if logged in, null if not
            setLoading(false); // Set loading to false once auth status is checked
        });
        return unsubscribe; // Clean up the listener on unmount
    }, []);

    // Function to handle user login with email and password
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential.user; // Return user information on successful login
        } catch (error) {
            throw error; // Pass error to the caller for handling
        }
    };

    // Function to handle user registration with email and password
    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid; // Get the unique user ID

            // Send additional user data to backend API for database storage
            const response = await axios.post(`${API_URL}/register`, {
                username: " ", // Placeholder username
                coins: 5, // Initial coins for new user
                email: email,
                level: 1, // Starting level for new user
                uid: uid, // Firebase user ID
                xp: 0 // Initial experience points for new user
            });

            return userCredential.user; // Return user data on successful registration
        } catch (error) {
            throw error; // Pass error to the caller for handling
        }
    };

    // Function to handle user logout
    const logout = () => {
        return signOut(auth); // Sign out the user from Firebase authentication
    };

    // Provide context values to children components
    return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
};

// Custom hook for using auth context values in components
export const useAuth = () => {
    return useContext(AuthContext);
};

// Named exports
export { AuthContext };
