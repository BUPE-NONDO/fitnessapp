import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { nutritionService } from '../../services/nutritionService';
import { FoodCategory } from '@aurafit/shared/types/nutrition';
import FoodSearch from './FoodSearch';
import FoodFilters from './FoodFilters';
import FoodCard from './FoodCard';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function FoodDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: undefined as FoodCategory | undefined,
    maxCalories: undefined as number | undefined,
    minProtein: undefined as number | undefined,
    maxSugar: undefined as number | undefined,
    isCustom: undefined as boolean | undefined
  });
  const [sortBy, setSortBy] = useState<'name' | 'calories' | 'protein' | 'createdAt'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const {
    data: foodData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['foods', searchTerm, filters, sortBy, sortOrder],
    queryFn: () => nutritionService.getFoods({
      search: searchTerm || undefined,
      category: filters.category,
      page: 1,
      limit: 50,
      sortBy,
      sortOrder
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy: typeof sortBy, newSortOrder: typeof sortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const clearAllFilters = () => {
    setFilters({
      category: undefined,
      maxCalories: undefined,
      minProtein: undefined,
      maxSugar: undefined,
      isCustom: undefined
    });
    setSearchTerm('');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Food Database
            </h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">
                Error loading food database. Please try again.
              </p>
              <button
                onClick={() => refetch()}
                className="mt-2 btn-primary"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              🍎 Food Database
            </h1>
            <p className="mt-2 text-gray-600">
              Search and browse our comprehensive food database with detailed nutritional information.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FoodFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearAll={clearAllFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort */}
            <div className="mb-6 space-y-4">
              <FoodSearch onSearch={handleSearch} />
              
              {/* Sort Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">
                    Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as typeof sortBy, sortOrder)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="name">Name</option>
                    <option value="calories">Calories</option>
                    <option value="protein">Protein</option>
                    <option value="createdAt">Date Added</option>
                  </select>
                  <button
                    onClick={() => handleSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>

                {foodData && (
                  <div className="text-sm text-gray-600">
                    {foodData.total} foods found
                  </div>
                )}
              </div>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="large" />
              </div>
            ) : foodData?.foods.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  <p className="text-lg font-medium mb-2">No foods found</p>
                  <p className="text-sm">
                    Try adjusting your search terms or filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 btn-secondary"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {foodData?.foods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {foodData && foodData.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    disabled={foodData.page <= 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-3 py-2 text-sm text-gray-700">
                    Page {foodData.page} of {foodData.totalPages}
                  </span>
                  <button
                    disabled={foodData.page >= foodData.totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
