import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { nutritionService } from '../../services/nutritionService';
import { NutritionLog, Meal, MealType, FoodItem } from '@aurafit/shared/types/nutrition';
import MealLogger from './MealLogger';
import NutritionSummary from './NutritionSummary';
import WaterTracker from './WaterTracker';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function NutritionLogger() {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
  });
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);

  // Fetch nutrition log for selected date
  const {
    data: nutritionLog,
    isLoading,
    error
  } = useQuery({
    queryKey: ['nutritionLog', currentUser?.uid, selectedDate],
    queryFn: () => nutritionService.getNutritionLogByDate(currentUser?.uid || '', selectedDate),
    enabled: !!currentUser?.uid,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create nutrition log mutation
  const createLogMutation = useMutation({
    mutationFn: (logData: any) => nutritionService.createNutritionLog(logData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutritionLog', currentUser?.uid, selectedDate] });
      setIsAddingMeal(false);
      setSelectedMealType(null);
    },
    onError: (error) => {
      console.error('Error creating nutrition log:', error);
    }
  });

  // Update nutrition log mutation
  const updateLogMutation = useMutation({
    mutationFn: ({ logId, logData }: { logId: string; logData: any }) => 
      nutritionService.updateNutritionLog(logId, logData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutritionLog', currentUser?.uid, selectedDate] });
      setIsAddingMeal(false);
      setSelectedMealType(null);
    },
    onError: (error) => {
      console.error('Error updating nutrition log:', error);
    }
  });

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setIsAddingMeal(false);
    setSelectedMealType(null);
  };

  const handleAddMeal = (mealType: MealType) => {
    setSelectedMealType(mealType);
    setIsAddingMeal(true);
  };

  const handleSaveMeal = async (meal: Meal) => {
    if (!currentUser?.uid) return;

    const updatedMeals = nutritionLog ? [...nutritionLog.meals, meal] : [meal];
    const totals = nutritionService.calculateMealTotals(
      updatedMeals.flatMap(m => m.foods)
    );

    const logData = {
      userId: currentUser.uid,
      date: selectedDate,
      meals: updatedMeals,
      waterIntake: nutritionLog?.waterIntake || 0,
      ...totals
    };

    if (nutritionLog) {
      await updateLogMutation.mutateAsync({ logId: nutritionLog.id, logData });
    } else {
      await createLogMutation.mutateAsync(logData);
    }
  };

  const handleUpdateWaterIntake = async (waterIntake: number) => {
    if (!currentUser?.uid) return;

    const logData = {
      userId: currentUser.uid,
      date: selectedDate,
      meals: nutritionLog?.meals || [],
      waterIntake,
      ...(nutritionLog ? {
        totalCalories: nutritionLog.totalCalories,
        totalProtein: nutritionLog.totalProtein,
        totalCarbohydrates: nutritionLog.totalCarbohydrates,
        totalFat: nutritionLog.totalFat,
        totalFiber: nutritionLog.totalFiber,
        totalSugar: nutritionLog.totalSugar,
        totalSodium: nutritionLog.totalSodium
      } : {
        totalCalories: 0,
        totalProtein: 0,
        totalCarbohydrates: 0,
        totalFat: 0,
        totalFiber: 0,
        totalSugar: 0,
        totalSodium: 0
      })
    };

    if (nutritionLog) {
      await updateLogMutation.mutateAsync({ logId: nutritionLog.id, logData });
    } else {
      await createLogMutation.mutateAsync(logData);
    }
  };

  const handleDeleteMeal = async (mealId: string) => {
    if (!nutritionLog || !currentUser?.uid) return;

    const updatedMeals = nutritionLog.meals.filter(meal => meal.id !== mealId);
    const totals = nutritionService.calculateMealTotals(
      updatedMeals.flatMap(m => m.foods)
    );

    const logData = {
      userId: currentUser.uid,
      date: selectedDate,
      meals: updatedMeals,
      waterIntake: nutritionLog.waterIntake,
      ...totals
    };

    await updateLogMutation.mutateAsync({ logId: nutritionLog.id, logData });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Nutrition Logger
            </h1>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">
                Error loading nutrition data. Please try again.
              </p>
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
              📝 Nutrition Logger
            </h1>
            <p className="mt-2 text-gray-600">
              Track your daily nutrition intake and monitor your progress.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Date Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Date:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={() => handleDateChange(new Date().toISOString().split('T')[0])}
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Today
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Meal Logger */}
              {isAddingMeal && selectedMealType ? (
                <MealLogger
                  mealType={selectedMealType}
                  onSave={handleSaveMeal}
                  onCancel={() => {
                    setIsAddingMeal(false);
                    setSelectedMealType(null);
                  }}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Today's Meals
                  </h2>
                  
                  {nutritionLog?.meals.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">No meals logged yet for today.</p>
                      <p className="text-sm text-gray-400">Click "Add Meal" to get started!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {nutritionLog?.meals.map((meal) => (
                        <div key={meal.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-gray-900">
                              {meal.name} ({meal.type})
                            </h3>
                            <button
                              onClick={() => handleDeleteMeal(meal.id)}
                              className="text-red-600 hover:text-red-700 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Time: {meal.time}</p>
                            <p>Calories: {meal.totalCalories}</p>
                            <p>Protein: {meal.totalProtein}g | Carbs: {meal.totalCarbohydrates}g | Fat: {meal.totalFat}g</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Meal Buttons */}
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((mealType) => (
                      <button
                        key={mealType}
                        onClick={() => handleAddMeal(mealType)}
                        className="btn-primary text-sm py-3"
                      >
                        + {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Water Tracker */}
              <WaterTracker
                waterIntake={nutritionLog?.waterIntake || 0}
                onUpdate={handleUpdateWaterIntake}
              />

              {/* Nutrition Summary */}
              <NutritionSummary nutritionLog={nutritionLog} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
