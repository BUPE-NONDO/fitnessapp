import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface GoalCreationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (goal: GoalData) => void;
}

interface GoalData {
  title: string;
  type: 'weight' | 'strength' | 'cardio' | 'flexibility' | 'nutrition' | 'habit';
  target: number;
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  deadline?: Date;
  description: string;
  icon: string;
  color: string;
}

const goalTypes = [
  {
    id: 'weight',
    name: 'Weight Management',
    icon: 'scale',
    color: 'bg-blue-100 text-blue-600',
    description: 'Lose, gain, or maintain weight',
    examples: ['Lose 10 lbs', 'Gain 5 lbs muscle', 'Maintain current weight']
  },
  {
    id: 'strength',
    name: 'Strength Training',
    icon: 'dumbbell',
    color: 'bg-purple-100 text-purple-600',
    description: 'Build muscle and strength',
    examples: ['Bench press 200 lbs', 'Squat 300 lbs', 'Deadlift 400 lbs']
  },
  {
    id: 'cardio',
    name: 'Cardiovascular',
    icon: 'heart',
    color: 'bg-red-100 text-red-600',
    description: 'Improve endurance and heart health',
    examples: ['Run 5K in 25 minutes', 'Cycle 50 miles', 'Swim 1 mile']
  },
  {
    id: 'flexibility',
    name: 'Flexibility',
    icon: 'stretch',
    color: 'bg-green-100 text-green-600',
    description: 'Improve flexibility and mobility',
    examples: ['Touch toes', 'Splits', 'Bridge pose']
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    icon: 'apple',
    color: 'bg-orange-100 text-orange-600',
    description: 'Improve eating habits',
    examples: ['Drink 8 glasses water', 'Eat 5 servings vegetables', 'Limit sugar']
  },
  {
    id: 'habit',
    name: 'Habit Building',
    icon: 'repeat',
    color: 'bg-yellow-100 text-yellow-600',
    description: 'Build healthy habits',
    examples: ['Workout 3x per week', 'Sleep 8 hours', 'Meditate daily']
  }
];

const frequencyOptions = [
  { id: 'daily', name: 'Daily', description: 'Every day' },
  { id: 'weekly', name: 'Weekly', description: 'Once per week' },
  { id: 'monthly', name: 'Monthly', description: 'Once per month' }
];

export function GoalCreationWizard({ isOpen, onClose, onComplete }: GoalCreationWizardProps) {
  const [step, setStep] = useState(1);
  const [goalData, setGoalData] = useState<Partial<GoalData>>({});

  const updateGoalData = (updates: Partial<GoalData>) => {
    setGoalData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete(goalData as GoalData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-dark mb-2">What's your goal?</h2>
        <p className="text-gray-600">Choose the type of goal you want to achieve</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {goalTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => updateGoalData({ type: type.id as any, icon: type.icon, color: type.color })}
            className={cn(
              'p-4 rounded-xl border-2 transition-all duration-200 text-left',
              goalData.type === type.id
                ? 'border-accent-orange bg-accent-orange/5 shadow-fitness-md'
                : 'border-stroke-light hover:border-accent-orange/50 hover:shadow-fitness-sm'
            )}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', type.color)}>
                <Icon name={type.icon as any} size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-text-dark">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Examples: {type.examples.join(', ')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-dark mb-2">Set your target</h2>
        <p className="text-gray-600">What do you want to achieve?</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Goal Title
          </label>
          <input
            type="text"
            value={goalData.title || ''}
            onChange={(e) => updateGoalData({ title: e.target.value })}
            placeholder="e.g., Lose 10 pounds, Run a 5K, Bench press 200 lbs"
            className="w-full p-3 border border-stroke-light rounded-lg bg-background-light focus:border-accent-orange focus:outline-none"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Target Value
            </label>
            <input
              type="number"
              value={goalData.target || ''}
              onChange={(e) => updateGoalData({ target: Number(e.target.value) })}
              placeholder="10"
              className="w-full p-3 border border-stroke-light rounded-lg bg-background-light focus:border-accent-orange focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              Unit
            </label>
            <select
              value={goalData.unit || ''}
              onChange={(e) => updateGoalData({ unit: e.target.value })}
              className="w-full p-3 border border-stroke-light rounded-lg bg-background-light focus:border-accent-orange focus:outline-none"
            >
              <option value="">Select unit</option>
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
              <option value="miles">miles</option>
              <option value="km">km</option>
              <option value="minutes">minutes</option>
              <option value="days">days</option>
              <option value="times">times</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-dark mb-2">
            Description (optional)
          </label>
          <textarea
            value={goalData.description || ''}
            onChange={(e) => updateGoalData({ description: e.target.value })}
            placeholder="Add more details about your goal..."
            rows={3}
            className="w-full p-3 border border-stroke-light rounded-lg bg-background-light focus:border-accent-orange focus:outline-none"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-dark mb-2">How often?</h2>
        <p className="text-gray-600">Choose how frequently you want to track this goal</p>
      </div>
      
      <div className="space-y-3">
        {frequencyOptions.map((freq) => (
          <button
            key={freq.id}
            onClick={() => updateGoalData({ frequency: freq.id as any })}
            className={cn(
              'w-full p-4 rounded-xl border-2 transition-all duration-200 text-left',
              goalData.frequency === freq.id
                ? 'border-accent-orange bg-accent-orange/5 shadow-fitness-md'
                : 'border-stroke-light hover:border-accent-orange/50 hover:shadow-fitness-sm'
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-text-dark">{freq.name}</h3>
                <p className="text-sm text-gray-600">{freq.description}</p>
              </div>
              {goalData.frequency === freq.id && (
                <div className="w-6 h-6 bg-accent-orange rounded-full flex items-center justify-center">
                  <Icon name="check" size={16} className="text-text-light" />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-text-dark mb-2">Review your goal</h2>
        <p className="text-gray-600">Make sure everything looks good before creating</p>
      </div>
      
      <div className="bg-background-light rounded-xl p-6 border border-stroke-light">
        <div className="flex items-center space-x-4 mb-4">
          <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', goalData.color)}>
            <Icon name={goalData.icon as any} size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-dark">{goalData.title}</h3>
            <p className="text-sm text-gray-600">{goalData.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Target:</span>
            <span className="ml-2 font-medium text-text-dark">
              {goalData.target} {goalData.unit}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Frequency:</span>
            <span className="ml-2 font-medium text-text-dark capitalize">
              {goalData.frequency}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="info" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Tips for success</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Start with realistic, achievable targets</li>
              <li>• Track your progress regularly</li>
              <li>• Celebrate small wins along the way</li>
              <li>• Adjust your goal if needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background-light rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-fitness-xl">
        {/* Header */}
        <div className="gradient-hero p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-text-light">Create New Goal</h1>
            <button
              onClick={onClose}
              className="text-text-light/80 hover:text-text-light transition-colors"
            >
              <Icon name="x" size={24} />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  step >= stepNumber
                    ? 'bg-text-light text-primary-dark'
                    : 'bg-text-light/20 text-text-light/60'
                )}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={cn(
                    'w-8 h-1 mx-2',
                    step > stepNumber ? 'bg-text-light' : 'bg-text-light/20'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          
          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={cn(
                'px-6 py-2 rounded-lg font-medium transition-colors',
                step === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary-dark hover:bg-primary-dark/10'
              )}
            >
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={cn(
                'px-6 py-2 rounded-lg font-medium transition-colors',
                canProceed()
                  ? 'bg-accent-orange text-text-light hover:bg-accent-orange-dark'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              )}
            >
              {step === 4 ? 'Create Goal' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function canProceed(): boolean {
    switch (step) {
      case 1:
        return !!goalData.type;
      case 2:
        return !!(goalData.title && goalData.target && goalData.unit);
      case 3:
        return !!goalData.frequency;
      case 4:
        return true;
      default:
        return false;
    }
  }
}
