import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ProgressData {
  id: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  notes?: string;
  photoUrl?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'workout' | 'nutrition' | 'weight' | 'strength' | 'streak';
  earnedAt: Date;
  isUnlocked: boolean;
}

export default function ProgressDashboard() {
  const { currentUser } = useAuth();
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [isAddingEntry, setIsAddingEntry] = useState(false);

  const [newEntry, setNewEntry] = useState<Partial<ProgressData>>({
    date: new Date(),
    weight: undefined,
    bodyFat: undefined,
    muscleMass: undefined,
    measurements: {},
    notes: ''
  });

  useEffect(() => {
    loadProgressData();
    loadAchievements();
  }, []);

  const loadProgressData = async () => {
    setIsLoading(true);
    try {
      // TODO: Load from backend
      const mockData: ProgressData[] = [
        {
          id: '1',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          weight: 75,
          bodyFat: 18,
          muscleMass: 45,
          measurements: {
            chest: 95,
            waist: 80,
            hips: 95,
            arms: 32,
            thighs: 55
          },
          notes: 'Feeling good this week'
        },
        {
          id: '2',
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          weight: 76,
          bodyFat: 19,
          muscleMass: 44,
          measurements: {
            chest: 94,
            waist: 82,
            hips: 96,
            arms: 31,
            thighs: 54
          }
        }
      ];
      setProgressData(mockData);
    } catch (err) {
      setError('Failed to load progress data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadAchievements = async () => {
    try {
      const mockAchievements: Achievement[] = [
        {
          id: '1',
          title: 'First Workout',
          description: 'Completed your first workout',
          icon: '🏋️',
          category: 'workout',
          earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          isUnlocked: true
        },
        {
          id: '2',
          title: 'Weight Loss Champion',
          description: 'Lost 5kg total',
          icon: '⚖️',
          category: 'weight',
          earnedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
          isUnlocked: true
        },
        {
          id: '3',
          title: 'Nutrition Tracker',
          description: 'Logged nutrition for 7 days straight',
          icon: '🍎',
          category: 'nutrition',
          earnedAt: new Date(),
          isUnlocked: false
        },
        {
          id: '4',
          title: 'Strength Builder',
          description: 'Increased strength in all major lifts',
          icon: '💪',
          category: 'strength',
          earnedAt: new Date(),
          isUnlocked: false
        }
      ];
      setAchievements(mockAchievements);
    } catch (err) {
      console.error('Failed to load achievements');
    }
  };

  const handleAddEntry = async () => {
    if (!newEntry.weight && !newEntry.measurements.chest) {
      setError('Please enter at least weight or measurements');
      return;
    }

    setIsLoading(true);
    try {
      const entry: ProgressData = {
        id: Date.now().toString(),
        date: newEntry.date || new Date(),
        weight: newEntry.weight,
        bodyFat: newEntry.bodyFat,
        muscleMass: newEntry.muscleMass,
        measurements: newEntry.measurements || {},
        notes: newEntry.notes,
        photoUrl: newEntry.photoUrl
      };

      // TODO: Save to backend
      setProgressData(prev => [entry, ...prev]);
      setIsAddingEntry(false);
      setNewEntry({
        date: new Date(),
        weight: undefined,
        bodyFat: undefined,
        muscleMass: undefined,
        measurements: {},
        notes: ''
      });
      setError('');
    } catch (err) {
      setError('Failed to add progress entry');
    } finally {
      setIsLoading(false);
    }
  };

  const getWeightTrend = () => {
    if (progressData.length < 2) return { trend: 'stable', change: 0 };
    
    const sorted = [...progressData].sort((a, b) => a.date.getTime() - b.date.getTime());
    const first = sorted[0].weight || 0;
    const last = sorted[sorted.length - 1].weight || 0;
    const change = last - first;
    
    return {
      trend: change > 0 ? 'increasing' : change < 0 ? 'decreasing' : 'stable',
      change: Math.abs(change)
    };
  };

  const getFilteredData = () => {
    const now = new Date();
    const filtered = progressData.filter(entry => {
      const diff = now.getTime() - entry.date.getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      
      switch (selectedTimeframe) {
        case 'week': return days <= 7;
        case 'month': return days <= 30;
        case 'quarter': return days <= 90;
        case 'year': return days <= 365;
        default: return true;
      }
    });
    
    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const renderProgressChart = () => {
    const filteredData = getFilteredData();
    if (filteredData.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No data available for the selected timeframe
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Weight Progress</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {filteredData.map((entry, index) => {
            const maxWeight = Math.max(...filteredData.map(d => d.weight || 0));
            const minWeight = Math.min(...filteredData.map(d => d.weight || 0));
            const range = maxWeight - minWeight;
            const height = range > 0 ? ((entry.weight || 0) - minWeight) / range * 100 : 50;
            
            return (
              <div key={entry.id} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-purple-500 rounded-t transition-all duration-300 hover:bg-purple-600"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">
                  {entry.weight?.toFixed(1)}kg
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAddEntryForm = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Progress Entry</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={newEntry.date?.toISOString().split('T')[0] || ''}
            onChange={(e) => setNewEntry(prev => ({ ...prev, date: new Date(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            value={newEntry.weight || ''}
            onChange={(e) => setNewEntry(prev => ({ ...prev, weight: parseFloat(e.target.value) || undefined }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Body Fat (%)</label>
          <input
            type="number"
            value={newEntry.bodyFat || ''}
            onChange={(e) => setNewEntry(prev => ({ ...prev, bodyFat: parseFloat(e.target.value) || undefined }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Muscle Mass (kg)</label>
          <input
            type="number"
            value={newEntry.muscleMass || ''}
            onChange={(e) => setNewEntry(prev => ({ ...prev, muscleMass: parseFloat(e.target.value) || undefined }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            step="0.1"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Measurements (cm)</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs text-gray-600">Chest</label>
            <input
              type="number"
              value={newEntry.measurements?.chest || ''}
              onChange={(e) => setNewEntry(prev => ({ 
                ...prev, 
                measurements: { ...prev.measurements, chest: parseFloat(e.target.value) || undefined }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600">Waist</label>
            <input
              type="number"
              value={newEntry.measurements?.waist || ''}
              onChange={(e) => setNewEntry(prev => ({ 
                ...prev, 
                measurements: { ...prev.measurements, waist: parseFloat(e.target.value) || undefined }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600">Hips</label>
            <input
              type="number"
              value={newEntry.measurements?.hips || ''}
              onChange={(e) => setNewEntry(prev => ({ 
                ...prev, 
                measurements: { ...prev.measurements, hips: parseFloat(e.target.value) || undefined }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600">Arms</label>
            <input
              type="number"
              value={newEntry.measurements?.arms || ''}
              onChange={(e) => setNewEntry(prev => ({ 
                ...prev, 
                measurements: { ...prev.measurements, arms: parseFloat(e.target.value) || undefined }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600">Thighs</label>
            <input
              type="number"
              value={newEntry.measurements?.thighs || ''}
              onChange={(e) => setNewEntry(prev => ({ 
                ...prev, 
                measurements: { ...prev.measurements, thighs: parseFloat(e.target.value) || undefined }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              step="0.1"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={newEntry.notes || ''}
          onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          rows={3}
          placeholder="How are you feeling? Any observations?"
        />
      </div>

      <div className="flex space-x-3 mt-6">
        <button
          onClick={handleAddEntry}
          disabled={isLoading}
          className="btn-primary disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add Entry'}
        </button>
        <button
          onClick={() => setIsAddingEntry(false)}
          className="btn-secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map(achievement => (
          <div 
            key={achievement.id} 
            className={`text-center p-4 rounded-lg border-2 transition-all duration-300 ${
              achievement.isUnlocked 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50 opacity-50'
            }`}
          >
            <div className="text-3xl mb-2">{achievement.icon}</div>
            <h4 className="font-medium text-sm text-gray-900 mb-1">{achievement.title}</h4>
            <p className="text-xs text-gray-600">{achievement.description}</p>
            {achievement.isUnlocked && (
              <div className="text-xs text-green-600 mt-2">
                Earned {achievement.earnedAt.toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const weightTrend = getWeightTrend();
  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Dashboard</h1>
          <p className="text-gray-600">Track your fitness journey and celebrate your achievements</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {progressData.length > 0 ? progressData[0].weight?.toFixed(1) : '--'} kg
            </div>
            <div className="text-sm text-gray-600">Current Weight</div>
            {weightTrend.change > 0 && (
              <div className={`text-xs mt-1 ${
                weightTrend.trend === 'decreasing' ? 'text-green-600' : 'text-red-600'
              }`}>
                {weightTrend.trend === 'decreasing' ? '-' : '+'}{weightTrend.change.toFixed(1)}kg
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {progressData.length}
            </div>
            <div className="text-sm text-gray-600">Entries Logged</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {achievements.filter(a => a.isUnlocked).length}
            </div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.max(0, ...progressData.map(p => p.bodyFat || 0)).toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">Body Fat</div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {(['week', 'month', 'quarter', 'year'] as const).map(timeframe => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Add Entry Button */}
        {!isAddingEntry && (
          <div className="mb-6">
            <button
              onClick={() => setIsAddingEntry(true)}
              className="btn-primary"
            >
              + Add Progress Entry
            </button>
          </div>
        )}

        {/* Add Entry Form */}
        {isAddingEntry && (
          <div className="mb-8">
            {renderAddEntryForm()}
          </div>
        )}

        {/* Progress Chart */}
        <div className="mb-8">
          {renderProgressChart()}
        </div>

        {/* Recent Entries */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Entries</h3>
            {filteredData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No entries for the selected timeframe
              </div>
            ) : (
              <div className="space-y-4">
                {filteredData.slice(0, 5).map(entry => (
                  <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">
                        {entry.date.toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        Weight: {entry.weight?.toFixed(1)}kg
                        {entry.bodyFat && ` • Body Fat: ${entry.bodyFat.toFixed(1)}%`}
                        {entry.notes && ` • ${entry.notes}`}
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {entry.date.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Achievements */}
        {renderAchievements()}
      </div>
    </div>
  );
}
