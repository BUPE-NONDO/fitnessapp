import React from 'react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AuraFit 🏃‍♂️💪
          </h1>
          <p className="text-xl text-gray-600">
            Your personalized fitness journey starts here
          </p>
        </header>
        
        <main className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Welcome to AuraFit
            </h2>
            <p className="text-gray-600 mb-6">
              A personalized, test-driven fitness platform that leverages a modern, 
              type-safe technology stack to provide users with tailored workout and 
              nutrition plans, motivating them to achieve their wellness goals.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  🏋️ Workout Management
                </h3>
                <p className="text-purple-600 text-sm">
                  Personalized workout plans, exercise library, and progress tracking
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  🍎 Nutrition Tracking
                </h3>
                <p className="text-blue-600 text-sm">
                  Comprehensive food logging, macro tracking, and meal planning
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  📊 Progress Analytics
                </h3>
                <p className="text-green-600 text-sm">
                  Data visualization, goal tracking, and performance insights
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">
                  👥 Community Features
                </h3>
                <p className="text-orange-600 text-sm">
                  Social fitness challenges, leaderboards, and community support
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500">
          <p>Built with ❤️ by the AuraFit team</p>
          <p className="text-sm mt-2">
            React • TypeScript • Firebase • tRPC • Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
