import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PickAPetPage from './pages/PickAPetPage'
import CheckInPage from './pages/CheckInPage';
import CommunityFeed from './pages/CommunityFeed';
import Journal from './pages/Journal';
import AuthPage from './pages/AuthPage';
import { AuthProvider } from './util/AuthContext'; // Provides authentication context to the app
import { useAuth } from './util/AuthContext'; // Hook to access auth functions and state
import LoadingSpinner from './components/LoadingSpinner'; // Spinner component for loading states

// ProtectedRoute component - restricts access to authenticated users
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Access user and loading states from auth context

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading user info
  }

  if (!user) {
    return <Navigate to="/" />; // Redirect to login if user is not authenticated
  }

  return children; // Render children if user is authenticated
};

// PublicRoute component - restricts access to unauthenticated users
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Access user and loading states from auth context

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading user info
  }

  if (user) {
    return <Navigate to="/home" />; // Redirect to home if user is authenticated
  }

  return children; // Render children if user is not authenticated
};

function App() {
  return (
    // AuthProvider wraps the app to provide authentication context to all components
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public route for authentication page */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            } 
          />

          {/* Protected routes - accessible only to authenticated users */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <CommunityFeed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <Journal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pickapet"
            element={
              <ProtectedRoute>
                <PickAPetPage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route - redirects any unrecognized URL to the login page */}
          <Route 
            path="*" 
            element={
              <Navigate to="/" replace />
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
