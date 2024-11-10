// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "./firebaseConfig"; // Update the import path as needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";

// Create context
const AuthContext = createContext({});

const API_URL = "http://localhost:5100";

// Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            
            return userCredential.user;
        } catch (error) {
            throw error;
        }
    };

    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;


            const response = await axios.post(`${API_URL}/register`, {
                username: " ",
                coins: 5,
                email: email,
                level: 1,
                uid: uid,
                xp: 0
            });


            return userCredential.user;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        return signOut(auth);
    };

    return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Named exports
export { AuthContext };
