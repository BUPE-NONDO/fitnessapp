import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserWorkoutPlan } from '@/hooks/useUserWorkoutPlan';
import { WorkoutPlanGenerator } from '@/services/workoutPlanGenerator';
import { OnboardingData } from '@/types/onboarding';

export function WorkoutPlanTest() {
  const { user } = useAuth();
  const { currentPlan, refreshPlans, isLoading } = useUserWorkoutPlan();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testOnboardingData: OnboardingData = {
    currentStep: 9,
    ageRange: '25-34',
    gender: 'prefer-not-to-say',
    primaryGoal: 'lose-weight',
    currentWeight: 75,
    targetWeight: 70,
    height: 175,
    fitnessLevel: 'beginner',
    workoutEnvironment: 'home',
    availableTime: '30-45',
    equipmentAccess: ['bodyweight', 'dumbbells'],
    workoutDaysPerWeek: 4,
    subscriptionTier: 'free',
    completedAt: new Date(),
  };

  const handleGenerateTestPlan = async () => {
    if (!user) {
      setError('No user signed in');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);

      console.log('🧪 Generating test workout plan...');
      const plan = await WorkoutPlanGenerator.generateWorkoutPlan(user.uid, testOnboardingData);
      
      console.log('✅ Test plan generated:', plan);
      
      // Refresh the plans to show the new one
      await refreshPlans();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('❌ Test failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        🧪 Workout Plan Test
      </h3>
      
      <div className="space-y-4">
        {/* Current Plan Status */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Current Plan Status</h4>
          {isLoading ? (
            <p className="text-gray-600 dark:text-gray-300">Loading...</p>
          ) : currentPlan ? (
            <div>
              <p className="text-green-600 dark:text-green-400">✅ Plan Found: {currentPlan.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Goal: {currentPlan.goal} | Level: {currentPlan.fitnessLevel} | 
                Workouts: {currentPlan.workoutsPerWeek}/week
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Weekly Schedule: {currentPlan.weeklySchedule?.length || 0} days
              </p>
            </div>
          ) : (
            <p className="text-red-600 dark:text-red-400">❌ No workout plan found</p>
          )}
        </div>

        {/* Test Data */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Test Data</h4>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>Goal: {testOnboardingData.primaryGoal}</p>
            <p>Level: {testOnboardingData.fitnessLevel}</p>
            <p>Days/Week: {testOnboardingData.workoutDaysPerWeek}</p>
            <p>Time: {testOnboardingData.availableTime} minutes</p>
            <p>Equipment: {testOnboardingData.equipmentAccess?.join(', ')}</p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400">❌ Error: {error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleGenerateTestPlan}
            disabled={isGenerating || !user}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {isGenerating ? 'Generating...' : '🏋️ Generate Test Plan'}
          </button>
          
          <button
            onClick={refreshPlans}
            disabled={isLoading || !user}
            className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {isLoading ? 'Loading...' : '🔄 Refresh Plans'}
          </button>
        </div>

        {/* Plan Details */}
        {currentPlan && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Plan Details</h4>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <p><strong>ID:</strong> {currentPlan.id}</p>
              <p><strong>Title:</strong> {currentPlan.title}</p>
              <p><strong>Description:</strong> {currentPlan.description}</p>
              <p><strong>Duration:</strong> {currentPlan.duration} weeks</p>
              <p><strong>Calories/Week:</strong> {currentPlan.estimatedCaloriesPerWeek}</p>
              <p><strong>Created:</strong> {currentPlan.createdAt.toLocaleDateString()}</p>
              
              {currentPlan.weeklySchedule && (
                <div className="mt-2">
                  <p><strong>Weekly Schedule:</strong></p>
                  <ul className="ml-4 space-y-1">
                    {currentPlan.weeklySchedule.map((day, index) => (
                      <li key={index}>
                        {day.dayOfWeek}: {day.name} ({day.exercises?.length || 0} exercises)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
