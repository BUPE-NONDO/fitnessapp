import React from 'react';
import { Link } from 'react-router-dom';
import { Workout, WorkoutType, WorkoutDifficulty } from '@aurafit/shared/types/workout';

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const getDifficultyColor = (difficulty: WorkoutDifficulty) => {
    switch (difficulty) {
      case WorkoutDifficulty.BEGINNER:
        return 'bg-green-100 text-green-800';
      case WorkoutDifficulty.INTERMEDIATE:
        return 'bg-yellow-100 text-yellow-800';
      case WorkoutDifficulty.ADVANCED:
        return 'bg-orange-100 text-orange-800';
      case WorkoutDifficulty.EXPERT:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkoutTypeIcon = (type: WorkoutType) => {
    switch (type) {
      case WorkoutType.STRENGTH:
        return '💪';
      case WorkoutType.CARDIO:
        return '🏃‍♂️';
      case WorkoutType.FLEXIBILITY:
        return '🧘‍♀️';
      case WorkoutType.HIIT:
        return '⚡';
      case WorkoutType.CIRCUIT:
        return '🔄';
      case WorkoutType.ENDURANCE:
        return '🏃‍♀️';
      case WorkoutType.POWER:
        return '💥';
      case WorkoutType.RECOVERY:
        return '😌';
      case WorkoutType.WARM_UP:
        return '🔥';
      case WorkoutType.COOL_DOWN:
        return '❄️';
      default:
        return '🏋️';
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const getTotalExercises = () => {
    return workout.exercises.length;
  };

  const getTotalSets = () => {
    return workout.exercises.reduce((total, exercise) => total + exercise.sets, 0);
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {/* Workout Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{getWorkoutTypeIcon(workout.type)}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {workout.name}
              </h3>
              <p className="text-sm text-gray-600 capitalize">
                {workout.type.replace('_', ' ')}
              </p>
            </div>
          </div>
          
          {/* Difficulty Badge */}
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(workout.difficulty)}`}>
            {workout.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {workout.description}
        </p>

        {/* Workout Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-purple-600">
              {formatDuration(workout.duration)}
            </div>
            <div className="text-xs text-gray-500">Duration</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-blue-600">
              {getTotalExercises()}
            </div>
            <div className="text-xs text-gray-500">Exercises</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">
              {getTotalSets()}
            </div>
            <div className="text-xs text-gray-500">Sets</div>
          </div>
        </div>
      </div>

      {/* Exercise Preview */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Exercises:</h4>
        <div className="space-y-1">
          {workout.exercises.slice(0, 3).map((exercise, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              <span className="flex-1 truncate">
                {exercise.exercise?.name || `Exercise ${index + 1}`}
              </span>
              <span className="text-xs text-gray-500">
                {exercise.sets}×{exercise.reps || 'time'}
              </span>
            </div>
          ))}
          {workout.exercises.length > 3 && (
            <div className="text-xs text-gray-500 mt-1">
              +{workout.exercises.length - 3} more exercises
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0">
        <div className="flex gap-2">
          <Link
            to={`/workouts/${workout.id}`}
            className="btn-primary flex-1 text-center"
          >
            View Details
          </Link>
          <button className="btn-secondary px-3">
            <span className="text-lg">▶️</span>
          </button>
        </div>
      </div>
    </div>
  );
}
