import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Leaderboard from './Leaderboard';

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
  rules: string[];
  milestones: {
    day: number;
    description: string;
    completed: boolean;
  }[];
  dailyTasks: {
    day: number;
    task: string;
    completed: boolean;
    points: number;
  }[];
}

const ChallengeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'leaderboard' | 'rules'>('overview');

  // Mock challenge data
  const mockChallenge: Challenge = {
    id: '1',
    title: '30-Day Push-Up Challenge',
    description: 'Build upper body strength with a progressive push-up challenge. Start with 5 push-ups and increase by 2 each day. This challenge is designed to help you build strength, endurance, and consistency in your fitness routine.',
    type: 'strength',
    duration: 30,
    participants: 1247,
    maxParticipants: 2000,
    startDate: '2025-01-15',
    endDate: '2025-02-14',
    status: 'active',
    difficulty: 'beginner',
    rewards: ['Strength Badge', '100 Points', 'Exclusive Avatar', 'Certificate of Completion'],
    progress: {
      current: 45,
      target: 60,
      unit: 'push-ups'
    },
    userRank: 3,
    isJoined: true,
    rules: [
      'Complete the daily push-up count as specified',
      'Record your progress daily in the app',
      'Maintain proper form throughout the challenge',
      'Take rest days when needed, but make up missed days',
      'Share your progress with the community',
      'No substitutions for push-ups unless medically necessary'
    ],
    milestones: [
      { day: 7, description: 'Complete first week', completed: true },
      { day: 14, description: 'Reach 25 push-ups', completed: true },
      { day: 21, description: 'Complete 3 weeks', completed: true },
      { day: 30, description: 'Finish the challenge', completed: false }
    ],
    dailyTasks: [
      { day: 1, task: '5 push-ups', completed: true, points: 10 },
      { day: 2, task: '7 push-ups', completed: true, points: 10 },
      { day: 3, task: '9 push-ups', completed: true, points: 10 },
      { day: 4, task: '11 push-ups', completed: true, points: 10 },
      { day: 5, task: '13 push-ups', completed: true, points: 10 },
      { day: 6, task: '15 push-ups', completed: true, points: 10 },
      { day: 7, task: '17 push-ups', completed: true, points: 15 },
      { day: 8, task: '19 push-ups', completed: true, points: 10 },
      { day: 9, task: '21 push-ups', completed: true, points: 10 },
      { day: 10, task: '23 push-ups', completed: true, points: 10 },
      { day: 11, task: '25 push-ups', completed: true, points: 10 },
      { day: 12, task: '27 push-ups', completed: true, points: 10 },
      { day: 13, task: '29 push-ups', completed: true, points: 10 },
      { day: 14, task: '31 push-ups', completed: true, points: 15 },
      { day: 15, task: '33 push-ups', completed: false, points: 10 },
      { day: 16, task: '35 push-ups', completed: false, points: 10 },
      { day: 17, task: '37 push-ups', completed: false, points: 10 },
      { day: 18, task: '39 push-ups', completed: false, points: 10 },
      { day: 19, task: '41 push-ups', completed: false, points: 10 },
      { day: 20, task: '43 push-ups', completed: false, points: 10 },
      { day: 21, task: '45 push-ups', completed: false, points: 15 },
      { day: 22, task: '47 push-ups', completed: false, points: 10 },
      { day: 23, task: '49 push-ups', completed: false, points: 10 },
      { day: 24, task: '51 push-ups', completed: false, points: 10 },
      { day: 25, task: '53 push-ups', completed: false, points: 10 },
      { day: 26, task: '55 push-ups', completed: false, points: 10 },
      { day: 27, task: '57 push-ups', completed: false, points: 10 },
      { day: 28, task: '59 push-ups', completed: false, points: 10 },
      { day: 29, task: '61 push-ups', completed: false, points: 10 },
      { day: 30, task: '63 push-ups', completed: false, points: 20 }
    ]
  };

  useEffect(() => {
    loadChallenge();
  }, [id]);

  const loadChallenge = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setChallenge(mockChallenge);
      setError(null);
    } catch (err) {
      setError('Failed to load challenge details');
    } finally {
      setLoading(false);
    }
  };

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateProgressPercentage = () => {
    if (!challenge?.progress) return 0;
    return Math.min((challenge.progress.current / challenge.progress.target) * 100, 100);
  };

  const getDaysRemaining = () => {
    if (!challenge) return 0;
    const endDate = new Date(challenge.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getCompletedTasks = () => {
    if (!challenge) return 0;
    return challenge.dailyTasks.filter(task => task.completed).length;
  };

  const getTotalPoints = () => {
    if (!challenge) return 0;
    return challenge.dailyTasks
      .filter(task => task.completed)
      .reduce((total, task) => total + task.points, 0);
  };

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

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Challenge Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {error || 'The challenge you are looking for does not exist.'}
            </p>
            <Link to="/challenges" className="btn-primary">
              Back to Challenges
            </Link>
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
          <Link to="/challenges" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Challenges
          </Link>
          
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">{getTypeIcon(challenge.type)}</span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {challenge.title}
                </h1>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(challenge.status)}`}>
                    {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {challenge.duration} days • {challenge.participants} participants
                    {challenge.maxParticipants && ` / ${challenge.maxParticipants}`}
                  </span>
                </div>
              </div>
            </div>
            {challenge.isJoined ? (
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Leave Challenge
              </button>
            ) : (
              <button className="btn-primary">
                Join Challenge
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'progress', label: 'Progress' },
                { id: 'leaderboard', label: 'Leaderboard' },
                { id: 'rules', label: 'Rules' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {challenge.description}
                </p>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Rewards
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {challenge.rewards.map((reward, index) => (
                    <div key={index} className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="text-2xl mb-2">🏆</div>
                      <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        {reward}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Milestones
                </h2>
                <div className="space-y-3">
                  {challenge.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        milestone.completed
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {milestone.completed ? '✓' : milestone.day}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          Day {milestone.day}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {milestone.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Challenge Info
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Start Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(challenge.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">End Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatDate(challenge.endDate)}
                    </span>
                  </div>
                  {challenge.status === 'active' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Days Remaining:</span>
                      <span className="font-medium text-orange-600 dark:text-orange-400">
                        {getDaysRemaining()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Type:</span>
                    <span className="font-medium text-gray-900 dark:text-white capitalize">
                      {challenge.type.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {challenge.progress && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Your Progress
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {challenge.progress.current} / {challenge.progress.target} {challenge.progress.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${calculateProgressPercentage()}%` }}
                      ></div>
                    </div>
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                      {calculateProgressPercentage().toFixed(1)}% Complete
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Daily Progress
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {challenge.dailyTasks.map((task, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-colors ${
                    task.completed
                      ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                      : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Day {task.day}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {task.points} pts
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {task.task}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.completed
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                    {task.completed && (
                      <span className="text-green-600 dark:text-green-400">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {getCompletedTasks()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Tasks Completed
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {getTotalPoints()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Total Points
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard
            challengeId={challenge.id}
            challengeTitle={challenge.title}
            maxParticipants={challenge.maxParticipants}
          />
        )}

        {activeTab === 'rules' && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Challenge Rules
            </h2>
            <div className="space-y-4">
              {challenge.rules.map((rule, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetail;
