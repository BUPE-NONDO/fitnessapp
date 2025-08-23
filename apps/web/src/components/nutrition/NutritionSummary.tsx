import React from 'react';
import { NutritionLog } from '@aurafit/shared/types/nutrition';

interface NutritionSummaryProps {
  nutritionLog: NutritionLog | null;
}

export default function NutritionSummary({ nutritionLog }: NutritionSummaryProps) {
  if (!nutritionLog) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📊 Daily Summary
        </h3>
        <div className="text-center text-gray-500">
          <p>No nutrition data for today</p>
          <p className="text-sm">Start logging meals to see your summary</p>
        </div>
      </div>
    );
  }

  const {
    totalCalories,
    totalProtein,
    totalCarbohydrates,
    totalFat,
    totalFiber,
    totalSugar,
    totalSodium,
    waterIntake
  } = nutritionLog;

  // Example daily goals (in a real app, these would come from user settings)
  const goals = {
    calories: 2000,
    protein: 150,
    carbohydrates: 250,
    fat: 65,
    fiber: 25,
    sugar: 50,
    sodium: 2300,
    water: 2500
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📊 Daily Summary
      </h3>

      {/* Calories */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Calories</span>
          <span className="text-sm text-gray-600">
            {Math.round(totalCalories)} / {goals.calories}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(getProgressPercentage(totalCalories, goals.calories))}`}
            style={{ width: `${getProgressPercentage(totalCalories, goals.calories)}%` }}
          ></div>
        </div>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-1 gap-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Protein</span>
          <span className="text-sm font-medium">
            {Math.round(totalProtein)}g / {goals.protein}g
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Carbohydrates</span>
          <span className="text-sm font-medium">
            {Math.round(totalCarbohydrates)}g / {goals.carbohydrates}g
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-700">Fat</span>
          <span className="text-sm font-medium">
            {Math.round(totalFat)}g / {goals.fat}g
          </span>
        </div>
      </div>

      {/* Other Nutrients */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Fiber:</span>
            <span className="ml-1 font-medium">{Math.round(totalFiber)}g</span>
          </div>
          <div>
            <span className="text-gray-600">Sugar:</span>
            <span className="ml-1 font-medium">{Math.round(totalSugar)}g</span>
          </div>
          <div>
            <span className="text-gray-600">Sodium:</span>
            <span className="ml-1 font-medium">{Math.round(totalSodium)}mg</span>
          </div>
          <div>
            <span className="text-gray-600">Water:</span>
            <span className="ml-1 font-medium">{waterIntake}ml</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">
              {nutritionLog.meals.length}
            </div>
            <div className="text-xs text-gray-600">Meals</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-900">
              {nutritionLog.meals.reduce((total, meal) => total + meal.foods.length, 0)}
            </div>
            <div className="text-xs text-gray-600">Foods</div>
          </div>
        </div>
      </div>
    </div>
  );
}
