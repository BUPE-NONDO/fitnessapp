import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate('/signin');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">AuraFit</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {currentUser?.displayName || currentUser?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="btn-secondary"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Welcome to AuraFit! 🏃‍♂️💪
              </h2>
              <p className="text-gray-600 mb-4">
                Your personalized fitness journey starts here. Track your workouts, 
                monitor your progress, and achieve your fitness goals.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-700">
                  <strong>Account:</strong> {currentUser?.email}
                </p>
                {currentUser?.displayName && (
                  <p className="text-sm text-purple-700">
                    <strong>Name:</strong> {currentUser.displayName}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link to="/exercises" className="w-full btn-primary block text-center">
                  📚 Exercise Library
                </Link>
                <Link to="/workouts" className="w-full btn-primary block text-center">
                  🏋️ Workout Library
                </Link>
                <button className="w-full btn-secondary">
                  🏃‍♂️ Start Workout
                </button>
                <button className="w-full btn-secondary">
                  📊 View Progress
                </button>
                <button className="w-full btn-secondary">
                  🎯 Set Goals
                </button>
                <button className="w-full btn-secondary">
                  📝 Log Nutrition
                </button>
              </div>
            </div>

            {/* Features Coming Soon */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Features Coming Soon
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Exercise Library
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Workout Library
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Workout Plans
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Nutrition Tracking
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Progress Analytics
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                  Community Features
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-gray-600">Workouts</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Goals</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Days Active</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
