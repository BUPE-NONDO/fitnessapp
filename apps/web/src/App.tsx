import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { LoginForm } from '@/components/LoginForm';
import { TRPCProvider } from '@/components/TRPCProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { RequireAuth } from '@/components/RequireAuth';
import { AchievementManager, CelebrationTrigger } from '@/components/AchievementManager';
import { UserFlowManager, FlowStateIndicator } from '@/components/flow/UserFlowManager';
import { SplashScreen } from '@/components/SplashScreen';
import { AdminApp } from '@/components/admin/AdminApp';
import { ThemeToggle } from '@/contexts/ThemeContext';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TRPCProvider>
          <AppContent />
        </TRPCProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [currentRoute, setCurrentRoute] = useState<'app' | 'admin'>('app');

  // Force fresh start - clear any cached data on app load
  React.useEffect(() => {
    // Clear localStorage to ensure fresh experience
    localStorage.removeItem('onboarding-progress');
    localStorage.removeItem('user-preferences');
    localStorage.removeItem('workout-plan');
    localStorage.removeItem('was-signup');
    sessionStorage.clear();
    console.log('🧹 Cleared cached data for fresh start');
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Check for admin route
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      setCurrentRoute('admin');
    } else {
      setCurrentRoute('app');
    }
  }, []);



  // Show splash screen on initial load
  if (showSplash) {
    return (
      <SplashScreen
        isVisible={showSplash}
        onComplete={handleSplashComplete}
        minDisplayTime={2500}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show admin app if on admin route
  if (currentRoute === 'admin') {
    return <AdminApp />;
  }

  if (user) {
    return (
      <RequireAuth>
        <UserFlowManager />
        <AchievementManager />
        <CelebrationTrigger />
        <FlowStateIndicator />
      </RequireAuth>
    );
  }

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'var(--gradient-background)' }}>
      {/* Circle decorations with purple theme */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary-light/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent-orange/15 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-light/10 to-accent-orange/10 rounded-full blur-3xl"></div>
      <div className="w-full max-w-md">
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <ThemeToggle size="md" />
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏋️‍♂️</div>
          <h1 className="text-3xl font-bold text-text-light mb-2">FitnessApp</h1>
          <p className="text-text-muted">Your personal fitness tracking companion</p>
        </div>

        <LoginForm
          isSignUp={isSignUp}
          onToggleMode={() => setIsSignUp(!isSignUp)}
        />

        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            🔥 Powered by Firebase • Built with React & TypeScript
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
