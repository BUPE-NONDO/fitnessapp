import React from 'react';
import { FoodCategory } from '@aurafit/shared/types/nutrition';

interface FoodFiltersProps {
  filters: {
    category?: FoodCategory;
    maxCalories?: number;
    minProtein?: number;
    maxSugar?: number;
    isCustom?: boolean;
  };
  onFiltersChange: (filters: FoodFiltersProps['filters']) => void;
  onClearAll: () => void;
}

const foodCategories = [
  { value: 'fruits', label: '🍎 Fruits', icon: '🍎' },
  { value: 'vegetables', label: '🥬 Vegetables', icon: '🥬' },
  { value: 'grains', label: '🌾 Grains', icon: '🌾' },
  { value: 'protein', label: '🥩 Protein', icon: '🥩' },
  { value: 'dairy', label: '🥛 Dairy', icon: '🥛' },
  { value: 'fats', label: '🥑 Fats', icon: '🥑' },
  { value: 'beverages', label: '🥤 Beverages', icon: '🥤' },
  { value: 'snacks', label: '🍿 Snacks', icon: '🍿' },
  { value: 'condiments', label: '🧂 Condiments', icon: '🧂' },
  { value: 'supplements', label: '💊 Supplements', icon: '💊' },
  { value: 'custom', label: '📝 Custom', icon: '📝' }
];

export default function FoodFilters({ filters, onFiltersChange, onClearAll }: FoodFiltersProps) {
  const handleCategoryChange = (category: FoodCategory | undefined) => {
    onFiltersChange({ ...filters, category });
  };

  const handleMaxCaloriesChange = (value: string) => {
    const maxCalories = value ? parseInt(value) : undefined;
    onFiltersChange({ ...filters, maxCalories });
  };

  const handleMinProteinChange = (value: string) => {
    const minProtein = value ? parseInt(value) : undefined;
    onFiltersChange({ ...filters, minProtein });
  };

  const handleMaxSugarChange = (value: string) => {
    const maxSugar = value ? parseInt(value) : undefined;
    onFiltersChange({ ...filters, maxSugar });
  };

  const handleCustomChange = (isCustom: boolean | undefined) => {
    onFiltersChange({ ...filters, isCustom });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={filters.category === undefined}
                onChange={() => handleCategoryChange(undefined)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">All Categories</span>
            </label>
            {foodCategories.map((category) => (
              <label key={category.value} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category.value}
                  checked={filters.category === category.value}
                  onChange={(e) => handleCategoryChange(e.target.value as FoodCategory)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {category.icon} {category.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Calorie Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Max Calories</h4>
          <input
            type="number"
            placeholder="e.g., 500"
            value={filters.maxCalories || ''}
            onChange={(e) => handleMaxCaloriesChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Protein Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Min Protein (g)</h4>
          <input
            type="number"
            placeholder="e.g., 10"
            value={filters.minProtein || ''}
            onChange={(e) => handleMinProteinChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Sugar Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Max Sugar (g)</h4>
          <input
            type="number"
            placeholder="e.g., 20"
            value={filters.maxSugar || ''}
            onChange={(e) => handleMaxSugarChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Custom Foods Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Food Type</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="custom"
                checked={filters.isCustom === undefined}
                onChange={() => handleCustomChange(undefined)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">All Foods</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="custom"
                checked={filters.isCustom === false}
                onChange={() => handleCustomChange(false)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Database Foods</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="custom"
                checked={filters.isCustom === true}
                onChange={() => handleCustomChange(true)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">Custom Foods</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
