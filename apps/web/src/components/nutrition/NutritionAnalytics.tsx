import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface NutritionData {
  id: string;
  date: Date;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  water: number;
}

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  water: number;
}

const DEFAULT_GOALS: NutritionGoals = {
  calories: 2000,
  protein: 150,
  carbs: 200,
  fat: 65,
  fiber: 25,
  water: 2500
};

export default function NutritionAnalytics() {
  const { currentUser } = useAuth();
  const [nutritionData, setNutritionData] = useState<NutritionData[]>([]);
  const [goals, setGoals] = useState<NutritionGoals>(DEFAULT_GOALS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('week');

  useEffect(() => {
    loadNutritionData();
  }, []);

  const loadNutritionData = async () => {
    setIsLoading(true);
    try {
      const mockData: NutritionData[] = [
        {
          id: '1',
          date: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
          calories: 1850,
          protein: 140,
          carbs: 180,
          fat: 60,
          fiber: 22,
          water: 2400
        },
        {
          id: '2',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          calories: 1950,
          protein: 150,
          carbs: 190,
          fat: 65,
          fiber: 25,
          water: 2500
        }
      ];
      setNutritionData(mockData);
    } catch (err) {
      setError('Failed to load nutrition data');
    } finally {
      setIsLoading(false);
    }
  };

  const getAverageMacros = () => {
    if (nutritionData.length === 0) return { calories: 0, protein: 0, carbs: 0, fat: 0 };

    const totals = nutritionData.reduce((acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    return {
      calories: Math.round(totals.calories / nutritionData.length),
      protein: Math.round(totals.protein / nutritionData.length),
      carbs: Math.round(totals.carbs / nutritionData.length),
      fat: Math.round(totals.fat / nutritionData.length)
    };
  };

  const getGoalProgress = (current: number, goal: number) => {
    return goal > 0 ? Math.min(100, (current / goal) * 100) : 0;
  };

  const renderMacroChart = () => {
    const averages = getAverageMacros();
    const percentages = {
      protein: Math.round((averages.protein * 4 / averages.calories) * 100),
      carbs: Math.round((averages.carbs * 4 / averages.calories) * 100),
      fat: Math.round((averages.fat * 9 / averages.calories) * 100)
    };

    return (
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Macro Balance</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-medium text-blue-600">Protein</div>
            <div className="text-lg font-bold">{percentages.protein}%</div>
          </div>
          <div>
            <div className="text-sm font-medium text-green-600">Carbs</div>
            <div className="text-lg font-bold">{percentages.carbs}%</div>
          </div>
          <div>
            <div className="text-sm font-medium text-yellow-600">Fat</div>
            <div className="text-lg font-bold">{percentages.fat}%</div>
          </div>
        </div>
      </div>
    );
  };

  const renderGoalProgress = () => {
    const averages = getAverageMacros();

    return (
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Goal Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Calories</span>
              <span>{averages.calories} / {goals.calories}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getGoalProgress(averages.calories, goals.calories)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Protein (g)</span>
              <span>{averages.protein} / {goals.protein}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getGoalProgress(averages.protein, goals.protein)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Carbs (g)</span>
              <span>{averages.carbs} / {goals.carbs}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getGoalProgress(averages.carbs, goals.carbs)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Fat (g)</span>
              <span>{averages.fat} / {goals.fat}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getGoalProgress(averages.fat, goals.fat)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const averages = getAverageMacros();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nutrition Analytics</h1>
          <p className="text-gray-600">Track your nutrition patterns and get insights</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Timeframe Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {(['week', 'month', 'quarter'] as const).map(timeframe => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {averages.calories}
            </div>
            <div className="text-sm text-gray-600">Avg Calories</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {averages.protein}g
            </div>
            <div className="text-sm text-gray-600">Avg Protein</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {averages.carbs}g
            </div>
            <div className="text-sm text-gray-600">Avg Carbs</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {averages.fat}g
            </div>
            <div className="text-sm text-gray-600">Avg Fat</div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading nutrition analytics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderMacroChart()}
            {renderGoalProgress()}
          </div>
        )}
      </div>
    </div>
  );
}
