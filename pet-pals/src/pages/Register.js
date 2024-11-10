// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
// import './Register.css';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       navigate('/'); // Redirect to login after registration
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//       <div className="register-container">
//         <h2>Create your account</h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleRegister}>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button type="submit" className="register-btn">Register</button>
//         </form>
//         <p>Already have an account? <span onClick={() => navigate('/')}>Sign in here</span></p>
//       </div>
//   );
// };

// export default Register;

import React from 'react';
import { TextInput, PasswordInput, Button, Text, Container, Paper, Title } from '@mantine/core';

const Register = () => {
  return (
    <Container size={420} my={40}>
      <Title align="center">Welcome to our community</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Start your new journey with us and join our community
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email address" placeholder="Enter your email address" required />
        <PasswordInput label="Password" placeholder="Password" required mt="md" />
        <PasswordInput label="Confirm Password" placeholder="Confirm Password" required mt="md" />
        <Button fullWidth mt="xl">Register</Button>
        <Text align="center" mt="md">Or connect with</Text>
        <Button fullWidth variant="default" mt="md">Google</Button>
      </Paper>
    </Container>
  );
};

export default Register;
