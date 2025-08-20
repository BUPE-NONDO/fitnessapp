import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { AdminAuthService } from '@/services/adminAuthService';
import { CleanDashboard } from './dashboard/CleanDashboard';
import { DashboardNavigation } from './dashboard/DashboardNavigation';
import { GoalsPage } from './goals/GoalsPage';
import { ProgressTrackingPage } from './progress/ProgressTrackingPage';
import { OnboardingWizard } from './onboarding/OnboardingWizard';
import { WorkoutPlanDebug } from './debug/WorkoutPlanDebug';
import { WorkoutPlanTest } from './debug/WorkoutPlanTest';
import { OnboardingIntegrationTest } from './debug/OnboardingIntegrationTest';
import { CompleteDataReset } from './admin/CompleteDataReset';

export function Dashboard() {
  const { user, logout } = useAuth();
  const {
    isOnboardingRequired,
    isOnboardingOpen,
    setIsOnboardingOpen,
    completeOnboarding,
    triggerOnboarding,
  } = useOnboarding();

  const [activeTab, setActiveTab] = useState<'overview' | 'workouts' | 'goals' | 'progress' | 'achievements' | 'debug'>('overview');
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
  React.useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.email) {
        const adminStatus = await AdminAuthService.isAdminEmail(user.email);
        setIsAdmin(adminStatus);
      }
    };
    checkAdminStatus();
  }, [user]);

  const handleOnboardingComplete = async (onboardingData: any) => {
    try {
      await completeOnboarding(onboardingData);
      console.log('🎉 Onboarding completed from dashboard');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  const handleOnboardingExit = () => {
    setIsOnboardingOpen(false);
  };

  // Show onboarding wizard if required or manually triggered
  if (isOnboardingOpen) {
    return (
      <OnboardingWizard
        onComplete={handleOnboardingComplete}
        onExit={handleOnboardingExit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background-dark font-sans" style={{ background: 'var(--gradient-background)' }}>
      {/* Professional Header */}
              <header className="bg-primary-dark/95 backdrop-blur-sm border-b border-stroke-medium shadow-fitness-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 sm:space-x-4">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent-orange rounded-full flex items-center justify-center shadow-fitness-lg">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 bg-text-light rounded-full"></div>
                </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-text-light tracking-tight">
                  FitnessTracker
                </h1>
                <p className="text-xs text-accent-orange font-medium">
                  Professional Fitness Management
                </p>
              </div>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent-orange rounded-full flex items-center justify-center">
                  <span className="text-text-light text-xs sm:text-sm font-semibold">
                    {(user?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-medium text-text-light">
                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-accent-orange">Active Member</p>
                </div>
              </div>

              {/* Admin Access */}
              {isAdmin && (
                <button
                  onClick={() => setActiveTab(activeTab === 'debug' ? 'overview' : 'debug')}
                  className="px-2 sm:px-3 py-1 sm:py-2 bg-accent-orange hover-bg-accent-orange-dark text-text-light rounded-lg transition-colors text-xs sm:text-sm font-medium"
                >
                  {activeTab === 'debug' ? 'Dashboard' : 'Admin'}
                </button>
              )}

              {/* Logout */}
              <button
                onClick={logout}
                className="px-3 sm:px-4 py-1 sm:py-2 bg-accent-orange hover-bg-accent-orange-dark text-text-light rounded-lg transition-colors text-xs sm:text-sm font-medium shadow-fitness-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="h-full">
          {/* Welcome Banner for New Users */}
          {isOnboardingRequired && (
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6 mb-8 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Complete Your Fitness Profile
                    </h3>
                    <p className="text-gray-600 mt-1">
                      Set up your personalized workout plan in just 2 minutes
                    </p>
                  </div>
                </div>
                <button
                  onClick={triggerOnboarding}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}

          {/* Main Dashboard Content */}
          {activeTab !== 'debug' && activeTab !== 'progress' && (
            <div className="space-y-6 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 xl:px-8">
              {/* Navigation */}
              <DashboardNavigation 
                activeTab={activeTab} 
                onTabChange={setActiveTab}
              />
              
              {/* Content based on active tab */}
              {activeTab === 'overview' && <CleanDashboard />}
              {activeTab === 'workouts' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Workouts</h2>
                  <p className="text-gray-600">Workout tracking and logging features coming soon...</p>
                </div>
              )}
              {activeTab === 'goals' && <GoalsPage />}
              {activeTab === 'progress' && <ProgressTrackingPage />}
              {activeTab === 'achievements' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
                  <p className="text-gray-600">Badges and milestone tracking coming soon...</p>
                </div>
              )}
            </div>
          )}

          {/* Admin/Debug Section */}
          {activeTab === 'debug' && (
            <div className="space-y-6 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 xl:px-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-semibold text-gray-900">Admin Tools</h2>
                  <p className="text-sm text-gray-600 mt-1">Development and testing utilities</p>
                </div>
                <div className="p-6 space-y-6">
                  <OnboardingIntegrationTest />
                  <WorkoutPlanTest />
                  <WorkoutPlanDebug />
                  <CompleteDataReset />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
