import React, { useState, useEffect } from 'react';

interface AIRecommendation {
  id: string;
  type: 'workout' | 'nutrition' | 'lifestyle' | 'recovery';
  title: string;
  description: string;
  confidence: number; // 0-100
  priority: 'high' | 'medium' | 'low';
  category: string;
  actionable: boolean;
  dataPoints: string[];
  createdAt: string;
  expiresAt?: string;
}

interface UserInsights {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferences: {
    workoutDuration: number;
    workoutFrequency: number;
    preferredExercises: string[];
    dietaryRestrictions: string[];
  };
  recentActivity: {
    workoutsCompleted: number;
    averageWorkoutDuration: number;
    nutritionConsistency: number;
    sleepQuality: number;
  };
}

const AIRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [userInsights, setUserInsights] = useState<UserInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'workout' | 'nutrition' | 'lifestyle' | 'recovery'>('all');
  const [showInsights, setShowInsights] = useState(false);

  // Mock AI recommendations
  const mockRecommendations: AIRecommendation[] = [
    {
      id: '1',
      type: 'workout',
      title: 'Increase Upper Body Strength',
      description: 'Based on your recent workout patterns, you should focus on upper body exercises. Your push-up performance has plateaued, and incorporating more chest and shoulder work will help you break through.',
      confidence: 92,
      priority: 'high',
      category: 'Strength Training',
      actionable: true,
      dataPoints: ['Push-up performance plateaued', 'Limited upper body focus', 'Strength goal alignment'],
      createdAt: '2025-01-27T10:00:00Z'
    },
    {
      id: '2',
      type: 'nutrition',
      title: 'Optimize Protein Intake',
      description: 'Your current protein intake is below the recommended level for your fitness goals. Aim for 1.6-2.2g of protein per kg of body weight to support muscle growth and recovery.',
      confidence: 88,
      priority: 'high',
      category: 'Macro Optimization',
      actionable: true,
      dataPoints: ['Low protein intake', 'Muscle building goals', 'Recovery needs'],
      createdAt: '2025-01-27T09:30:00Z'
    },
    {
      id: '3',
      type: 'lifestyle',
      title: 'Improve Sleep Consistency',
      description: 'Your sleep schedule varies significantly. Consistent sleep timing can improve recovery and performance. Try to maintain a regular bedtime within a 30-minute window.',
      confidence: 85,
      priority: 'medium',
      category: 'Sleep Optimization',
      actionable: true,
      dataPoints: ['Irregular sleep schedule', 'Recovery impact', 'Performance correlation'],
      createdAt: '2025-01-27T08:45:00Z'
    },
    {
      id: '4',
      type: 'workout',
      title: 'Add Cardio Variety',
      description: 'You\'ve been focusing primarily on strength training. Adding 2-3 cardio sessions per week will improve your overall fitness and help with weight management goals.',
      confidence: 78,
      priority: 'medium',
      category: 'Cardiovascular Fitness',
      actionable: true,
      dataPoints: ['Limited cardio activity', 'Weight management goals', 'Fitness balance'],
      createdAt: '2025-01-27T08:00:00Z'
    },
    {
      id: '5',
      type: 'recovery',
      title: 'Implement Active Recovery',
      description: 'Your workout intensity has increased, but recovery practices haven\'t kept pace. Consider adding light stretching, foam rolling, or yoga on rest days.',
      confidence: 82,
      priority: 'medium',
      category: 'Recovery Management',
      actionable: true,
      dataPoints: ['High workout intensity', 'Limited recovery practices', 'Injury prevention'],
      createdAt: '2025-01-27T07:30:00Z'
    },
    {
      id: '6',
      type: 'nutrition',
      title: 'Hydration Optimization',
      description: 'Your water intake is adequate but could be optimized. Consider drinking 500ml of water 30 minutes before workouts and maintaining hydration throughout the day.',
      confidence: 75,
      priority: 'low',
      category: 'Hydration',
      actionable: true,
      dataPoints: ['Adequate but not optimal hydration', 'Workout performance', 'General health'],
      createdAt: '2025-01-27T07:00:00Z'
    }
  ];

  // Mock user insights
  const mockUserInsights: UserInsights = {
    fitnessLevel: 'intermediate',
    goals: ['Build muscle', 'Improve strength', 'Lose weight'],
    preferences: {
      workoutDuration: 45,
      workoutFrequency: 4,
      preferredExercises: ['Push-ups', 'Squats', 'Deadlifts', 'Pull-ups'],
      dietaryRestrictions: ['No dairy']
    },
    recentActivity: {
      workoutsCompleted: 12,
      averageWorkoutDuration: 42,
      nutritionConsistency: 75,
      sleepQuality: 68
    }
  };

  useEffect(() => {
    loadAIRecommendations();
  }, []);

  const loadAIRecommendations = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRecommendations(mockRecommendations);
      setUserInsights(mockUserInsights);
      setError(null);
    } catch (err) {
      setError('Failed to load AI recommendations');
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: AIRecommendation['type']) => {
    const icons = {
      workout: '💪',
      nutrition: '🥗',
      lifestyle: '🌱',
      recovery: '🧘'
    };
    return icons[type];
  };

  const getPriorityColor = (priority: AIRecommendation['priority']) => {
    const colors = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return colors[priority];
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 dark:text-green-400';
    if (confidence >= 80) return 'text-blue-600 dark:text-blue-400';
    if (confidence >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const filteredRecommendations = recommendations.filter(rec => 
    activeFilter === 'all' || rec.type === activeFilter
  );

  const getInsightSummary = () => {
    if (!userInsights) return null;
    
    return {
      totalRecommendations: recommendations.length,
      highPriority: recommendations.filter(r => r.priority === 'high').length,
      workoutFocused: recommendations.filter(r => r.type === 'workout').length,
      nutritionFocused: recommendations.filter(r => r.type === 'nutrition').length,
      averageConfidence: Math.round(
        recommendations.reduce((sum, r) => sum + r.confidence, 0) / recommendations.length
      )
    };
  };

  const insightSummary = getInsightSummary();

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
                AI Recommendations
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Personalized insights powered by artificial intelligence
              </p>
            </div>
            <button
              onClick={() => setShowInsights(!showInsights)}
              className="btn-secondary"
            >
              {showInsights ? 'Hide Insights' : 'View Insights'}
            </button>
          </div>

          {/* AI Insights Summary */}
          {showInsights && userInsights && (
            <div className="card mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Your AI Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {userInsights.fitnessLevel.charAt(0).toUpperCase() + userInsights.fitnessLevel.slice(1)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Fitness Level</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {userInsights.recentActivity.workoutsCompleted}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Workouts This Month</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {userInsights.recentActivity.nutritionConsistency}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Nutrition Consistency</div>
                </div>
                <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {userInsights.recentActivity.sleepQuality}/100
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Sleep Quality</div>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          {insightSummary && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="card text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {insightSummary.totalRecommendations}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {insightSummary.highPriority}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">High Priority</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {insightSummary.workoutFocused}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Workout</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {insightSummary.nutritionFocused}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Nutrition</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {insightSummary.averageConfidence}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Confidence</div>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Recommendations' },
              { id: 'workout', label: 'Workout' },
              { id: 'nutrition', label: 'Nutrition' },
              { id: 'lifestyle', label: 'Lifestyle' },
              { id: 'recovery', label: 'Recovery' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Recommendations Grid */}
        {filteredRecommendations.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No recommendations found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters or check back later for new insights
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRecommendations.map((recommendation) => (
              <div key={recommendation.id} className="card hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(recommendation.type)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {recommendation.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {recommendation.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                      {recommendation.priority.charAt(0).toUpperCase() + recommendation.priority.slice(1)} Priority
                    </span>
                    <span className={`text-sm font-medium ${getConfidenceColor(recommendation.confidence)}`}>
                      {recommendation.confidence}% Confidence
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {recommendation.description}
                </p>

                {/* Data Points */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Based on:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.dataPoints.map((point, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Generated {new Date(recommendation.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-2">
                    {recommendation.actionable && (
                      <button className="btn-primary text-sm px-4 py-2">
                        Take Action
                      </button>
                    )}
                    <button className="btn-secondary text-sm px-4 py-2">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Explanation */}
        <div className="mt-8 card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How AI Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Data Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Analyzes your workout patterns, nutrition habits, and health metrics
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Pattern Recognition</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Identifies trends and correlations in your fitness journey
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Personalized Insights</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generates actionable recommendations tailored to your goals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
