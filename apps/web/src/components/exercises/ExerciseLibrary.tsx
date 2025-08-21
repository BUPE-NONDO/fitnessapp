import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { exerciseService } from '../../services/exerciseService';
import { 
  Exercise, 
  ExerciseCategory, 
  MuscleGroup, 
  Equipment, 
  Difficulty,
  ExerciseFilters 
} from '@aurafit/shared/types/exercise';
import ExerciseCard from './ExerciseCard';
import ExerciseFilters from './ExerciseFilters';
import ExerciseSearch from './ExerciseSearch';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ExerciseFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'difficulty' | 'category' | 'createdAt'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const {
    data: searchResult,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['exercises', searchQuery, filters, currentPage, sortBy, sortOrder],
    queryFn: () => exerciseService.getPublicExercises({
      query: searchQuery,
      filters,
      page: currentPage,
      limit: 20,
      sortBy,
      sortOrder
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters: ExerciseFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy: typeof sortBy, newSortOrder: typeof sortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Exercise Library
            </h1>
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              Failed to load exercises. Please try again.
            </div>
            <button
              onClick={() => refetch()}
              className="mt-4 btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Exercise Library
          </h1>
          <p className="text-gray-600">
            Discover and explore exercises for your fitness journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Search */}
          <div className="lg:col-span-2">
            <ExerciseSearch
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search exercises..."
            />
          </div>

          {/* Sort */}
          <div className="lg:col-span-2">
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as typeof sortBy, sortOrder)}
                className="input-field flex-1"
              >
                <option value="name">Sort by Name</option>
                <option value="difficulty">Sort by Difficulty</option>
                <option value="category">Sort by Category</option>
                <option value="createdAt">Sort by Date</option>
              </select>
              <button
                onClick={() => handleSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
                className="btn-secondary px-4"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ExerciseFilters
              filters={filters}
              onChange={handleFiltersChange}
            />
          </div>

          {/* Exercise Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {/* Results Info */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    {searchResult?.total || 0} exercises found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>

                {/* Exercise Grid */}
                {searchResult?.exercises && searchResult.exercises.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {searchResult.exercises.map((exercise) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🏋️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No exercises found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {searchResult && searchResult.totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: searchResult.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-lg ${
                            currentPage === page
                              ? 'bg-purple-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === searchResult.totalPages}
                        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
