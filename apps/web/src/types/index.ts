// Exercise Types
export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: MuscleGroup[];
  equipment: Equipment[];
  difficulty: Difficulty;
  instructions: string[];
  videoUrl?: string;
  imageUrl?: string;
  caloriesPerMinute: number;
  createdAt: Date;
  updatedAt: Date;
}

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "biceps"
  | "triceps"
  | "forearms"
  | "abs"
  | "obliques"
  | "quads"
  | "hamstrings"
  | "calves"
  | "glutes"
  | "traps"
  | "lats"
  | "deltoids";

export type Equipment =
  | "barbell"
  | "dumbbell"
  | "kettlebell"
  | "cable"
  | "machine"
  | "bodyweight"
  | "resistance_band"
  | "medicine_ball"
  | "stability_ball"
  | "foam_roller"
  | "yoga_mat"
  | "bench"
  | "pull_up_bar"
  | "dip_bars";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface ExerciseCategory {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

// Workout Types
export interface Workout {
  id: string;
  name: string;
  description: string;
  type: WorkoutType;
  difficulty: WorkoutDifficulty;
  duration: number; // in minutes
  exercises: WorkoutExercise[];
  caloriesBurned: number;
  imageUrl?: string;
  createdBy: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: number;
  reps: number;
  restTime: number; // in seconds
  weight?: number;
  duration?: number; // in seconds, for time-based exercises
}

export type WorkoutType =
  | "strength_training"
  | "cardio"
  | "flexibility"
  | "hiit"
  | "yoga"
  | "pilates"
  | "crossfit"
  | "functional_training";

export type WorkoutDifficulty = "beginner" | "intermediate" | "advanced";

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  workouts: WorkoutPlanWorkout[];
  goals: string[];
  difficulty: WorkoutDifficulty;
  createdBy: string;
  isPublic: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutPlanWorkout {
  workout: Workout;
  dayOfWeek: number; // 0-6, where 0 is Sunday
  week: number;
}

// Nutrition Types
export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  category: FoodCategory;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  isCustom: boolean;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type FoodCategory =
  | "fruits"
  | "vegetables"
  | "grains"
  | "protein"
  | "dairy"
  | "nuts_seeds"
  | "oils"
  | "beverages"
  | "snacks"
  | "supplements";

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  foods: MealFood[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  createdAt: Date;
}

export interface MealFood {
  food: FoodItem;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface NutritionLog {
  id: string;
  userId: string;
  date: Date;
  meals: Meal[];
  waterIntake: number; // in glasses
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionGoals {
  id: string;
  userId: string;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  dailyWater: number; // in glasses
  createdAt: Date;
  updatedAt: Date;
}

// Progress Types
export interface ProgressEntry {
  id: string;
  userId: string;
  date: Date;
  weight?: number;
  bodyFat?: number;
  measurements?: {
    chest: number;
    waist: number;
    hips: number;
    biceps: number;
    thighs: number;
    calves: number;
  };
  photos?: string[];
  notes?: string;
  createdAt: Date;
}

// Goal Types
export interface Goal {
  id: string;
  userId: string;
  type: GoalType;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type GoalType =
  | "weight_loss"
  | "weight_gain"
  | "muscle_gain"
  | "strength"
  | "endurance"
  | "flexibility"
  | "body_composition"
  | "custom";

// Search Result Types
export interface ExerciseSearchResult {
  exercises: Exercise[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface WorkoutSearchResult {
  workouts: Workout[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// Filter Types
export interface ExerciseFilters {
  muscleGroups: MuscleGroup[];
  equipment: Equipment[];
  difficulty: Difficulty;
  maxCaloriesPerMinute?: number;
}

export interface WorkoutFilters {
  type: WorkoutType[];
  difficulty: WorkoutDifficulty[];
  maxDuration?: number;
  maxCaloriesBurned?: number;
}

export interface NutritionFilters {
  category?: FoodCategory;
  maxCalories?: number;
  minProtein?: number;
  maxSugar?: number;
  isCustom?: boolean;
}
