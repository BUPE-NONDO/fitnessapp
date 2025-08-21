import React from 'react';
import { ExerciseFilters as ExerciseFiltersType, ExerciseCategory, MuscleGroup, Equipment, Difficulty } from '@aurafit/shared/types/exercise';

interface ExerciseFiltersProps {
  filters: ExerciseFiltersType;
  onChange: (filters: ExerciseFiltersType) => void;
}

export default function ExerciseFilters({ filters, onChange }: ExerciseFiltersProps) {
  const handleCategoryChange = (category: ExerciseCategory | undefined) => {
    onChange({ ...filters, category });
  };

  const handleDifficultyChange = (difficulty: Difficulty | undefined) => {
    onChange({ ...filters, difficulty });
  };

  const handleMuscleGroupChange = (muscleGroup: MuscleGroup) => {
    const currentGroups = filters.muscleGroups || [];
    const newGroups = currentGroups.includes(muscleGroup)
      ? currentGroups.filter(mg => mg !== muscleGroup)
      : [...currentGroups, muscleGroup];
    
    onChange({ ...filters, muscleGroups: newGroups.length > 0 ? newGroups : undefined });
  };

  const handleEquipmentChange = (equipment: Equipment) => {
    const currentEquipment = filters.equipment || [];
    const newEquipment = currentEquipment.includes(equipment)
      ? currentEquipment.filter(eq => eq !== equipment)
      : [...currentEquipment, equipment];
    
    onChange({ ...filters, equipment: newEquipment.length > 0 ? newEquipment : undefined });
  };

  const clearFilters = () => {
    onChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof ExerciseFiltersType];
    return value !== undefined && value !== null && 
           (Array.isArray(value) ? value.length > 0 : true);
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-purple-600 hover:text-purple-700"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Category</h4>
        <select
          value={filters.category || ''}
          onChange={(e) => handleCategoryChange(e.target.value ? e.target.value as ExerciseCategory : undefined)}
          className="input-field w-full"
        >
          <option value="">All Categories</option>
          {Object.values(ExerciseCategory).map((category) => (
            <option key={category} value={category}>
              {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Difficulty</h4>
        <select
          value={filters.difficulty || ''}
          onChange={(e) => handleDifficultyChange(e.target.value ? e.target.value as Difficulty : undefined)}
          className="input-field w-full"
        >
          <option value="">All Difficulties</option>
          {Object.values(Difficulty).map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Muscle Groups Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Muscle Groups</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {Object.values(MuscleGroup).map((muscleGroup) => (
            <label key={muscleGroup} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.muscleGroups?.includes(muscleGroup) || false}
                onChange={() => handleMuscleGroupChange(muscleGroup)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">
                {muscleGroup.replace('_', ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Equipment Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Equipment</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {Object.values(Equipment).map((equipment) => (
            <label key={equipment} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.equipment?.includes(equipment) || false}
                onChange={() => handleEquipmentChange(equipment)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">
                {equipment.replace('_', ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
          <div className="space-y-1">
            {filters.category && (
              <div className="text-xs text-gray-600">
                Category: {filters.category.replace('_', ' ')}
              </div>
            )}
            {filters.difficulty && (
              <div className="text-xs text-gray-600">
                Difficulty: {filters.difficulty}
              </div>
            )}
            {filters.muscleGroups && filters.muscleGroups.length > 0 && (
              <div className="text-xs text-gray-600">
                Muscle Groups: {filters.muscleGroups.length} selected
              </div>
            )}
            {filters.equipment && filters.equipment.length > 0 && (
              <div className="text-xs text-gray-600">
                Equipment: {filters.equipment.length} selected
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
