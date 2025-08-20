import React, { useState } from 'react';
import { useDailyGoals } from '@/hooks/useDailyGoals';

interface TodaysGoalProps {
  className?: string;
}

export function TodaysGoal({ className = '' }: TodaysGoalProps) {
  const { todaysGoal, isLoading, completeGoal, hasTodaysGoal, isTodaysGoalCompleted } = useDailyGoals();
  const [isCompleting, setIsCompleting] = useState(false);

  const handleCompleteGoal = async () => {
    if (!todaysGoal || isCompleting) return;

    try {
      setIsCompleting(true);
      
      // For workout goals, we could ask for actual duration/calories
      // For now, we'll use estimated values
      const actualDuration = todaysGoal.type === 'workout' ? todaysGoal.estimatedDuration : undefined;
      const actualCalories = todaysGoal.type === 'workout' ? todaysGoal.estimatedCalories : undefined;
      
      await completeGoal(todaysGoal.id, actualDuration, actualCalories);
    } catch (error) {
      console.error('Failed to complete goal:', error);
    } finally {
      setIsCompleting(false);
    }
  };

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'workout': return '🏋️‍♂️';
      case 'rest': return '😴';
      case 'active-recovery': return '🚶‍♂️';
      default: return '🎯';
    }
  };

  const getGoalColor = (type: string) => {
    switch (type) {
      case 'workout': return 'blue';
      case 'rest': return 'green';
      case 'active-recovery': return 'purple';
      default: return 'gray';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  // No goal state
  if (!hasTodaysGoal) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Goal for Today
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Complete your onboarding to get daily fitness goals.
          </p>
        </div>
      </div>
    );
  }

  const goalColor = getGoalColor(todaysGoal.type);
  const isCompleted = isTodaysGoalCompleted;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getGoalIcon(todaysGoal.type)}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Today's Goal
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        {isCompleted && (
          <div className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
            ✓ Completed
          </div>
        )}
      </div>

      {/* Goal Details */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {todaysGoal.title}
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {todaysGoal.description}
        </p>

        {/* Goal Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {todaysGoal.estimatedDuration > 0 && (
            <div className={`text-center rounded-lg p-3 ${
              goalColor === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' :
              goalColor === 'green' ? 'bg-green-50 dark:bg-green-900/20' :
              goalColor === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20' :
              'bg-gray-50 dark:bg-gray-900/20'
            }`}>
              <div className={`text-lg font-bold ${
                goalColor === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                goalColor === 'green' ? 'text-green-600 dark:text-green-400' :
                goalColor === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                'text-gray-600 dark:text-gray-400'
              }`}>
                {todaysGoal.estimatedDuration}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">minutes</div>
            </div>
          )}

          {todaysGoal.estimatedCalories > 0 && (
            <div className={`text-center rounded-lg p-3 ${
              goalColor === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' :
              goalColor === 'green' ? 'bg-green-50 dark:bg-green-900/20' :
              goalColor === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20' :
              'bg-gray-50 dark:bg-gray-900/20'
            }`}>
              <div className={`text-lg font-bold ${
                goalColor === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                goalColor === 'green' ? 'text-green-600 dark:text-green-400' :
                goalColor === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                'text-gray-600 dark:text-gray-400'
              }`}>
                {todaysGoal.estimatedCalories}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">calories</div>
            </div>
          )}

          <div className={`text-center rounded-lg p-3 ${
            goalColor === 'blue' ? 'bg-blue-50 dark:bg-blue-900/20' :
            goalColor === 'green' ? 'bg-green-50 dark:bg-green-900/20' :
            goalColor === 'purple' ? 'bg-purple-50 dark:bg-purple-900/20' :
            'bg-gray-50 dark:bg-gray-900/20'
          }`}>
            <div className={`text-lg font-bold capitalize ${
              goalColor === 'blue' ? 'text-blue-600 dark:text-blue-400' :
              goalColor === 'green' ? 'text-green-600 dark:text-green-400' :
              goalColor === 'purple' ? 'text-purple-600 dark:text-purple-400' :
              'text-gray-600 dark:text-gray-400'
            }`}>
              {todaysGoal.difficulty}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">difficulty</div>
          </div>
        </div>
      </div>

      {/* Exercises Preview (for workout goals) */}
      {todaysGoal.type === 'workout' && todaysGoal.exercises && todaysGoal.exercises.length > 0 && (
        <div className="mb-6">
          <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
            Exercises ({todaysGoal.exercises.length})
          </h5>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {todaysGoal.exercises.slice(0, 4).map((exercise, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white text-sm">
                    {exercise.name}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {exercise.muscle}
                  </div>
                </div>
                <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                  {exercise.sets} × {exercise.reps}
                </div>
              </div>
            ))}
            {todaysGoal.exercises.length > 4 && (
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 py-1">
                +{todaysGoal.exercises.length - 4} more exercises
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      {!isCompleted && (
        <button
          onClick={handleCompleteGoal}
          disabled={isCompleting}
          className={`w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed disabled:bg-gray-400 ${
            goalColor === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
            goalColor === 'green' ? 'bg-green-600 hover:bg-green-700' :
            goalColor === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
            'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          {isCompleting ? 'Completing...' : 
           todaysGoal.type === 'workout' ? '🚀 Start Workout' :
           todaysGoal.type === 'rest' ? '✓ Mark as Complete' :
           '🚶‍♂️ Start Activity'}
        </button>
      )}

      {/* Completed State */}
      {isCompleted && (
        <div className="text-center py-4">
          <div className="text-3xl mb-2">🎉</div>
          <p className="text-green-600 dark:text-green-400 font-semibold">
            Great job! Goal completed!
          </p>
          {todaysGoal.completedAt && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Completed at {todaysGoal.completedAt.toLocaleTimeString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
