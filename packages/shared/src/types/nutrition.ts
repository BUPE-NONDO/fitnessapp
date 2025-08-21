export interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  barcode?: string;
  servingSize: string;
  calories: number;
  protein: number; // grams
  carbohydrates: number; // grams
  fat: number; // grams
  fiber: number; // grams
  sugar: number; // grams
  sodium: number; // mg
  category: FoodCategory;
  isCustom: boolean;
  createdBy?: string; // userId for custom foods
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionLog {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD format
  meals: Meal[];
  waterIntake: number; // ml
  notes?: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbohydrates: number;
  totalFat: number;
  totalFiber: number;
  totalSugar: number;
  totalSodium: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  time: string; // HH:MM format
  foods: MealFood[];
  totalCalories: number;
  totalProtein: number;
  totalCarbohydrates: number;
  totalFat: number;
  notes?: string;
}

export interface MealFood {
  foodId: string;
  foodName: string;
  servingSize: string;
  quantity: number; // multiplier for serving size
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface NutritionGoals {
  id: string;
  userId: string;
  dailyCalories: number;
  dailyProtein: number; // grams
  dailyCarbohydrates: number; // grams
  dailyFat: number; // grams
  dailyFiber: number; // grams
  dailySugar: number; // grams
  dailySodium: number; // mg
  dailyWater: number; // ml
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionFilters {
  category?: FoodCategory;
  maxCalories?: number;
  minProtein?: number;
  maxSugar?: number;
  isCustom?: boolean;
  search?: string;
}

export interface NutritionSearchParams {
  search?: string;
  category?: FoodCategory;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'calories' | 'protein' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface NutritionSearchResult {
  foods: FoodItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export enum FoodCategory {
  FRUITS = 'fruits',
  VEGETABLES = 'vegetables',
  GRAINS = 'grains',
  PROTEIN = 'protein',
  DAIRY = 'dairy',
  FATS = 'fats',
  BEVERAGES = 'beverages',
  SNACKS = 'snacks',
  CONDIMENTS = 'condiments',
  SUPPLEMENTS = 'supplements',
  CUSTOM = 'custom'
}

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack'
}

export type CreateFoodItemInput = Omit<FoodItem, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateFoodItemInput = Partial<Omit<FoodItem, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateNutritionLogInput = Omit<NutritionLog, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateNutritionLogInput = Partial<Omit<NutritionLog, 'id' | 'createdAt' | 'updatedAt'>>;

export type CreateMealInput = Omit<Meal, 'id'>;
export type UpdateMealInput = Partial<Omit<Meal, 'id'>>;

export type CreateNutritionGoalsInput = Omit<NutritionGoals, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateNutritionGoalsInput = Partial<Omit<NutritionGoals, 'id' | 'createdAt' | 'updatedAt'>>;
