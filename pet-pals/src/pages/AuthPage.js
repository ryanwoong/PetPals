import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
} from "@mantine/core";
import AuthNavBar from "../components/AuthNavBar";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthPage = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("signIn");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const toggleMethod = () => {
    setMethod((prevMethod) => (prevMethod === "signIn" ? "signUp" : "signIn"));
    setError(""); // Clear error on toggle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      if (method === "signIn") {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        alert('Login successful!');
        navigate("/pages/HomePage", { replace: true });
      } else {
        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        alert('Registration successful!');
        navigate("/pages/Instruction", { replace: true });
      }
    } catch (err) {
      setError(err.message); // Display Firebase error messages
    }
  };

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Google Sign-In successful!');
      navigate("/pages/HomePage", { replace: true });
    } catch (err) {
      setError(err.message); // Display error if Google sign-in fails
    }
  };

  return (
    <Container size={420} my={40}>
      <AuthNavBar method={method} toggleMethod={toggleMethod} />

      <Title align="center" mb="sm" style={{ fontFamily: "'Fuzzy Bubbles'" }}>
        {method === "signIn" ? "Log In" : "Register"}
      </Title>

      <Paper withBorder shadow="md" p={30} radius="md" mt="lg">
        <form onSubmit={handleSubmit}>
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
          {error && (
            <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}
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

        {/* Conditionally render Google Sign-In Button for Log In only */}
        {method === "signIn" && (
          <Button
            fullWidth
            mt="md"
            color="blue"
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
  );
};

export default AuthPage;
