import React from 'react';
import { useDailyGoals } from '@/hooks/useDailyGoals';

interface GoalStatsProps {
  className?: string;
}

export function GoalStats({ className = '' }: GoalStatsProps) {
  const { goalStats, isLoading, weeklyCompletionRate } = useDailyGoals();

  // Loading state
  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Weekly Progress',
      value: `${Math.round(weeklyCompletionRate)}%`,
      icon: '📊',
      color: 'blue',
      description: 'This week\'s completion rate'
    },
    {
      label: 'Goals Completed',
      value: goalStats.completedGoals,
      icon: '✅',
      color: 'green',
      description: 'Total goals achieved'
    },
    {
      label: 'Current Streak',
      value: goalStats.currentStreak,
      icon: '🔥',
      color: 'orange',
      description: 'Days in a row'
    },
    {
      label: 'Calories Burned',
      value: goalStats.totalCaloriesBurned,
      icon: '🔥',
      color: 'red',
      description: 'Total calories burned'
    }
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Progress
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track your fitness journey
          </p>
        </div>
        <div className="text-2xl">📈</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-center p-4 rounded-lg ${
              stat.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' :
              stat.color === 'green' ? 'bg-green-50 dark:bg-green-900/20' :
              stat.color === 'orange' ? 'bg-orange-50 dark:bg-orange-900/20' :
              stat.color === 'red' ? 'bg-red-50 dark:bg-red-900/20' :
              'bg-gray-50 dark:bg-gray-900/20'
            }`}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold mb-1 ${
              stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
              stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
              stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
              stat.color === 'red' ? 'text-red-600 dark:text-red-400' :
              'text-gray-600 dark:text-gray-400'
            }`}>
              {stat.value}
            </div>
            <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {weeklyCompletionRate >= 80 ? 'Excellent Progress!' :
               weeklyCompletionRate >= 60 ? 'Good Progress!' :
               weeklyCompletionRate >= 40 ? 'Keep Going!' :
               'Let\'s Get Started!'}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {weeklyCompletionRate >= 80 ? 'You\'re crushing your fitness goals! Keep up the amazing work.' :
               weeklyCompletionRate >= 60 ? 'You\'re doing great! Try to complete a few more goals this week.' :
               weeklyCompletionRate >= 40 ? 'You\'re making progress! Stay consistent to see better results.' :
               'Start with today\'s goal to begin building your fitness habit.'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
          View All Goals
        </button>
        <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
          Share Progress
        </button>
      </div>
    </div>
  );
}
