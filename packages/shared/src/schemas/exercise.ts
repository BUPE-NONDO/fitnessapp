import { z } from 'zod';
import { 
  ExerciseCategory, 
  MuscleGroup, 
  Equipment, 
  Difficulty 
} from '../types/exercise';

export const ExerciseCategorySchema = z.nativeEnum(ExerciseCategory);
export const MuscleGroupSchema = z.nativeEnum(MuscleGroup);
export const EquipmentSchema = z.nativeEnum(Equipment);
export const DifficultySchema = z.nativeEnum(Difficulty);

export const ExerciseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  description: z.string().min(10).max(500),
  category: ExerciseCategorySchema,
  muscleGroups: z.array(MuscleGroupSchema).min(1),
  equipment: z.array(EquipmentSchema).min(1),
  difficulty: DifficultySchema,
  instructions: z.array(z.string().min(1)).min(1).max(20),
  tips: z.array(z.string().min(1)).max(10),
  videoUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  isPublic: z.boolean(),
  createdBy: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const CreateExerciseSchema = z.object({
  name: z.string().min(1, 'Exercise name is required').max(100, 'Name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description too long'),
  category: ExerciseCategorySchema,
  muscleGroups: z.array(MuscleGroupSchema).min(1, 'Select at least one muscle group'),
  equipment: z.array(EquipmentSchema).min(1, 'Select at least one equipment type'),
  difficulty: DifficultySchema,
  instructions: z.array(z.string().min(1)).min(1, 'Add at least one instruction').max(20, 'Too many instructions'),
  tips: z.array(z.string().min(1)).max(10, 'Too many tips'),
  videoUrl: z.string().url('Invalid video URL').optional().or(z.literal('')),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal('')),
  isPublic: z.boolean().default(true)
});

export const UpdateExerciseSchema = CreateExerciseSchema.partial();

export const ExerciseFiltersSchema = z.object({
  category: ExerciseCategorySchema.optional(),
  muscleGroups: z.array(MuscleGroupSchema).optional(),
  equipment: z.array(EquipmentSchema).optional(),
  difficulty: DifficultySchema.optional(),
  search: z.string().optional()
});

export const ExerciseSearchParamsSchema = z.object({
  query: z.string().default(''),
  filters: ExerciseFiltersSchema.default({}),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'difficulty', 'category', 'createdAt']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
});

export type CreateExerciseInput = z.infer<typeof CreateExerciseSchema>;
export type UpdateExerciseInput = z.infer<typeof UpdateExerciseSchema>;
export type ExerciseFiltersInput = z.infer<typeof ExerciseFiltersSchema>;
export type ExerciseSearchParamsInput = z.infer<typeof ExerciseSearchParamsSchema>;
