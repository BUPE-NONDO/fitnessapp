import { useState, useCallback } from 'react';
import { useUser } from './useUser';
import { useGoals } from './useTRPC';
import { OnboardingData } from '@/components/onboarding/OnboardingWizard';
import { IsolatedOnboardingService } from '@/services/isolatedOnboardingService';
import { ExerciseDatabase } from '@/services/exerciseDatabase';

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
  restartOnboarding: () => Promise<void>;

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
  const isOnboardingCompleted = userProfile?.onboardingCompleted || false;

  // Check if user has goals
  const hasGoals = (goalsResponse?.data?.length || 0) > 0;

  // Determine if onboarding should be shown
  const shouldShowOnboarding = !isOnboardingCompleted && !hasGoals && !!userProfile;
  
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

      console.log('🎉 Starting onboarding completion with data:', data);

      // Initialize exercise database if needed
      try {
        await ExerciseDatabase.initializeExerciseDatabase();
      } catch (error) {
        console.warn('⚠️ Exercise database already initialized or failed to initialize:', error);
      }

      // Start onboarding if not already started
      try {
        await IsolatedOnboardingService.startOnboarding(user.uid);
      } catch (error) {
        console.warn('⚠️ Onboarding already started or failed to start:', error);
      }

      // Complete onboarding using isolated service
      console.log('🏋️ Completing onboarding with isolated service...');
      await IsolatedOnboardingService.completeOnboarding(user.uid, data);

      // Update local user profile to reflect completion
      await updateProfile({
        onboardingCompleted: true,
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
      await IsolatedOnboardingService.updateOnboardingProgress(user.uid, data.currentStep || 1, data);
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

  /**
   * Restart onboarding (reset user's onboarding status)
   */
  const restartOnboarding = useCallback(async () => {
    if (!user) {
      throw new Error('No user signed in');
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('🔄 Restarting onboarding for user');

      // Reset onboarding status using the isolated service
      await IsolatedOnboardingService.resetOnboarding(user.uid);

      // Update local user profile to reflect restart
      await updateProfile({
        onboardingCompleted: false,
      });

      // Open onboarding wizard
      setIsOnboardingOpen(true);

      console.log('✅ Onboarding restarted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to restart onboarding';
      setError(errorMessage);
      console.error('❌ Error restarting onboarding:', err);
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
    restartOnboarding,
    
    // State
    isOnboardingOpen,
    setIsOnboardingOpen,
    
    // Loading
    isLoading,
    error,
  };
}

export default useOnboarding;
