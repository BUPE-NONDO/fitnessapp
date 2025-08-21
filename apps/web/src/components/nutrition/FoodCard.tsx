import React from 'react';
import { FoodItem, FoodCategory } from '@aurafit/shared/types/nutrition';

interface FoodCardProps {
  food: FoodItem;
}

const categoryIcons: Record<FoodCategory, string> = {
  fruits: '🍎',
  vegetables: '🥬',
  grains: '🌾',
  protein: '🥩',
  dairy: '🥛',
  fats: '🥑',
  beverages: '🥤',
  snacks: '🍿',
  condiments: '🧂',
  supplements: '💊',
  custom: '📝'
};

const categoryColors: Record<FoodCategory, string> = {
  fruits: 'bg-red-100 text-red-800',
  vegetables: 'bg-green-100 text-green-800',
  grains: 'bg-yellow-100 text-yellow-800',
  protein: 'bg-red-100 text-red-800',
  dairy: 'bg-blue-100 text-blue-800',
  fats: 'bg-green-100 text-green-800',
  beverages: 'bg-blue-100 text-blue-800',
  snacks: 'bg-orange-100 text-orange-800',
  condiments: 'bg-gray-100 text-gray-800',
  supplements: 'bg-purple-100 text-purple-800',
  custom: 'bg-indigo-100 text-indigo-800'
};

export default function FoodCard({ food }: FoodCardProps) {
  const getCalorieColor = (calories: number) => {
    if (calories <= 100) return 'text-green-600';
    if (calories <= 300) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProteinColor = (protein: number) => {
    if (protein >= 20) return 'text-green-600';
    if (protein >= 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {food.name}
            </h3>
            {food.brand && (
              <p className="text-sm text-gray-600 mb-2">
                {food.brand}
              </p>
            )}
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${categoryColors[food.category]}`}>
                {categoryIcons[food.category]} {food.category}
              </span>
              {food.isCustom && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  📝 Custom
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Serving Size */}
      <div className="px-4 py-3 bg-gray-50">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Serving Size:</span> {food.servingSize}
        </p>
      </div>

      {/* Nutritional Information */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Calories */}
          <div className="text-center">
            <div className={`text-2xl font-bold ${getCalorieColor(food.calories)}`}>
              {food.calories}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Calories
            </div>
          </div>

          {/* Protein */}
          <div className="text-center">
            <div className={`text-xl font-semibold ${getProteinColor(food.protein)}`}>
              {food.protein}g
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Protein
            </div>
          </div>
        </div>

        {/* Macros */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Carbohydrates:</span>
            <span className="font-medium">{food.carbohydrates}g</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Fat:</span>
            <span className="font-medium">{food.fat}g</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Fiber:</span>
            <span className="font-medium">{food.fiber}g</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sugar:</span>
            <span className="font-medium">{food.sugar}g</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sodium:</span>
            <span className="font-medium">{food.sodium}mg</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <button className="flex-1 btn-primary text-sm py-2">
              Add to Meal
            </button>
            <button className="flex-1 btn-secondary text-sm py-2">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
