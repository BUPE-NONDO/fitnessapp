import React, { useState } from 'react';
import { WorkoutFilters as WorkoutFiltersType, WorkoutType, WorkoutDifficulty } from '@aurafit/shared/types/workout';

interface WorkoutFiltersProps {
  filters: WorkoutFiltersType;
  onChange: (filters: WorkoutFiltersType) => void;
}

export default function WorkoutFilters({ filters, onChange }: WorkoutFiltersProps) {
  const [durationRange, setDurationRange] = useState({
    min: filters.duration?.min || '',
    max: filters.duration?.max || ''
  });

  const handleCategoryChange = (type: WorkoutType | undefined) => {
    onChange({ ...filters, type });
  };

  const handleDifficultyChange = (difficulty: WorkoutDifficulty | undefined) => {
    onChange({ ...filters, difficulty });
  };

  const handleDurationChange = (field: 'min' | 'max', value: string) => {
    const newRange = { ...durationRange, [field]: value };
    setDurationRange(newRange);
    
    const duration = {
      min: newRange.min ? parseInt(newRange.min) : undefined,
      max: newRange.max ? parseInt(newRange.max) : undefined
    };
    
    onChange({ ...filters, duration });
  };

  const clearFilters = () => {
    setDurationRange({ min: '', max: '' });
    onChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof WorkoutFiltersType];
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

      {/* Workout Type Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Workout Type</h4>
        <select
          value={filters.type || ''}
          onChange={(e) => handleCategoryChange(e.target.value ? e.target.value as WorkoutType : undefined)}
          className="input-field w-full"
        >
          <option value="">All Types</option>
          {Object.values(WorkoutType).map((type) => (
            <option key={type} value={type}>
              {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Difficulty</h4>
        <select
          value={filters.difficulty || ''}
          onChange={(e) => handleDifficultyChange(e.target.value ? e.target.value as WorkoutDifficulty : undefined)}
          className="input-field w-full"
        >
          <option value="">All Difficulties</option>
          {Object.values(WorkoutDifficulty).map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Duration Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Duration (minutes)</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min</label>
            <input
              type="number"
              min="1"
              max="480"
              value={durationRange.min}
              onChange={(e) => handleDurationChange('min', e.target.value)}
              className="input-field w-full"
              placeholder="1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max</label>
            <input
              type="number"
              min="1"
              max="480"
              value={durationRange.max}
              onChange={(e) => handleDurationChange('max', e.target.value)}
              className="input-field w-full"
              placeholder="120"
            />
          </div>
        </div>
      </div>

      {/* Quick Duration Presets */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Filters</h4>
        <div className="space-y-2">
          <button
            onClick={() => {
              setDurationRange({ min: '15', max: '30' });
              onChange({ ...filters, duration: { min: 15, max: 30 } });
            }}
            className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Quick (15-30 min)
          </button>
          <button
            onClick={() => {
              setDurationRange({ min: '30', max: '60' });
              onChange({ ...filters, duration: { min: 30, max: 60 } });
            }}
            className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Standard (30-60 min)
          </button>
          <button
            onClick={() => {
              setDurationRange({ min: '60', max: '' });
              onChange({ ...filters, duration: { min: 60 } });
            }}
            className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Extended (60+ min)
          </button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
          <div className="space-y-1">
            {filters.type && (
              <div className="text-xs text-gray-600">
                Type: {filters.type.replace('_', ' ')}
              </div>
            )}
            {filters.difficulty && (
              <div className="text-xs text-gray-600">
                Difficulty: {filters.difficulty}
              </div>
            )}
            {filters.duration && (
              <div className="text-xs text-gray-600">
                Duration: {filters.duration.min || 0}-{filters.duration.max || '∞'} min
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
