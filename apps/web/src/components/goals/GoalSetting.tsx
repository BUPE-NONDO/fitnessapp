import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'weight' | 'strength' | 'endurance' | 'flexibility' | 'general';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  milestones: Milestone[];
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Milestone {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  isCompleted: boolean;
  completedAt?: Date;
}

const GOAL_CATEGORIES = [
  { value: 'weight', label: 'Weight Management', icon: '⚖️' },
  { value: 'strength', label: 'Strength Training', icon: '💪' },
  { value: 'endurance', label: 'Cardiovascular', icon: '🏃‍♂️' },
  { value: 'flexibility', label: 'Flexibility', icon: '🧘‍♀️' },
  { value: 'general', label: 'General Health', icon: '❤️' }
];

const GOAL_UNITS = {
  weight: 'kg',
  strength: 'kg',
  endurance: 'minutes',
  flexibility: 'cm',
  general: 'units'
};

export default function GoalSetting() {
  const { currentUser } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'general' as Goal['category'],
    targetValue: 0,
    currentValue: 0,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    milestones: [] as Milestone[]
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    setIsLoading(true);
    try {
      // TODO: Load goals from backend
      // For now, we'll use mock data
      const mockGoals: Goal[] = [
        {
          id: '1',
          title: 'Lose 5kg',
          description: 'Reduce body weight through diet and exercise',
          category: 'weight',
          targetValue: 70,
          currentValue: 75,
          unit: 'kg',
          deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          milestones: [
            { id: '1-1', title: 'Lose 2kg', targetValue: 73, currentValue: 75, isCompleted: false },
            { id: '1-2', title: 'Lose 4kg', targetValue: 71, currentValue: 75, isCompleted: false }
          ],
          isCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      setGoals(mockGoals);
    } catch (err) {
      setError('Failed to load goals');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGoal = () => {
    setIsCreatingGoal(true);
    setNewGoal({
      title: '',
      description: '',
      category: 'general',
      targetValue: 0,
      currentValue: 0,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      milestones: []
    });
  };

  const handleSaveGoal = async () => {
    if (!newGoal.title || !newGoal.description) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        category: newGoal.category,
        targetValue: newGoal.targetValue,
        currentValue: newGoal.currentValue,
        unit: GOAL_UNITS[newGoal.category],
        deadline: new Date(newGoal.deadline),
        milestones: newGoal.milestones,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // TODO: Save to backend
      setGoals(prev => [...prev, goal]);
      setIsCreatingGoal(false);
      setError('');
    } catch (err) {
      setError('Failed to create goal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProgress = async (goalId: string, newValue: number) => {
    setIsLoading(true);
    try {
      setGoals(prev => prev.map(goal => {
        if (goal.id === goalId) {
          const updatedGoal = {
            ...goal,
            currentValue: newValue,
            updatedAt: new Date(),
            isCompleted: newValue >= goal.targetValue
          };

          // Update milestones
          updatedGoal.milestones = goal.milestones.map(milestone => ({
            ...milestone,
            isCompleted: newValue >= milestone.targetValue,
            completedAt: newValue >= milestone.targetValue && !milestone.isCompleted ? new Date() : milestone.completedAt
          }));

          return updatedGoal;
        }
        return goal;
      }));
    } catch (err) {
      setError('Failed to update progress');
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressPercentage = (goal: Goal) => {
    if (goal.targetValue === goal.currentValue) return 100;
    return Math.min(100, Math.max(0, (goal.currentValue / goal.targetValue) * 100));
  };

  const getDaysRemaining = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderGoalCard = (goal: Goal) => {
    const progressPercentage = getProgressPercentage(goal);
    const daysRemaining = getDaysRemaining(goal.deadline);
    const category = GOAL_CATEGORIES.find(cat => cat.value === goal.category);

    return (
      <div key={goal.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{category?.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
              <p className="text-sm text-gray-600">{category?.label}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              goal.isCompleted 
                ? 'bg-green-100 text-green-800' 
                : daysRemaining < 0 
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
            }`}>
              {goal.isCompleted ? 'Completed' : daysRemaining < 0 ? 'Overdue' : `${daysRemaining} days left`}
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{goal.description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{goal.currentValue} / {goal.targetValue} {goal.unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                progressPercentage >= 100 ? 'bg-green-500' : 'bg-purple-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedGoal(goal)}
            className="btn-secondary text-sm"
          >
            View Details
          </button>
          <button
            onClick={() => {
              const newValue = prompt(`Enter new ${goal.unit} value:`, goal.currentValue.toString());
              if (newValue !== null) {
                handleUpdateProgress(goal.id, parseFloat(newValue));
              }
            }}
            className="btn-primary text-sm"
          >
            Update Progress
          </button>
        </div>
      </div>
    );
  };

  const renderCreateGoalForm = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Goal</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Goal Title</label>
          <input
            type="text"
            value={newGoal.title}
            onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., Lose 5kg, Run 5km"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newGoal.description}
            onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            rows={3}
            placeholder="Describe your goal in detail..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={newGoal.category}
            onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value as Goal['category'] }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            {GOAL_CATEGORIES.map(category => (
              <option key={category.value} value={category.value}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Value</label>
            <input
              type="number"
              value={newGoal.currentValue}
              onChange={(e) => setNewGoal(prev => ({ ...prev, currentValue: parseFloat(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Value</label>
            <input
              type="number"
              value={newGoal.targetValue}
              onChange={(e) => setNewGoal(prev => ({ ...prev, targetValue: parseFloat(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="flex space-x-3 mt-6">
        <button
          onClick={handleSaveGoal}
          disabled={isLoading}
          className="btn-primary disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Goal'}
        </button>
        <button
          onClick={() => setIsCreatingGoal(false)}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Goal Setting</h1>
          <p className="text-gray-600">Set SMART goals and track your progress towards achieving them</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Create Goal Button */}
        {!isCreatingGoal && (
          <div className="mb-6">
            <button
              onClick={handleCreateGoal}
              className="btn-primary"
            >
              + Create New Goal
            </button>
          </div>
        )}

        {/* Create Goal Form */}
        {isCreatingGoal && (
          <div className="mb-8">
            {renderCreateGoalForm()}
          </div>
        )}

        {/* Goals Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading goals...</p>
          </div>
        ) : goals.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
            <p className="text-gray-600 mb-4">Create your first goal to start tracking your progress</p>
            <button
              onClick={handleCreateGoal}
              className="btn-primary"
            >
              Create Your First Goal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(renderGoalCard)}
          </div>
        )}
      </div>
    </div>
  );
}
