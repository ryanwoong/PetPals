import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNavBar from "../components/AuthNavBar";
import { auth, googleProvider } from "../firebase";
import { useAuth } from "../util/AuthContext"; // Import the auth context hook

// Component for authentication page
const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth(); // Get login and register functions from context
  const [method, setMethod] = useState("signIn"); // State to control whether the form is for login or registration
  const [error, setError] = useState(""); // State to store any error messages

  // Form state to capture user input
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Used only during registration
  });

  // Handler for updating form state when inputs change
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  // Toggle between login and registration modes
  const toggleMethod = () => {
    setMethod((prevMethod) => (prevMethod === "signIn" ? "signUp" : "signIn"));
    setError(""); // Clear error on toggle
  };

  // Handler for form submission (login or register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      if (method === "signIn") {
        // Attempt login using the context function
        await login(form.email, form.password);
        alert('Login successful!');
        navigate("/checkin", { replace: true });
      } else {
        // Ensure passwords match for registration
        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        // Attempt registration using the context function
        await register(form.email, form.password);
        alert('Registration successful!');
        navigate("/instructions", { replace: true });
      }
    } catch (err) {
      // Handle specific Firebase errors with more user-friendly messages
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password');
          break;
        default:
          setError(err.message);
      }
    }
  };

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Google Sign-In successful!');
      navigate("/home", { replace: true });
    } catch (err) {
      // Handle specific Firebase errors for Google sign-in
      switch (err.code) {
        case 'auth/popup-closed-by-user':
          setError('Sign-in popup was closed');
          break;
        case 'auth/popup-blocked':
          setError('Popup was blocked by the browser');
          break;
        default:
          setError('Failed to sign in with Google');
      }
    }
  };

  return (
    // Outer container for full background
    <Container fluid style={{ padding: 0, margin: 0, minHeight: '100vh', backgroundColor: '#FDF5E6' }}>
      
      {/* Main container for the authentication form */}
      <Container size={420} my={40} style={{ minHeight: '100vh', backgroundColor: '#FDF5E6' }}>
        
        {/* Navbar for toggling between login and register */}
        <AuthNavBar method={method} toggleMethod={toggleMethod} />

        {/* Page title indicating login or register */}
        <Title align="center" mb="sm" mt="md" style={{ fontFamily: 'Fuzzy Bubbles' }}>
          {method === "signIn" ? "Log In" : "Register"}
        </Title>

        {/* Form container with shadow and border */}
        <Paper withBorder shadow="md" p={30} radius="md" mt="lg">
          <form onSubmit={handleSubmit}>
            
            {/* Email input field */}
            <TextInput
              style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                color: '#000000',
              }}
              label="Email"
              placeholder="you@example.com"
              id="email"
              value={form.email}
              onChange={handleChange}
              mt="md"
              required
            />
            
            {/* Password input field */}
            <PasswordInput
              style={{
                fontSize: '1.5rem',
                marginBottom: '20px',
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                color: '#000000',
              }}
              label="Password"
              placeholder="Your password"
              id="password"
              value={form.password}
              onChange={handleChange}
              mt="md"
              required
            />

            {/* Confirm password field, visible only during registration */}
            {method === "signUp" && (
              <PasswordInput
                style={{
                  fontSize: '1.5rem',
                  marginBottom: '20px',
                  fontFamily: "'Fuzzy Bubbles', sans-serif",
                  color: '#000000',
                }}
                label="Confirm Password"
                placeholder="Confirm your password"
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                mt="md"
                required
              />
            )}

            {/* Display error message if there's an error */}
            {error && (
              <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            {/* Submit button for login or register */}
            <Button
              type="submit"
              fullWidth
              mt="xl"
              color="#FFCF9F"
              style={{
                fontSize: '1rem',
                marginBottom: '20px',
                fontFamily: "'Fuzzy Bubbles'",
              }}
            >
              {method === "signIn" ? "Log In" : "Register"}
            </Button>
          </form>

          {/* Google Sign-In button, displayed only in login mode */}
          {method === "signIn" && (
            <Button
              fullWidth
              mt="md"
              color="#FBA34B"
              onClick={handleGoogleSignIn}
              style={{
                fontSize: '1rem',
                fontFamily: "'Fuzzy Bubbles'",
              }}
            >
              Sign in with Google
            </Button>
          )}
        </Paper>
      </Container>
    </Container>
  );
};

export default AuthPage;
