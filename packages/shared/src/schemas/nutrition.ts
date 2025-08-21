import { z } from 'zod';

// Enums
export const FoodCategorySchema = z.enum([
  'fruits',
  'vegetables', 
  'grains',
  'protein',
  'dairy',
  'fats',
  'beverages',
  'snacks',
  'condiments',
  'supplements',
  'custom'
]);

export const MealTypeSchema = z.enum([
  'breakfast',
  'lunch',
  'dinner',
  'snack'
]);

// Base schemas
export const MealFoodSchema = z.object({
  foodId: z.string().min(1),
  foodName: z.string().min(1),
  servingSize: z.string().min(1),
  quantity: z.number().positive(),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbohydrates: z.number().min(0),
  fat: z.number().min(0),
  fiber: z.number().min(0),
  sugar: z.number().min(0),
  sodium: z.number().min(0)
});

export const MealSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  type: MealTypeSchema,
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:MM format
  foods: z.array(MealFoodSchema),
  totalCalories: z.number().min(0),
  totalProtein: z.number().min(0),
  totalCarbohydrates: z.number().min(0),
  totalFat: z.number().min(0),
  notes: z.string().optional()
});

// Food Item schemas
export const FoodItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Food name is required'),
  brand: z.string().optional(),
  barcode: z.string().optional(),
  servingSize: z.string().min(1, 'Serving size is required'),
  calories: z.number().min(0, 'Calories must be non-negative'),
  protein: z.number().min(0, 'Protein must be non-negative'),
  carbohydrates: z.number().min(0, 'Carbohydrates must be non-negative'),
  fat: z.number().min(0, 'Fat must be non-negative'),
  fiber: z.number().min(0, 'Fiber must be non-negative'),
  sugar: z.number().min(0, 'Sugar must be non-negative'),
  sodium: z.number().min(0, 'Sodium must be non-negative'),
  category: FoodCategorySchema,
  isCustom: z.boolean(),
  createdBy: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export const CreateFoodItemSchema = FoodItemSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const UpdateFoodItemSchema = CreateFoodItemSchema.partial();

// Nutrition Log schemas
export const NutritionLogSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  meals: z.array(MealSchema),
  waterIntake: z.number().min(0, 'Water intake must be non-negative'),
  notes: z.string().optional(),
  totalCalories: z.number().min(0),
  totalProtein: z.number().min(0),
  totalCarbohydrates: z.number().min(0),
  totalFat: z.number().min(0),
  totalFiber: z.number().min(0),
  totalSugar: z.number().min(0),
  totalSodium: z.number().min(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export const CreateNutritionLogSchema = NutritionLogSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const UpdateNutritionLogSchema = CreateNutritionLogSchema.partial();

// Nutrition Goals schemas
export const NutritionGoalsSchema = z.object({
  id: z.string().optional(),
  userId: z.string().min(1),
  dailyCalories: z.number().min(0, 'Daily calories must be non-negative'),
  dailyProtein: z.number().min(0, 'Daily protein must be non-negative'),
  dailyCarbohydrates: z.number().min(0, 'Daily carbohydrates must be non-negative'),
  dailyFat: z.number().min(0, 'Daily fat must be non-negative'),
  dailyFiber: z.number().min(0, 'Daily fiber must be non-negative'),
  dailySugar: z.number().min(0, 'Daily sugar must be non-negative'),
  dailySodium: z.number().min(0, 'Daily sodium must be non-negative'),
  dailyWater: z.number().min(0, 'Daily water must be non-negative'),
  isActive: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export const CreateNutritionGoalsSchema = NutritionGoalsSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const UpdateNutritionGoalsSchema = CreateNutritionGoalsSchema.partial();

// Filter and search schemas
export const NutritionFiltersSchema = z.object({
  category: FoodCategorySchema.optional(),
  maxCalories: z.number().positive().optional(),
  minProtein: z.number().min(0).optional(),
  maxSugar: z.number().min(0).optional(),
  isCustom: z.boolean().optional(),
  search: z.string().optional()
});

export const NutritionSearchParamsSchema = z.object({
  search: z.string().optional(),
  category: FoodCategorySchema.optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  sortBy: z.enum(['name', 'calories', 'protein', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional()
});

// Type exports
export type FoodItem = z.infer<typeof FoodItemSchema>;
export type CreateFoodItemInput = z.infer<typeof CreateFoodItemSchema>;
export type UpdateFoodItemInput = z.infer<typeof UpdateFoodItemSchema>;

export type NutritionLog = z.infer<typeof NutritionLogSchema>;
export type CreateNutritionLogInput = z.infer<typeof CreateNutritionLogSchema>;
export type UpdateNutritionLogInput = z.infer<typeof UpdateNutritionLogSchema>;

export type Meal = z.infer<typeof MealSchema>;
export type CreateMealInput = z.infer<typeof MealSchema>;
export type UpdateMealInput = z.infer<typeof MealSchema>;

export type NutritionGoals = z.infer<typeof NutritionGoalsSchema>;
export type CreateNutritionGoalsInput = z.infer<typeof CreateNutritionGoalsSchema>;
export type UpdateNutritionGoalsInput = z.infer<typeof UpdateNutritionGoalsSchema>;

export type NutritionFilters = z.infer<typeof NutritionFiltersSchema>;
export type NutritionSearchParams = z.infer<typeof NutritionSearchParamsSchema>;
