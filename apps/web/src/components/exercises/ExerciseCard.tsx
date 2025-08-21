import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Exercise, ExerciseCategory, MuscleGroup, Equipment, Difficulty } from '@aurafit/shared/types/exercise';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [imageError, setImageError] = useState(false);

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case Difficulty.BEGINNER:
        return 'bg-green-100 text-green-800';
      case Difficulty.INTERMEDIATE:
        return 'bg-yellow-100 text-yellow-800';
      case Difficulty.ADVANCED:
        return 'bg-orange-100 text-orange-800';
      case Difficulty.EXPERT:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: ExerciseCategory) => {
    switch (category) {
      case ExerciseCategory.STRENGTH:
        return '💪';
      case ExerciseCategory.CARDIO:
        return '🏃‍♂️';
      case ExerciseCategory.FLEXIBILITY:
        return '🧘‍♀️';
      case ExerciseCategory.BALANCE:
        return '⚖️';
      case ExerciseCategory.SPORTS:
        return '⚽';
      case ExerciseCategory.FUNCTIONAL:
        return '🎯';
      case ExerciseCategory.YOGA:
        return '🧘‍♂️';
      case ExerciseCategory.PILATES:
        return '🤸‍♀️';
      case ExerciseCategory.CROSSFIT:
        return '🔥';
      case ExerciseCategory.BODYWEIGHT:
        return '🏋️';
      default:
        return '💪';
    }
  };

  const formatMuscleGroups = (muscleGroups: MuscleGroup[]) => {
    return muscleGroups.slice(0, 3).join(', ') + (muscleGroups.length > 3 ? '...' : '');
  };

  const formatEquipment = (equipment: Equipment[]) => {
    if (equipment.length === 0) return 'None';
    return equipment.slice(0, 2).join(', ') + (equipment.length > 2 ? '...' : '');
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {/* Exercise Image */}
      <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        {exercise.imageUrl && !imageError ? (
          <img
            src={exercise.imageUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
            <div className="text-4xl">{getCategoryIcon(exercise.category)}</div>
          </div>
        )}
        
        {/* Difficulty Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
            {exercise.difficulty}
          </span>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="p-4">
        {/* Title and Category */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {exercise.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">{getCategoryIcon(exercise.category)}</span>
            <span className="capitalize">{exercise.category.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {exercise.description}
        </p>

        {/* Muscle Groups */}
        <div className="mb-3">
          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
            Muscle Groups
          </h4>
          <p className="text-sm text-gray-600">
            {formatMuscleGroups(exercise.muscleGroups)}
          </p>
        </div>

        {/* Equipment */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-1">
            Equipment
          </h4>
          <p className="text-sm text-gray-600">
            {formatEquipment(exercise.equipment)}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/exercises/${exercise.id}`}
            className="btn-primary flex-1 text-center"
          >
            View Details
          </Link>
          <button className="btn-secondary px-3">
            <span className="text-lg">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}
