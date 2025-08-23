import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  type: 'ai-generated' | 'custom' | 'template';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in weeks
  frequency: number; // workouts per week
  goals: string[];
  workouts: PlannedWorkout[];
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  progress: PlanProgress;
  createdAt: Date;
  updatedAt: Date;
}

interface PlannedWorkout {
  id: string;
  name: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  exercises: PlannedExercise[];
  estimatedDuration: number; // in minutes
  notes?: string;
}

interface PlannedExercise {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  weight?: number;
  restTime: number; // in seconds
  notes?: string;
}

interface PlanProgress {
  completedWorkouts: number;
  totalWorkouts: number;
  currentWeek: number;
  adherenceRate: number; // percentage
  lastWorkoutDate?: Date;
}

const WORKOUT_TEMPLATES = [
  {
    id: 'strength-beginner',
    name: 'Beginner Strength',
    description: 'Perfect for those new to strength training',
    difficulty: 'beginner' as const,
    duration: 4,
    frequency: 3,
    goals: ['Strength Training', 'Muscle Gain'],
    estimatedDuration: 45
  },
  {
    id: 'cardio-intermediate',
    name: 'Cardio Fitness',
    description: 'Improve cardiovascular endurance',
    difficulty: 'intermediate' as const,
    duration: 6,
    frequency: 4,
    goals: ['Cardiovascular Fitness', 'Weight Loss'],
    estimatedDuration: 30
  },
  {
    id: 'strength-advanced',
    name: 'Advanced Strength',
    description: 'For experienced lifters looking to push limits',
    difficulty: 'advanced' as const,
    duration: 8,
    frequency: 5,
    goals: ['Strength Training', 'Muscle Gain'],
    estimatedDuration: 75
  }
];

const GOAL_CATEGORIES = [
  'Weight Loss',
  'Muscle Gain',
  'Strength Training',
  'Cardiovascular Fitness',
  'Flexibility',
  'General Health',
  'Sports Performance',
  'Rehabilitation'
];

export default function WorkoutPlans() {
  const { currentUser } = useAuth();
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);

  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    type: 'custom' as WorkoutPlan['type'],
    difficulty: 'beginner' as WorkoutPlan['difficulty'],
    duration: 4,
    frequency: 3,
    goals: [] as string[],
    startDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadWorkoutPlans();
  }, []);

  const loadWorkoutPlans = async () => {
    setIsLoading(true);
    try {
      // TODO: Load from backend
      const mockPlans: WorkoutPlan[] = [
        {
          id: '1',
          name: 'My First Strength Plan',
          description: 'A beginner-friendly strength training program',
          type: 'ai-generated',
          difficulty: 'beginner',
          duration: 4,
          frequency: 3,
          goals: ['Strength Training', 'Muscle Gain'],
          workouts: [
            {
              id: '1-1',
              name: 'Upper Body',
              dayOfWeek: 1,
              exercises: [
                { exerciseId: '1', exerciseName: 'Push-ups', sets: 3, reps: 10, restTime: 60 },
                { exerciseId: '2', exerciseName: 'Dumbbell Rows', sets: 3, reps: 12, restTime: 60 }
              ],
              estimatedDuration: 45
            }
          ],
          isActive: true,
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
          progress: {
            completedWorkouts: 6,
            totalWorkouts: 12,
            currentWeek: 2,
            adherenceRate: 75,
            lastWorkoutDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          },
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      setWorkoutPlans(mockPlans);
    } catch (err) {
      setError('Failed to load workout plans');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePlan = () => {
    setIsCreatingPlan(true);
    setNewPlan({
      name: '',
      description: '',
      type: 'custom',
      difficulty: 'beginner',
      duration: 4,
      frequency: 3,
      goals: [],
      startDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleSavePlan = async () => {
    if (!newPlan.name || !newPlan.description || newPlan.goals.length === 0) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const plan: WorkoutPlan = {
        id: Date.now().toString(),
        name: newPlan.name,
        description: newPlan.description,
        type: newPlan.type,
        difficulty: newPlan.difficulty,
        duration: newPlan.duration,
        frequency: newPlan.frequency,
        goals: newPlan.goals,
        workouts: [],
        isActive: false,
        startDate: new Date(newPlan.startDate),
        endDate: new Date(new Date(newPlan.startDate).getTime() + newPlan.duration * 7 * 24 * 60 * 60 * 1000),
        progress: {
          completedWorkouts: 0,
          totalWorkouts: newPlan.duration * newPlan.frequency,
          currentWeek: 1,
          adherenceRate: 0
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // TODO: Save to backend
      setWorkoutPlans(prev => [...prev, plan]);
      setIsCreatingPlan(false);
      setError('');
    } catch (err) {
      setError('Failed to create workout plan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoalToggle = (goal: string) => {
    setNewPlan(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleActivatePlan = async (planId: string) => {
    setIsLoading(true);
    try {
      setWorkoutPlans(prev => prev.map(plan => ({
        ...plan,
        isActive: plan.id === planId
      })));
    } catch (err) {
      setError('Failed to activate plan');
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressPercentage = (progress: PlanProgress) => {
    return progress.totalWorkouts > 0 ? (progress.completedWorkouts / progress.totalWorkouts) * 100 : 0;
  };

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const renderPlanCard = (plan: WorkoutPlan) => {
    const progressPercentage = getProgressPercentage(plan.progress);
    const daysRemaining = getDaysRemaining(plan.endDate);

    return (
      <div key={plan.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
            <p className="text-sm text-gray-600">{plan.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                plan.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                plan.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {plan.difficulty.charAt(0).toUpperCase() + plan.difficulty.slice(1)}
              </span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {plan.type === 'ai-generated' ? '🤖 AI' : plan.type === 'custom' ? '✏️ Custom' : '📋 Template'}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              plan.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {plan.isActive ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{plan.progress.completedWorkouts} / {plan.progress.totalWorkouts} workouts</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div>
            <span className="font-medium">Duration:</span> {plan.duration} weeks
          </div>
          <div>
            <span className="font-medium">Frequency:</span> {plan.frequency}x/week
          </div>
          <div>
            <span className="font-medium">Current Week:</span> {plan.progress.currentWeek}
          </div>
          <div>
            <span className="font-medium">Adherence:</span> {plan.progress.adherenceRate}%
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedPlan(plan)}
            className="btn-secondary text-sm"
          >
            View Details
          </button>
          {!plan.isActive ? (
            <button
              onClick={() => handleActivatePlan(plan.id)}
              className="btn-primary text-sm"
            >
              Activate Plan
            </button>
          ) : (
            <button
              onClick={() => {/* TODO: Navigate to workout */}}
              className="btn-primary text-sm"
            >
              Start Workout
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderCreatePlanForm = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Workout Plan</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Plan Name</label>
          <input
            type="text"
            value={newPlan.name}
            onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., My Strength Journey"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newPlan.description}
            onChange={(e) => setNewPlan(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            rows={3}
            placeholder="Describe your workout plan goals..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              value={newPlan.difficulty}
              onChange={(e) => setNewPlan(prev => ({ ...prev, difficulty: e.target.value as WorkoutPlan['difficulty'] }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Plan Type</label>
            <select
              value={newPlan.type}
              onChange={(e) => setNewPlan(prev => ({ ...prev, type: e.target.value as WorkoutPlan['type'] }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="custom">Custom</option>
              <option value="ai-generated">AI Generated</option>
              <option value="template">Template</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (weeks)</label>
            <input
              type="number"
              value={newPlan.duration}
              onChange={(e) => setNewPlan(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              min="1"
              max="12"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Frequency (per week)</label>
            <input
              type="number"
              value={newPlan.frequency}
              onChange={(e) => setNewPlan(prev => ({ ...prev, frequency: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              min="1"
              max="7"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={newPlan.startDate}
              onChange={(e) => setNewPlan(prev => ({ ...prev, startDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Goals</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {GOAL_CATEGORIES.map(goal => (
              <label key={goal} className="flex items-center space-x-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={newPlan.goals.includes(goal)}
                  onChange={() => handleGoalToggle(goal)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-900">{goal}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex space-x-3 mt-6">
        <button
          onClick={handleSavePlan}
          disabled={isLoading}
          className="btn-primary disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create Plan'}
        </button>
        <button
          onClick={() => setIsCreatingPlan(false)}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Templates</h3>
      <p className="text-gray-600 mb-4">Choose from our pre-designed workout plans</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {WORKOUT_TEMPLATES.map(template => (
          <div key={template.id} className="border rounded-lg p-4 hover:border-purple-300 transition-colors">
            <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span className="capitalize">{template.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{template.duration} weeks</span>
              </div>
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span>{template.frequency}x/week</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>~{template.estimatedDuration} min</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1">Goals:</div>
              <div className="flex flex-wrap gap-1">
                {template.goals.map(goal => (
                  <span key={goal} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                    {goal}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setNewPlan({
                  name: template.name,
                  description: template.description,
                  type: 'template',
                  difficulty: template.difficulty,
                  duration: template.duration,
                  frequency: template.frequency,
                  goals: template.goals,
                  startDate: new Date().toISOString().split('T')[0]
                });
                setShowTemplates(false);
                setIsCreatingPlan(true);
              }}
              className="w-full btn-primary text-sm"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Workout Plans</h1>
          <p className="text-gray-600">Create personalized workout plans and track your progress</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-6 flex space-x-3">
          <button
            onClick={handleCreatePlan}
            className="btn-primary"
          >
            + Create New Plan
          </button>
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="btn-secondary"
          >
            {showTemplates ? 'Hide Templates' : 'View Templates'}
          </button>
        </div>

        {/* Templates */}
        {showTemplates && (
          <div className="mb-8">
            {renderTemplates()}
          </div>
        )}

        {/* Create Plan Form */}
        {isCreatingPlan && (
          <div className="mb-8">
            {renderCreatePlanForm()}
          </div>
        )}

        {/* Workout Plans Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading workout plans...</p>
          </div>
        ) : workoutPlans.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workout plans yet</h3>
            <p className="text-gray-600 mb-4">Create your first workout plan to start your fitness journey</p>
            <button
              onClick={handleCreatePlan}
              className="btn-primary"
            >
              Create Your First Plan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workoutPlans.map(renderPlanCard)}
          </div>
        )}
      </div>
    </div>
  );
}
