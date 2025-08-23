import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import UserProfile from './components/auth/UserProfile';
import Dashboard from './components/dashboard/Dashboard';
import ExerciseLibrary from './components/exercises/ExerciseLibrary';
import GoalSetting from './components/goals/GoalSetting';
import ProgressDashboard from './components/progress/ProgressDashboard';
import WorkoutLibrary from './components/workouts/WorkoutLibrary';
import WorkoutPlans from './components/workouts/WorkoutPlans';
import FoodDatabase from './components/nutrition/FoodDatabase';
import NutritionLogger from './components/nutrition/NutritionLogger';
import NutritionAnalytics from './components/nutrition/NutritionAnalytics';
import PWARegistration from './components/ui/PWARegistration';
import SocialFeed from './components/social/SocialFeed';
import AdvancedAnalytics from './components/analytics/AdvancedAnalytics';
import Challenges from './components/challenges/Challenges';
import ChallengeDetail from './components/challenges/ChallengeDetail';
import WearableIntegration from './components/wearable/WearableIntegration';
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
          <ThemeProvider>
            <div className="App">
            <Routes>
              {/* Public routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected routes */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/goals" 
                element={
                  <ProtectedRoute>
                    <GoalSetting />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/progress" 
                element={
                  <ProtectedRoute>
                    <ProgressDashboard />
                  </ProtectedRoute>
                } 
              />
              
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
              
              <Route 
                path="/workouts" 
                element={
                  <ProtectedRoute>
                    <WorkoutLibrary />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/workout-plans" 
                element={
                  <ProtectedRoute>
                    <WorkoutPlans />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/nutrition" 
                element={
                  <ProtectedRoute>
                    <FoodDatabase />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/nutrition/log" 
                element={
                  <ProtectedRoute>
                    <NutritionLogger />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/nutrition/analytics" 
                element={
                  <ProtectedRoute>
                    <NutritionAnalytics />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/social" 
                element={
                  <ProtectedRoute>
                    <SocialFeed />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <AdvancedAnalytics />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/challenges" 
                element={
                  <ProtectedRoute>
                    <Challenges />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/challenges/:id" 
                element={
                  <ProtectedRoute>
                    <ChallengeDetail />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/wearable" 
                element={
                  <ProtectedRoute>
                    <WearableIntegration />
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
            <PWARegistration />
          </div>
        </ThemeProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
