import { useState, useCallback } from 'react';
import { useUser } from './useUser';
import { useGoals } from './useTRPC';
import { onboardingService } from '@/services/onboardingService';
import { OnboardingData } from '@/components/onboarding/OnboardingWizard';

interface UseOnboardingReturn {
  // Status
  isOnboardingCompleted: boolean;
  shouldShowOnboarding: boolean;
  isOnboardingRequired: boolean;
  
  // Actions
  completeOnboarding: (data: OnboardingData) => Promise<void>;
  saveOnboardingProgress: (data: OnboardingData) => Promise<void>;
  triggerOnboarding: () => void;
  skipOnboarding: () => Promise<void>;
  
  // State
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  
  // Loading
  isLoading: boolean;
  error: string | null;
}

export function useOnboarding(): UseOnboardingReturn {
  const { user, userProfile, updateProfile } = useUser();
  const { data: goalsResponse } = useGoals();
  
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if onboarding is completed
  const isOnboardingCompleted = onboardingService.checkOnboardingStatus(userProfile);
  
  // Check if user has goals
  const hasGoals = (goalsResponse?.data?.length || 0) > 0;
  
  // Determine if onboarding should be shown
  const shouldShowOnboarding = onboardingService.shouldTriggerOnboarding(userProfile, hasGoals);
  
  // Check if onboarding is required (new user without goals and without completed onboarding)
  const isOnboardingRequired = !isOnboardingCompleted && !hasGoals && !!userProfile;

  /**
   * Complete the onboarding process
   */
  const completeOnboarding = useCallback(async (data: OnboardingData) => {
    if (!user) {
      throw new Error('No user signed in');
    }

    try {
      setIsLoading(true);
      setError(null);

      // Save onboarding data to Firestore
      await onboardingService.completeOnboarding(user.uid, data);
      
      // Update local user profile
      await updateProfile({
        onboardingCompleted: true,
        onboardingData: {
          ageRange: data.ageRange,
          gender: data.gender,
          bodyType: data.bodyType,
          primaryGoal: data.primaryGoal,
          currentWeight: data.currentWeight,
          targetWeight: data.targetWeight,
          height: data.height,
          weightUnit: data.weightUnit,
          heightUnit: data.heightUnit,
          fitnessLevel: data.fitnessLevel,
          workoutEnvironment: data.workoutEnvironment,
          availableTime: data.availableTime,
          equipmentAccess: data.equipmentAccess,
          workoutDaysPerWeek: data.workoutDaysPerWeek,
          selectedPlan: data.selectedPlan,
          completedAt: new Date(),
        },
      });

      setIsOnboardingOpen(false);
      
      console.log('🎉 Onboarding completed successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to complete onboarding';
      setError(errorMessage);
      console.error('❌ Error completing onboarding:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, updateProfile]);

  /**
   * Save onboarding progress (for auto-save)
   */
  const saveOnboardingProgress = useCallback(async (data: OnboardingData) => {
    if (!user) {
      return;
    }

    try {
      await onboardingService.saveOnboardingData(user.uid, data);
    } catch (err) {
      console.error('❌ Error saving onboarding progress:', err);
      // Don't throw here as this is auto-save
    }
  }, [user]);

  /**
   * Manually trigger onboarding
   */
  const triggerOnboarding = useCallback(() => {
    setIsOnboardingOpen(true);
    setError(null);
  }, []);

  /**
   * Skip onboarding (mark as completed without data)
   */
  const skipOnboarding = useCallback(async () => {
    if (!user) {
      throw new Error('No user signed in');
    }

    try {
      setIsLoading(true);
      setError(null);

      // Mark onboarding as completed without detailed data
      await updateProfile({
        onboardingCompleted: true,
      });

      setIsOnboardingOpen(false);
      
      console.log('⏭️ Onboarding skipped');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to skip onboarding';
      setError(errorMessage);
      console.error('❌ Error skipping onboarding:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, updateProfile]);

  return {
    // Status
    isOnboardingCompleted,
    shouldShowOnboarding,
    isOnboardingRequired,
    
    // Actions
    completeOnboarding,
    saveOnboardingProgress,
    triggerOnboarding,
    skipOnboarding,
    
    // State
    isOnboardingOpen,
    setIsOnboardingOpen,
    
    // Loading
    isLoading,
    error,
  };
}

export default useOnboarding;
