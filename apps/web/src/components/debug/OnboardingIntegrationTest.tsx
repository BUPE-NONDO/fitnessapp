import React, { useState } from 'react';
import { useDailyGoals } from '@/hooks/useDailyGoals';

export function OnboardingIntegrationTest() {
  const { forceRefresh, todaysGoal, isLoading } = useDailyGoals();
  const [testResult, setTestResult] = useState<string>('');

  const simulateOnboardingCompletion = () => {
    // Set the flag that indicates onboarding was just completed
    localStorage.setItem('onboarding-just-completed', 'true');
    setTestResult('✅ Onboarding completion flag set. Refresh the page to see the welcome message and data refresh.');
  };

  const clearOnboardingFlag = () => {
    localStorage.removeItem('onboarding-just-completed');
    setTestResult('🧹 Onboarding completion flag cleared.');
  };

  const testDataRefresh = async () => {
    setTestResult('🔄 Testing data refresh...');
    try {
      await forceRefresh();
      setTestResult('✅ Data refresh completed successfully!');
    } catch (error) {
      setTestResult(`❌ Data refresh failed: ${error}`);
    }
  };

  const checkCurrentState = () => {
    const hasFlag = localStorage.getItem('onboarding-just-completed') === 'true';
    const goalStatus = todaysGoal ? `Found today's goal: ${todaysGoal.title}` : 'No goal found for today';
    
    setTestResult(`
📊 Current State:
• Onboarding flag: ${hasFlag ? '✅ Set' : '❌ Not set'}
• Loading: ${isLoading ? '🔄 Yes' : '✅ No'}
• Today's goal: ${goalStatus}
• User ready for dashboard: ${!isLoading && todaysGoal ? '✅ Yes' : '❌ No'}
    `);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        🧪 Onboarding Integration Test
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={simulateOnboardingCompletion}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Simulate Onboarding Complete
          </button>
          
          <button
            onClick={clearOnboardingFlag}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Clear Onboarding Flag
          </button>
          
          <button
            onClick={testDataRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Test Data Refresh
          </button>
          
          <button
            onClick={checkCurrentState}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Check Current State
          </button>
        </div>

        {testResult && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <pre className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
              {testResult}
            </pre>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            🔍 How to Test Complete Integration:
          </h4>
          <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>1. Click "Simulate Onboarding Complete" to set the flag</li>
            <li>2. Refresh the page to trigger the welcome message</li>
            <li>3. Check that daily goals data loads automatically</li>
            <li>4. Verify the welcome message appears at the top</li>
            <li>5. Confirm today's goal is displayed in the dashboard</li>
          </ol>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
            ⚠️ Note:
          </h4>
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            This test simulates the flag that gets set when onboarding completes. 
            In the real flow, this flag is automatically set by the PlanSummaryStep 
            before redirecting to the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
