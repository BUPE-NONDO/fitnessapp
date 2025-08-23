import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  id: string;
  rank: number;
  userId: string;
  username: string;
  avatar?: string;
  score: number;
  progress: {
    current: number;
    target: number;
    unit: string;
    percentage: number;
  };
  lastActivity: string;
  streak: number;
  achievements: string[];
}

interface LeaderboardProps {
  challengeId: string;
  challengeTitle: string;
  maxParticipants?: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ challengeId, challengeTitle, maxParticipants }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'all' | 'week' | 'month'>('all');

  // Mock leaderboard data
  const mockLeaderboard: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      userId: 'user1',
      username: 'FitnessFanatic',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      score: 95,
      progress: {
        current: 58,
        target: 60,
        unit: 'push-ups',
        percentage: 96.7
      },
      lastActivity: '2025-01-27T10:30:00Z',
      streak: 27,
      achievements: ['Early Bird', 'Consistency King', 'Speed Demon']
    },
    {
      id: '2',
      rank: 2,
      userId: 'user2',
      username: 'GymGuru',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      score: 92,
      progress: {
        current: 55,
        target: 60,
        unit: 'push-ups',
        percentage: 91.7
      },
      lastActivity: '2025-01-27T09:15:00Z',
      streak: 25,
      achievements: ['Consistency King', 'Team Player']
    },
    {
      id: '3',
      rank: 3,
      userId: 'user3',
      username: 'WorkoutWarrior',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      score: 88,
      progress: {
        current: 52,
        target: 60,
        unit: 'push-ups',
        percentage: 86.7
      },
      lastActivity: '2025-01-27T08:45:00Z',
      streak: 23,
      achievements: ['Early Bird']
    },
    {
      id: '4',
      rank: 4,
      userId: 'user4',
      username: 'StrengthSeeker',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      score: 85,
      progress: {
        current: 50,
        target: 60,
        unit: 'push-ups',
        percentage: 83.3
      },
      lastActivity: '2025-01-27T07:30:00Z',
      streak: 20,
      achievements: ['Consistency King']
    },
    {
      id: '5',
      rank: 5,
      userId: 'user5',
      username: 'PowerLifter',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      score: 82,
      progress: {
        current: 48,
        target: 60,
        unit: 'push-ups',
        percentage: 80.0
      },
      lastActivity: '2025-01-27T06:20:00Z',
      streak: 18,
      achievements: []
    },
    {
      id: '6',
      rank: 6,
      userId: 'user6',
      username: 'CardioQueen',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
      score: 78,
      progress: {
        current: 45,
        target: 60,
        unit: 'push-ups',
        percentage: 75.0
      },
      lastActivity: '2025-01-26T22:15:00Z',
      streak: 15,
      achievements: ['Night Owl']
    },
    {
      id: '7',
      rank: 7,
      userId: 'user7',
      username: 'FlexibilityFirst',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face',
      score: 75,
      progress: {
        current: 42,
        target: 60,
        unit: 'push-ups',
        percentage: 70.0
      },
      lastActivity: '2025-01-26T21:00:00Z',
      streak: 12,
      achievements: []
    },
    {
      id: '8',
      rank: 8,
      userId: 'user8',
      username: 'EnduranceElite',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      score: 72,
      progress: {
        current: 40,
        target: 60,
        unit: 'push-ups',
        percentage: 66.7
      },
      lastActivity: '2025-01-26T19:45:00Z',
      streak: 10,
      achievements: []
    },
    {
      id: '9',
      rank: 9,
      userId: 'user9',
      username: 'MuscleMaster',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      score: 68,
      progress: {
        current: 38,
        target: 60,
        unit: 'push-ups',
        percentage: 63.3
      },
      lastActivity: '2025-01-26T18:30:00Z',
      streak: 8,
      achievements: []
    },
    {
      id: '10',
      rank: 10,
      userId: 'user10',
      username: 'FitnessFreak',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      score: 65,
      progress: {
        current: 35,
        target: 60,
        unit: 'push-ups',
        percentage: 58.3
      },
      lastActivity: '2025-01-26T17:15:00Z',
      streak: 6,
      achievements: []
    }
  ];

  useEffect(() => {
    loadLeaderboard();
  }, [challengeId, timeframe]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setLeaderboard(mockLeaderboard);
      setError(null);
    } catch (err) {
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    if (rank === 2) return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    if (rank === 3) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    return 'bg-white dark:bg-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Leaderboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {challengeTitle} • {leaderboard.length} participants
            {maxParticipants && ` / ${maxParticipants}`}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              timeframe === 'all'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setTimeframe('week')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              timeframe === 'week'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              timeframe === 'month'
                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Rank</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">User</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Score</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Progress</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Streak</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr
                key={entry.id}
                className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${getRankColor(entry.rank)}`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{getRankIcon(entry.rank)}</span>
                    {entry.rank > 3 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        #{entry.rank}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={entry.avatar || 'https://via.placeholder.com/40'}
                      alt={entry.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {entry.username}
                      </div>
                      {entry.achievements.length > 0 && (
                        <div className="flex space-x-1 mt-1">
                          {entry.achievements.slice(0, 2).map((achievement, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs rounded-full"
                            >
                              {achievement}
                            </span>
                          ))}
                          {entry.achievements.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 text-xs rounded-full">
                              +{entry.achievements.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {entry.score}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    points
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {entry.progress.current} / {entry.progress.target}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {entry.progress.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${entry.progress.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {entry.progress.unit}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🔥</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {entry.streak}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      days
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {formatLastActivity(entry.lastActivity)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Your Position */}
      <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-lg">👤</span>
            <div>
              <div className="font-medium text-purple-900 dark:text-purple-100">
                Your Position
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">
                Keep up the great work!
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              #3
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300">
              Top 10%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
