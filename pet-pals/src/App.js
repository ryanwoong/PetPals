import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PickAPetPage from './pages/PickAPetPage'
import InstructionsPage from './pages/InstructionsPage'
import CheckInPage from './pages/CheckInPage';
import CommunityFeed from './pages/CommunityFeed';
import Journal from './pages/Journal';

import AuthPage from './pages/AuthPage';
import { AuthProvider } from './util/AuthContext';
import { useAuth } from './util/AuthContext'; // Add this import

import LoadingSpinner from './components/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/home" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes - accessible when not logged in */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            } 
          />

          {/* Protected routes - require authentication */}
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
            path="/instructions"
            element={
              <ProtectedRoute>
                <InstructionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkin"
            element={
              <ProtectedRoute>
                <CheckInPage />
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

          {/* Catch all route - redirect to home or login depending on auth state */}
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