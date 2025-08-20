import React, { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { useOnboarding } from '@/hooks/useOnboarding';
import { ProgressTrackingService, ProgressStats } from '@/services/progressTrackingService';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface CleanDashboardProps {
  className?: string;
}

interface DashboardStats {
  currentStreak: number;
  totalWorkouts: number;
  todayProgress: number;
  weeklyProgress: number;
  nextMilestone: {
    title: string;
    current: number;
    target: number;
    type: string;
  } | null;
}

export function CleanDashboard({ className = '' }: CleanDashboardProps) {
  const { user, userProfile } = useUser();
  const { restartOnboarding, isLoading: onboardingLoading } = useOnboarding();
  const [stats, setStats] = useState<DashboardStats>({
    currentStreak: 0,
    totalWorkouts: 0,
    todayProgress: 0,
    weeklyProgress: 0,
    nextMilestone: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [user, userProfile]);

  const loadStats = async () => {
    if (!user || !userProfile) return;

    try {
      setLoading(true);
      const progressStats = await ProgressTrackingService.calculateProgressStats(user.uid, userProfile);
      
      // Calculate next milestone
      const nextMilestone = calculateNextMilestone(progressStats);
      
      setStats({
        currentStreak: progressStats.currentStreak,
        totalWorkouts: progressStats.totalWorkouts,
        todayProgress: calculateTodayProgress(progressStats),
        weeklyProgress: calculateWeeklyProgress(progressStats),
        nextMilestone,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateNextMilestone = (progressStats: ProgressStats) => {
    const milestones = [
      { type: 'streak', current: progressStats.currentStreak, targets: [7, 14, 30, 50, 100] },
      { type: 'workouts', current: progressStats.totalWorkouts, targets: [10, 25, 50, 100, 250] },
    ];

    for (const milestone of milestones) {
      const nextTarget = milestone.targets.find(target => target > milestone.current);
      if (nextTarget) {
        return {
          title: `${nextTarget} ${milestone.type === 'streak' ? 'Day Streak' : 'Workouts'}`,
          current: milestone.current,
          target: nextTarget,
          type: milestone.type,
        };
      }
    }
    return null;
  };

  const calculateTodayProgress = (progressStats: ProgressStats): number => {
    // Simplified calculation based on check-ins and workouts
    const hasCheckedIn = progressStats.checkInsThisWeek > 0;
    const hasWorkedOut = progressStats.workoutsThisWeek > 0;
    return (hasCheckedIn ? 50 : 0) + (hasWorkedOut ? 50 : 0);
  };

  const calculateWeeklyProgress = (progressStats: ProgressStats): number => {
    const expectedWorkouts = 3;
    const actualWorkouts = progressStats.workoutsThisWeek;
    return Math.min((actualWorkouts / expectedWorkouts) * 100, 100);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white animate-pulse">
          <div className="h-8 bg-blue-400 rounded w-64 mb-2"></div>
          <div className="h-4 bg-blue-300 rounded w-48"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-card-light rounded-xl p-6 shadow-card border border-stroke-card animate-pulse">
              <div className="h-12 bg-stroke-light rounded w-12 mb-3"></div>
              <div className="h-6 bg-stroke-light rounded w-16 mb-2"></div>
              <div className="h-4 bg-stroke-light rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Hero Section - Today's Focus */}
      <div className="gradient-hero rounded-2xl p-4 sm:p-6 text-text-light relative overflow-hidden">
        <div className="absolute top-2 right-2 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full"></div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Good {getTimeOfDay()}, {userProfile?.displayName || 'Fitness Warrior'}!
            </h2>
            <p className="text-sm sm:text-base text-text-light/90 mb-4">
              {getMotivationalMessage(stats.currentStreak, stats.todayProgress)}
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-medium py-2 px-3 sm:px-4 rounded-full transition-colors">
                📝 Log Workout
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-medium py-2 px-3 sm:px-4 rounded-full transition-colors">
                🎯 Set Goal
              </button>
            </div>
          </div>
          
          <div className="text-center sm:text-right">
            <div className="text-3xl sm:text-4xl font-bold">{stats.todayProgress}%</div>
            <div className="text-sm sm:text-base text-text-light/90">Today's Progress</div>
            {stats.currentStreak > 0 && (
              <div className="text-orange-200 text-xs sm:text-sm mt-1">
                🔥 {stats.currentStreak} day streak
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics - Only 3 Most Important */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card-light rounded-xl p-4 sm:p-6 shadow-card border border-stroke-card hover:shadow-fitness-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 icon-bg-orange rounded-full flex items-center justify-center">
              <Icon name="flame" size={20} className="sm:text-2xl text-text-light" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-text-card">{stats.currentStreak}</div>
              <div className="text-xs sm:text-sm text-text-card-muted">Day Streak</div>
            </div>
          </div>
        </div>

        <div className="bg-card-light rounded-xl p-4 sm:p-6 shadow-card border border-stroke-card hover:shadow-fitness-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 icon-bg-purple rounded-full flex items-center justify-center">
              <Icon name="dumbbell" size={20} className="sm:text-2xl text-text-light" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-text-card">{stats.totalWorkouts}</div>
              <div className="text-xs sm:text-sm text-text-card-muted">Total Workouts</div>
            </div>
          </div>
        </div>

        <div className="bg-card-light rounded-xl p-4 sm:p-6 shadow-card border border-stroke-card hover:shadow-fitness-md transition-shadow sm:col-span-2 lg:col-span-1">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 icon-bg-green rounded-full flex items-center justify-center">
              <Icon name="trending_up" size={20} className="sm:text-2xl text-text-light" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-text-card">{stats.weeklyProgress}%</div>
              <div className="text-xs sm:text-sm text-text-card-muted">Weekly Goal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Milestone - Single Focus */}
      {stats.nextMilestone && (
        <div className="bg-card-light rounded-xl p-4 sm:p-6 shadow-card border border-stroke-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-text-card mb-1">
                Next Milestone
              </h3>
              <p className="text-sm sm:text-base text-text-card-muted">{stats.nextMilestone.title}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xl sm:text-2xl font-bold text-accent-orange">
                {stats.nextMilestone.current}/{stats.nextMilestone.target}
              </div>
              <div className="text-xs sm:text-sm text-text-card-muted">
                {Math.round((stats.nextMilestone.current / stats.nextMilestone.target) * 100)}% complete
              </div>
            </div>
          </div>
          <div className="mt-4 w-full bg-stroke-light rounded-full h-2">
            <div 
              className="gradient-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${(stats.nextMilestone.current / stats.nextMilestone.target) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-card-light rounded-xl p-4 sm:p-6 shadow-card border border-stroke-card">
                  <h3 className="text-base sm:text-lg font-semibold text-text-card mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <button className="flex flex-col items-center p-3 sm:p-4 rounded-lg hover-bg-card-lighter transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 icon-bg-blue rounded-full flex items-center justify-center mb-2">
              <Icon name="add" size={20} className="sm:text-2xl text-text-light" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-text-card text-center">Log Workout</span>
          </button>
          
          <button className="flex flex-col items-center p-3 sm:p-4 rounded-lg hover-bg-card-lighter transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 icon-bg-green rounded-full flex items-center justify-center mb-2">
              <Icon name="target" size={20} className="sm:text-2xl text-text-light" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-text-card text-center">Set Goal</span>
          </button>
          
          <button className="flex flex-col items-center p-3 sm:p-4 rounded-lg hover-bg-card-lighter transition-colors">
            <div className="w-10 h-10 sm:w-12 sm:h-12 icon-bg-purple rounded-full flex items-center justify-center mb-2">
              <Icon name="bar_chart" size={20} className="sm:text-2xl text-text-light" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-text-card text-center">View Progress</span>
          </button>
          
          <button className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
              <Icon name="settings" size={24} className="text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}

function getMotivationalMessage(streak: number, todayProgress: number): string {
  if (streak > 7) {
    return `Incredible ${streak}-day streak! You're unstoppable! 🔥`;
  }
  if (streak > 0) {
    return `Great ${streak}-day streak! Keep the momentum going! 💪`;
  }
  if (todayProgress > 50) {
    return "You're making great progress today! Keep it up! 🎯";
  }
  return "Ready to crush your fitness goals today? Let's do this! 💪";
}
