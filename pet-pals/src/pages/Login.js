// import React, { useState } from 'react';
// import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '../firebase';
// import './Login.css';
// import { useForm } from '@mantine/form';


// const Login = () => {
//     const form = useForm({
//         mode: 'uncontrolled',
//         initialValues: {
//           name: '',
//           email: '',
//         },
//       });
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   // Function to handle email/password sign-in
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       alert('Login successful!');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Function to handle Google sign-in
//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       alert('Google Sign-In successful!');
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Welcome to our community</h2>
//       <p>Start your journey with us!</p>

//       {/* Display Error Message
//       {error && <p className="error-message">{error}</p>} */}

//       {/* Login Form */}
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="input-field"

//         />
//         <input
//           type="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="input-field"

//         />
//         <div className="remember-me">
//           <input type="checkbox" id="remember" />
//           <label htmlFor="remember">Remember me</label>
//         </div>
//         <button type="submit" className="sign-in-btn">Sign In</button>
//       </form>

//       <div className="or-connect">
//         <span>Or connect with</span>
//         <button className="google-btn" onClick={handleGoogleSignIn}>
//           Sign in with Google
//         </button>
//       </div>

//     </div>
//   );
// };

// export default Login;

import React from 'react';
import { TextInput, PasswordInput, Checkbox, Button, Group, Text, Anchor, Container, Paper, Title } from '@mantine/core';

const Login = () => {
  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome to our community</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Start your new journey with us and join our community
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email address" placeholder="Enter your email address" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor href="#" size="sm">
            Forgot Password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">Sign in</Button>
        <Text align="center" mt="md">Or connect with</Text>
        <Button fullWidth variant="default" mt="md">Google</Button>
      </Paper>
    </Container>
  );
};

export default Login;
