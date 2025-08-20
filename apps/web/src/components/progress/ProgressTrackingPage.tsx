import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export function ProgressTrackingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'bmi' | 'workout' | 'history'>('bmi');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [calculatedBMI, setCalculatedBMI] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>('');

  const calculateBMI = () => {
    if (!height || !weight) return;

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(heightNum) || isNaN(weightNum)) {
      alert('Please enter valid numbers');
      return;
    }

    let heightInMeters: number;
    let weightInKg: number;

    if (heightUnit === 'in') {
      heightInMeters = heightNum * 0.0254;
    } else {
      heightInMeters = heightNum / 100;
    }

    if (weightUnit === 'lbs') {
      weightInKg = weightNum * 0.453592;
    } else {
      weightInKg = weightNum;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    setCalculatedBMI(bmi);

    if (bmi < 18.5) setBmiCategory('Underweight');
    else if (bmi < 25) setBmiCategory('Normal Weight');
    else if (bmi < 30) setBmiCategory('Overweight');
    else if (bmi < 35) setBmiCategory('Obese Class I');
    else if (bmi < 40) setBmiCategory('Obese Class II');
    else setBmiCategory('Obese Class III');
  };

  return (
    <div className="h-screen bg-background-dark flex flex-col" style={{ background: 'var(--gradient-background)' }}>
      {/* Header */}
      <header className="bg-primary-dark/95 backdrop-blur-sm border-b border-stroke-medium shadow-fitness-md flex-shrink-0">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-text-light">Progress Tracking</h1>
            <div className="text-sm text-text-muted">
              User ID: {user?.uid?.substring(0, 8)}...
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-card-light border-b border-stroke-card flex-shrink-0">
        <div className="flex">
          {[
            { id: 'bmi', label: 'BMI Calculator', icon: 'scale' },
            { id: 'workout', label: 'Workout Log', icon: 'dumbbell' },
            { id: 'history', label: 'History', icon: 'chart-line' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'bg-accent-orange text-text-light'
                  : 'text-text-card-muted hover-bg-card-lighter'
              )}
            >
              <Icon name={tab.icon as any} size={16} className="mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'bmi' && (
          <div className="space-y-6">
            {/* BMI Calculator */}
            <div className="bg-card-light rounded-xl p-6 border border-stroke-card shadow-card">
              <h2 className="text-xl font-semibold text-text-card mb-4">Calculate BMI & Get Workout Plan</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-text-card mb-2">Height</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="flex-1 px-3 py-2 border border-stroke-card rounded-lg bg-background-light text-text-card"
                      placeholder="Enter height"
                    />
                    <select
                      value={heightUnit}
                      onChange={(e) => setHeightUnit(e.target.value as 'cm' | 'in')}
                      className="px-3 py-2 border border-stroke-card rounded-lg bg-background-light text-text-card"
                    >
                      <option value="cm">cm</option>
                      <option value="in">in</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-card mb-2">Weight</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="flex-1 px-3 py-2 border border-stroke-card rounded-lg bg-background-light text-text-card"
                      placeholder="Enter weight"
                    />
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lbs')}
                      className="px-3 py-2 border border-stroke-card rounded-lg bg-background-light text-text-card"
                    >
                      <option value="kg">kg</option>
                      <option value="lbs">lbs</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={calculateBMI}
                className="w-full bg-accent-orange hover-bg-accent-orange-dark text-text-light py-3 rounded-lg font-medium transition-colors shadow-fitness-md"
              >
                Calculate BMI & Generate Workout Plan
              </button>
            </div>

            {/* Results */}
            {calculatedBMI && (
              <div className="bg-card-light rounded-xl p-6 border border-stroke-card shadow-card">
                <h3 className="text-lg font-semibold text-text-card mb-4">Your BMI Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-orange">{calculatedBMI.toFixed(1)}</div>
                    <div className="text-sm text-text-card-muted">BMI Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold text-text-card">{bmiCategory}</div>
                    <div className="text-sm text-text-card-muted">Category</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-text-card">
                      {height} {heightUnit} / {weight} {weightUnit}
                    </div>
                    <div className="text-sm text-text-card-muted">Current Measurements</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'workout' && (
          <div className="bg-card-light rounded-xl p-6 border border-stroke-card shadow-card text-center">
            <Icon name="dumbbell" size={48} className="text-text-card-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-card mb-2">Workout Logging</h3>
            <p className="text-text-card-muted">Coming soon! Calculate your BMI first to get a personalized workout plan.</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-card-light rounded-xl p-6 border border-stroke-card shadow-card text-center">
            <Icon name="trending_up" size={48} className="text-text-card-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-card mb-2">Progress History</h3>
            <p className="text-text-card-muted">Coming soon! Your progress tracking history will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
