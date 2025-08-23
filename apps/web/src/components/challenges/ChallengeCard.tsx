import React from 'react';
import { Link } from 'react-router-dom';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'workout' | 'nutrition' | 'strength' | 'endurance' | 'weight-loss' | 'general';
  duration: number; // in days
  participants: number;
  maxParticipants?: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rewards: string[];
  progress?: {
    current: number;
    target: number;
    unit: string;
  };
  userRank?: number;
  isJoined?: boolean;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: (challengeId: string) => void;
  onLeave?: (challengeId: string) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onJoin, onLeave }) => {
  const getTypeIcon = (type: Challenge['type']) => {
    const icons = {
      workout: '💪',
      nutrition: '🥗',
      strength: '🏋️',
      endurance: '🏃',
      'weight-loss': '⚖️',
      general: '🎯'
    };
    return icons[type];
  };

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[difficulty];
  };

  const getStatusColor = (status: Challenge['status']) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      completed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    };
    return colors[status];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateProgressPercentage = () => {
    if (!challenge.progress) return 0;
    return Math.min((challenge.progress.current / challenge.progress.target) * 100, 100);
  };

  const getDaysRemaining = () => {
    const endDate = new Date(challenge.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  return (
    <div className="card hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getTypeIcon(challenge.type)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {challenge.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {challenge.duration} days • {challenge.participants} participants
              {challenge.maxParticipants && ` / ${challenge.maxParticipants}`}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
            {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
        {challenge.description}
      </p>

      {/* Progress Bar */}
      {challenge.progress && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{challenge.progress.current} / {challenge.progress.target} {challenge.progress.unit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${calculateProgressPercentage()}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* User Rank */}
      {challenge.userRank && (
        <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Your Rank
            </span>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
              #{challenge.userRank}
            </span>
          </div>
        </div>
      )}

      {/* Rewards */}
      {challenge.rewards.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rewards</h4>
          <div className="flex flex-wrap gap-2">
            {challenge.rewards.map((reward, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs rounded-full"
              >
                🏆 {reward}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dates and Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <div>Start: {formatDate(challenge.startDate)}</div>
          <div>End: {formatDate(challenge.endDate)}</div>
          {challenge.status === 'active' && (
            <div className="text-orange-600 dark:text-orange-400 font-medium">
              {getDaysRemaining()} days remaining
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/challenges/${challenge.id}`}
            className="btn-secondary text-sm px-4 py-2"
          >
            View Details
          </Link>
          {challenge.isJoined ? (
            <button
              onClick={() => onLeave?.(challenge.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Leave
            </button>
          ) : (
            <button
              onClick={() => onJoin?.(challenge.id)}
              disabled={challenge.status === 'completed'}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Challenge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
