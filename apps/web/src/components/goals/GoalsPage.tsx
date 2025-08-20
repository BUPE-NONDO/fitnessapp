import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { GoalCreationWizard } from './GoalCreationWizard';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  title: string;
  type: 'weight' | 'strength' | 'cardio' | 'flexibility' | 'nutrition' | 'habit';
  target: number;
  unit: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  current: number;
  progress: number;
  icon: string;
  color: string;
  description: string;
  createdAt: Date;
  deadline?: Date;
}

export function GoalsPage() {
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Lose 10 pounds',
      type: 'weight',
      target: 10,
      unit: 'lbs',
      frequency: 'monthly',
      current: 3,
      progress: 30,
      icon: 'scale',
      color: 'bg-blue-100 text-blue-600',
      description: 'Lose weight gradually and sustainably',
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      title: 'Run 5K',
      type: 'cardio',
      target: 5,
      unit: 'km',
      frequency: 'weekly',
      current: 2,
      progress: 40,
      icon: 'heart',
      color: 'bg-red-100 text-red-600',
      description: 'Improve cardiovascular fitness',
      createdAt: new Date('2024-01-05')
    },
    {
      id: '3',
      title: 'Workout 3x per week',
      type: 'habit',
      target: 3,
      unit: 'times',
      frequency: 'weekly',
      current: 2,
      progress: 67,
      icon: 'repeat',
      color: 'bg-yellow-100 text-yellow-600',
      description: 'Build consistent workout habits',
      createdAt: new Date('2024-01-10')
    }
  ]);

  const handleCreateGoal = (goalData: any) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      ...goalData,
      current: 0,
      progress: 0,
      createdAt: new Date()
    };
    setGoals(prev => [newGoal, ...prev]);
    setIsCreatingGoal(false);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-success-green';
    if (progress >= 60) return 'text-info-blue';
    if (progress >= 40) return 'text-warning-yellow';
    return 'text-error-red';
  };

  const getProgressBarColor = (progress: number) => {
    if (progress >= 80) return 'bg-success-green';
    if (progress >= 60) return 'bg-info-blue';
    if (progress >= 40) return 'bg-warning-yellow';
    return 'bg-error-red';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-dark">My Goals</h1>
          <p className="text-text-card-muted">Track and manage your fitness goals</p>
        </div>
        <button
          onClick={() => setIsCreatingGoal(true)}
          className="bg-accent-orange hover:bg-accent-orange-dark text-text-light px-6 py-3 rounded-lg font-medium transition-colors shadow-fitness-md"
        >
          <Icon name="plus" size={20} className="mr-2" />
          Create Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid gap-6">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-card-light rounded-xl p-6 border border-stroke-card shadow-card hover:shadow-fitness-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', 
                  goal.type === 'weight' ? 'icon-bg-blue' :
                  goal.type === 'cardio' ? 'icon-bg-red' :
                  goal.type === 'habit' ? 'icon-bg-yellow' :
                  goal.type === 'strength' ? 'icon-bg-purple' :
                  goal.type === 'flexibility' ? 'icon-bg-green' :
                  'icon-bg-blue'
                )}>
                  <Icon name={goal.icon as any} size={24} className="text-text-light" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-card">{goal.title}</h3>
                  <p className="text-sm text-text-card-muted">{goal.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={cn('text-2xl font-bold', getProgressColor(goal.progress))}>
                  {goal.progress}%
                </div>
                <div className="text-sm text-text-card-muted">
                  {goal.current}/{goal.target} {goal.unit}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-card">Progress</span>
                <span className="text-sm text-text-card-muted capitalize">{goal.frequency}</span>
              </div>
              <div className="w-full bg-stroke-light rounded-full h-3">
                <div
                  className={cn('h-3 rounded-full transition-all duration-500', getProgressBarColor(goal.progress))}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-text-card-muted">
                <span>Created {goal.createdAt.toLocaleDateString()}</span>
                <span>•</span>
                <span className="capitalize">{goal.frequency} goal</span>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-text-card-muted hover:text-accent-orange transition-colors">
                  <Icon name="edit" size={16} />
                </button>
                <button className="p-2 text-text-card-muted hover:text-error-red transition-colors">
                  <Icon name="trash" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {goals.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-stroke-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="target" size={48} className="text-text-card-muted" />
          </div>
          <h3 className="text-xl font-semibold text-text-card mb-2">No goals yet</h3>
          <p className="text-text-card-muted mb-6">Create your first fitness goal to start tracking your progress</p>
          <button
            onClick={() => setIsCreatingGoal(true)}
            className="bg-accent-orange hover:bg-accent-orange-dark text-text-light px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Create Your First Goal
          </button>
        </div>
      )}

      {/* Goal Creation Wizard */}
      <GoalCreationWizard
        isOpen={isCreatingGoal}
        onClose={() => setIsCreatingGoal(false)}
        onComplete={handleCreateGoal}
      />
    </div>
  );
}
