import React, { useState } from 'react';
import './App.css';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: string;
}

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentStep, setCurrentStep] = useState<'auth' | 'profile' | 'goals' | 'dashboard'>('auth');
  const [user, setUser] = useState<User | null>(null);
  
  // Auth form state
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Profile form state
  const [profileData, setProfileData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: ''
  });

  // Goal form state
  const [goalData, setGoalData] = useState({
    primaryGoal: '',
    targetWeight: '',
    timeframe: '',
    motivation: ''
  });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp && authData.password !== authData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setCurrentStep('profile');
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('goals');
  };

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      name: authData.name,
      email: authData.email,
      age: parseInt(profileData.age),
      gender: profileData.gender,
      height: parseInt(profileData.height),
      weight: parseInt(profileData.weight),
      activityLevel: profileData.activityLevel
    };
    setUser(newUser);
    setCurrentStep('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentStep('auth');
    setAuthData({ name: '', email: '', password: '', confirmPassword: '' });
    setProfileData({ age: '', gender: '', height: '', weight: '', activityLevel: '' });
    setGoalData({ primaryGoal: '', targetWeight: '', timeframe: '', motivation: '' });
  };

  if (currentStep === 'dashboard' && user) {
    return (
      <div className="app">
        <div className="dashboard">
          <header className="dashboard-header">
            <h1>Welcome, {user.name}! 🏋️‍♂️</h1>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </header>
          
          <div className="dashboard-content">
            <div className="user-info">
              <h2>Your Profile</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Age:</span>
                  <span className="value">{user.age} years</span>
                </div>
                <div className="info-item">
                  <span className="label">Gender:</span>
                  <span className="value">{user.gender}</span>
                </div>
                <div className="info-item">
                  <span className="label">Height:</span>
                  <span className="value">{user.height} cm</span>
                </div>
                <div className="info-item">
                  <span className="label">Weight:</span>
                  <span className="value">{user.weight} kg</span>
                </div>
                <div className="info-item">
                  <span className="label">Activity Level:</span>
                  <span className="value">{user.activityLevel}</span>
                </div>
              </div>
            </div>

            <div className="goals-section">
              <h2>Your Goals</h2>
              <div className="goal-card">
                <h3>Primary Goal: {goalData.primaryGoal}</h3>
                <p>Target Weight: {goalData.targetWeight} kg</p>
                <p>Timeframe: {goalData.timeframe}</p>
                <p>Motivation: {goalData.motivation}</p>
              </div>
            </div>

            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="action-buttons">
                <button className="action-btn">
                  📊 Track Progress
                </button>
                <button className="action-btn">
                  💪 Start Workout
                </button>
                <button className="action-btn">
                  📝 Log Activity
                </button>
                <button className="action-btn">
                  🎯 View Goals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="auth-container">
        <div className="auth-header">
          <div className="logo">
            <span className="logo-icon">💪</span>
            <h1>FitTrack</h1>
          </div>
          <p className="tagline">Your personal fitness journey starts here</p>
        </div>

        {currentStep === 'auth' && (
          <form onSubmit={handleAuthSubmit} className="auth-form">
            <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
            
            {isSignUp && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={authData.name}
                  onChange={(e) => setAuthData({...authData, name: e.target.value})}
                  required
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={authData.email}
                onChange={(e) => setAuthData({...authData, email: e.target.value})}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={authData.password}
                onChange={(e) => setAuthData({...authData, password: e.target.value})}
                required
                placeholder="Enter your password"
              />
            </div>

            {isSignUp && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={authData.confirmPassword}
                  onChange={(e) => setAuthData({...authData, confirmPassword: e.target.value})}
                  required
                  placeholder="Confirm your password"
                />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>

            <div className="auth-switch">
              <p>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="switch-btn"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </form>
        )}

        {currentStep === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="auth-form">
            <h2>Tell us about yourself</h2>
            <p className="form-subtitle">This helps us personalize your experience</p>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                value={profileData.age}
                onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                required
                placeholder="Enter your age"
                min="13"
                max="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={profileData.gender}
                onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                value={profileData.height}
                onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                required
                placeholder="Enter your height in cm"
                min="100"
                max="250"
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                value={profileData.weight}
                onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                required
                placeholder="Enter your weight in kg"
                min="30"
                max="300"
              />
            </div>

            <div className="form-group">
              <label htmlFor="activityLevel">Activity Level</label>
              <select
                id="activityLevel"
                value={profileData.activityLevel}
                onChange={(e) => setProfileData({...profileData, activityLevel: e.target.value})}
                required
              >
                <option value="">Select activity level</option>
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="lightly-active">Lightly Active (light exercise 1-3 days/week)</option>
                <option value="moderately-active">Moderately Active (moderate exercise 3-5 days/week)</option>
                <option value="very-active">Very Active (hard exercise 6-7 days/week)</option>
                <option value="extremely-active">Extremely Active (very hard exercise, physical job)</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Continue
            </button>
          </form>
        )}

        {currentStep === 'goals' && (
          <form onSubmit={handleGoalSubmit} className="auth-form">
            <h2>Set your fitness goals</h2>
            <p className="form-subtitle">What do you want to achieve?</p>

            <div className="form-group">
              <label htmlFor="primaryGoal">Primary Goal</label>
              <select
                id="primaryGoal"
                value={goalData.primaryGoal}
                onChange={(e) => setGoalData({...goalData, primaryGoal: e.target.value})}
                required
              >
                <option value="">Select your primary goal</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="endurance">Improve Endurance/Cardio</option>
                <option value="general-fitness">General Fitness/Health</option>
                <option value="event-training">Specific Event Training</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="targetWeight">Target Weight (kg)</label>
              <input
                type="number"
                id="targetWeight"
                value={goalData.targetWeight}
                onChange={(e) => setGoalData({...goalData, targetWeight: e.target.value})}
                required
                placeholder="Enter your target weight"
                min="30"
                max="300"
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeframe">Timeframe</label>
              <select
                id="timeframe"
                value={goalData.timeframe}
                onChange={(e) => setGoalData({...goalData, timeframe: e.target.value})}
                required
              >
                <option value="">Select timeframe</option>
                <option value="1-month">1 Month</option>
                <option value="3-months">3 Months</option>
                <option value="6-months">6 Months</option>
                <option value="1-year">1 Year</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="motivation">What motivates you?</label>
              <textarea
                id="motivation"
                value={goalData.motivation}
                onChange={(e) => setGoalData({...goalData, motivation: e.target.value})}
                required
                placeholder="Tell us what motivates you to achieve your fitness goals..."
                rows={3}
              />
            </div>

            <button type="submit" className="submit-btn">
              Complete Setup
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
