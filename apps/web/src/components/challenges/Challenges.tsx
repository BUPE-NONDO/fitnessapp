import React, { useState, useEffect } from 'react';
import ChallengeCard from './ChallengeCard';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'workout' | 'nutrition' | 'strength' | 'endurance' | 'weight-loss' | 'general';
  duration: number;
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

const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    difficulty: 'all',
    joined: false
  });

  // Mock data for challenges
  const mockChallenges: Challenge[] = [
    {
      id: '1',
      title: '30-Day Push-Up Challenge',
      description: 'Build upper body strength with a progressive push-up challenge. Start with 5 push-ups and increase by 2 each day.',
      type: 'strength',
      duration: 30,
      participants: 1247,
      maxParticipants: 2000,
      startDate: '2025-01-15',
      endDate: '2025-02-14',
      status: 'active',
      difficulty: 'beginner',
      rewards: ['Strength Badge', '100 Points', 'Exclusive Avatar'],
      progress: {
        current: 45,
        target: 60,
        unit: 'push-ups'
      },
      userRank: 3,
      isJoined: true
    },
    {
      id: '2',
      title: 'Clean Eating Challenge',
      description: 'Focus on whole foods and eliminate processed foods for 21 days. Track your meals and share healthy recipes.',
      type: 'nutrition',
      duration: 21,
      participants: 892,
      startDate: '2025-01-20',
      endDate: '2025-02-10',
      status: 'active',
      difficulty: 'intermediate',
      rewards: ['Nutrition Badge', '75 Points', 'Recipe Book'],
      progress: {
        current: 15,
        target: 21,
        unit: 'days'
      },
      userRank: 12,
      isJoined: true
    },
    {
      id: '3',
      title: 'Marathon Training',
      description: 'Complete a full marathon training program over 16 weeks. Includes running schedules and progress tracking.',
      type: 'endurance',
      duration: 112,
      participants: 156,
      maxParticipants: 500,
      startDate: '2025-02-01',
      endDate: '2025-05-24',
      status: 'upcoming',
      difficulty: 'advanced',
      rewards: ['Endurance Badge', '500 Points', 'Marathon Medal'],
      isJoined: false
    },
    {
      id: '4',
      title: 'Weight Loss Warriors',
      description: 'Join a supportive community focused on sustainable weight loss. Weekly check-ins and progress sharing.',
      type: 'weight-loss',
      duration: 90,
      participants: 2341,
      startDate: '2025-01-01',
      endDate: '2025-04-01',
      status: 'active',
      difficulty: 'intermediate',
      rewards: ['Weight Loss Badge', '200 Points', 'Fitness Tracker'],
      progress: {
        current: 8.5,
        target: 15,
        unit: 'lbs lost'
      },
      userRank: 7,
      isJoined: true
    },
    {
      id: '5',
      title: 'Home Workout Master',
      description: 'Complete 50 home workouts in 60 days. No gym required - bodyweight exercises only.',
      type: 'workout',
      duration: 60,
      participants: 567,
      startDate: '2025-01-10',
      endDate: '2025-03-11',
      status: 'active',
      difficulty: 'beginner',
      rewards: ['Home Workout Badge', '150 Points', 'Resistance Bands'],
      progress: {
        current: 32,
        target: 50,
        unit: 'workouts'
      },
      userRank: 5,
      isJoined: true
    },
    {
      id: '6',
      title: 'Summer Body Challenge',
      description: 'Get ready for summer with this comprehensive fitness challenge. Includes workouts, nutrition, and progress tracking.',
      type: 'general',
      duration: 45,
      participants: 1892,
      startDate: '2025-03-01',
      endDate: '2025-04-15',
      status: 'upcoming',
      difficulty: 'intermediate',
      rewards: ['Summer Body Badge', '300 Points', 'Beach Towel'],
      isJoined: false
    }
  ];

  useEffect(() => {
    loadChallenges();
  }, []);

  useEffect(() => {
    filterChallenges();
  }, [challenges, filters]);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setChallenges(mockChallenges);
      setError(null);
    } catch (err) {
      setError('Failed to load challenges');
    } finally {
      setLoading(false);
    }
  };

  const filterChallenges = () => {
    let filtered = [...challenges];

    if (filters.status !== 'all') {
      filtered = filtered.filter(challenge => challenge.status === filters.status);
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(challenge => challenge.type === filters.type);
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(challenge => challenge.difficulty === filters.difficulty);
    }

    if (filters.joined) {
      filtered = filtered.filter(challenge => challenge.isJoined);
    }

    setFilteredChallenges(filtered);
  };

  const handleJoinChallenge = async (challengeId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setChallenges(prev => prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, isJoined: true, participants: challenge.participants + 1 }
          : challenge
      ));
    } catch (err) {
      setError('Failed to join challenge');
    }
  };

  const handleLeaveChallenge = async (challengeId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setChallenges(prev => prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, isJoined: false, participants: challenge.participants - 1 }
          : challenge
      ));
    } catch (err) {
      setError('Failed to leave challenge');
    }
  };

  const getStatusCounts = () => {
    const counts = {
      active: challenges.filter(c => c.status === 'active').length,
      upcoming: challenges.filter(c => c.status === 'upcoming').length,
      completed: challenges.filter(c => c.status === 'completed').length,
      joined: challenges.filter(c => c.isJoined).length
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Community Challenges
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join fitness challenges, compete with others, and earn rewards
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Create Challenge
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="card text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {statusCounts.active}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {statusCounts.upcoming}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {statusCounts.joined}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Joined</div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {challenges.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="input-field max-w-xs"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="input-field max-w-xs"
            >
              <option value="all">All Types</option>
              <option value="workout">Workout</option>
              <option value="nutrition">Nutrition</option>
              <option value="strength">Strength</option>
              <option value="endurance">Endurance</option>
              <option value="weight-loss">Weight Loss</option>
              <option value="general">General</option>
            </select>

            <select
              value={filters.difficulty}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              className="input-field max-w-xs"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.joined}
                onChange={(e) => setFilters(prev => ({ ...prev, joined: e.target.checked }))}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Joined Only</span>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Challenges Grid */}
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No challenges found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters or create a new challenge
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
            >
              Create Challenge
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map(challenge => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onJoin={handleJoinChallenge}
                onLeave={handleLeaveChallenge}
              />
            ))}
          </div>
        )}

        {/* Create Challenge Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Create New Challenge
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Challenge creation feature coming soon!
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;
