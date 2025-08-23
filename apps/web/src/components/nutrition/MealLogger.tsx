import React, { useState } from 'react';
import { Meal, MealType } from '@aurafit/shared/types/nutrition';

interface MealLoggerProps {
  mealType: MealType;
  onSave: (meal: Meal) => void;
  onCancel: () => void;
}

export default function MealLogger({ mealType, onSave, onCancel }: MealLoggerProps) {
  const [mealName, setMealName] = useState('');
  const [mealTime, setMealTime] = useState(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  });

  const handleSave = () => {
    if (!mealName.trim()) return;

    const meal: Meal = {
      id: Date.now().toString(),
      name: mealName,
      type: mealType,
      time: mealTime,
      foods: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbohydrates: 0,
      totalFat: 0
    };

    onSave(meal);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Add {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        </h2>
        <div className="flex space-x-2">
          <button onClick={onCancel} className="btn-secondary text-sm px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!mealName.trim()}
            className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Meal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meal Name
          </label>
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            placeholder={`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} name`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time
          </label>
          <input
            type="time"
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500">
        <p>Food selection feature coming soon!</p>
        <p className="text-sm">For now, you can create a basic meal entry.</p>
      </div>
    </div>
  );
}
