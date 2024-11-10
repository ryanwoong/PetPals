import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthNavBar from "../components/AuthNavBar";
import { auth, googleProvider } from "../firebase";
import { useAuth } from "../util/AuthContext";

// Component for authentication page
const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [method, setMethod] = useState("signIn");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100%";
    document.body.style.backgroundColor = "#FDF5E6";

    return () => {
      document.documentElement.style.margin = "";
      document.documentElement.style.padding = "";
      document.documentElement.style.height = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.height = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  // Toggle between login and registration modes
  const toggleMethod = () => {
    setMethod((prevMethod) => (prevMethod === "signIn" ? "signUp" : "signIn"));
    setError("");
  };

  // Handler for form submission (login or register)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (method === "signIn") {
        await login(form.email, form.password);
        // navigate("/checkin", { replace: true });
      } else {
        // Ensure passwords match for registration
        if (form.password !== form.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        await register(form.email, form.password);
        navigate("/pickapet", { replace: true });
      }
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters");
          break;
        case "auth/user-not-found":
          setError("No account found with this email");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        default:
          setError(err.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google Sign-In successful!");
      navigate("/home", { replace: true });
    } catch (err) {
      // Handle specific Firebase errors for Google sign-in
      switch (err.code) {
        case "auth/popup-closed-by-user":
          setError("Sign-in popup was closed");
          break;
        case "auth/popup-blocked":
          setError("Popup was blocked by the browser");
          break;
        default:
          setError("Failed to sign in with Google");
      }
    }
  };

  return (
    <Container
      fluid
      style={{
        padding: 0,
        margin: 0,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FDF5E6",
      }}
    >
      <Container size={420} style={{ padding: 0 }}>
        <AuthNavBar method={method} toggleMethod={toggleMethod} />

        <Title align="center" mb="sm" mt="md" style={{ fontFamily: "Fuzzy Bubbles" }}>
          {method === "signIn" ? "Log In" : "Register"}
        </Title>

        {/* Form container with shadow and border */}
        <Paper withBorder shadow="md" p={30} radius="md" mt="lg">
          <form onSubmit={handleSubmit}>
            
            {/* Email input field */}
            <TextInput
              style={{
                fontSize: "1.5rem",
                marginBottom: "20px",
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                color: "#000000",
              }}
              label="Email"
              placeholder="you@example.com"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            
            {/* Password input field */}
            <PasswordInput
              style={{
                fontSize: "1.5rem",
                marginBottom: "20px",
                fontFamily: "'Fuzzy Bubbles', sans-serif",
                color: "#000000",
              }}
              label="Password"
              placeholder="Your password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {/* Confirm password field, visible only during registration */}
            {method === "signUp" && (
              <PasswordInput
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "20px",
                  fontFamily: "'Fuzzy Bubbles', sans-serif",
                  color: "#000000",
                }}
                label="Confirm Password"
                placeholder="Confirm your password"
                id="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            )}

            {/* Display error message if there's an error */}
            {error && (
              <div style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
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
                fontSize: "1rem",
                marginBottom: "20px",
                fontFamily: "'Fuzzy Bubbles'",
              }}
            >
              {method === "signIn" ? "Log In" : "Register"}
            </Button>
          </form>

          {method === "signIn" && (
            <Button
              fullWidth
              mt="md"
              color="#FBA34B"
              onClick={handleGoogleSignIn}
              style={{
                fontSize: "1rem",
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
