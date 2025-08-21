import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import ExerciseLibrary from './components/exercises/ExerciseLibrary';
import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="App">
            <Routes>
              {/* Public routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/exercises" 
                element={
                  <ProtectedRoute>
                    <ExerciseLibrary />
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirect root to dashboard or signin */}
              <Route 
                path="/" 
                element={<Navigate to="/dashboard" replace />} 
              />
              
              {/* Catch all route */}
              <Route 
                path="*" 
                element={<Navigate to="/dashboard" replace />} 
              />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
