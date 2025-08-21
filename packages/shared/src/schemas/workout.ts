import { z } from 'zod';
import { 
  WorkoutType, 
  WorkoutDifficulty, 
  WorkoutSessionStatus 
} from '../types/workout';

export const WorkoutTypeSchema = z.nativeEnum(WorkoutType);
export const WorkoutDifficultySchema = z.nativeEnum(WorkoutDifficulty);
export const WorkoutSessionStatusSchema = z.nativeEnum(WorkoutSessionStatus);

export const WorkoutExerciseSchema = z.object({
  exerciseId: z.string().min(1, 'Exercise is required'),
  sets: z.number().int().min(1, 'At least 1 set required').max(50, 'Too many sets'),
  reps: z.number().int().min(1).max(1000).optional(),
  duration: z.number().int().min(1).max(3600).optional(), // max 1 hour
  weight: z.number().positive().max(1000).optional(), // max 1000kg
  restTime: z.number().int().min(0).max(600), // max 10 minutes rest
  order: z.number().int().min(1),
  notes: z.string().max(500).optional()
});

export const CreateWorkoutSchema = z.object({
  name: z.string().min(1, 'Workout name is required').max(100, 'Name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description too long'),
  type: WorkoutTypeSchema,
  difficulty: WorkoutDifficultySchema,
  duration: z.number().int().min(1, 'Duration must be at least 1 minute').max(480, 'Duration too long'), // max 8 hours
  exercises: z.array(WorkoutExerciseSchema).min(1, 'At least one exercise required').max(50, 'Too many exercises'),
  isPublic: z.boolean().default(true)
});

export const UpdateWorkoutSchema = CreateWorkoutSchema.partial();

export const WorkoutFiltersSchema = z.object({
  type: WorkoutTypeSchema.optional(),
  difficulty: WorkoutDifficultySchema.optional(),
  duration: z.object({
    min: z.number().int().min(1).optional(),
    max: z.number().int().max(480).optional()
  }).optional(),
  search: z.string().optional()
});

export const WorkoutSearchParamsSchema = z.object({
  query: z.string().default(''),
  filters: WorkoutFiltersSchema.default({}),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'difficulty', 'duration', 'createdAt']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc')
});

export const WorkoutSetSchema = z.object({
  id: z.string().optional(),
  workoutId: z.string(),
  exerciseId: z.string(),
  setNumber: z.number().int().min(1),
  reps: z.number().int().min(0).optional(),
  weight: z.number().positive().optional(),
  duration: z.number().int().min(0).optional(),
  completed: z.boolean(),
  completedAt: z.date().optional(),
  notes: z.string().max(500).optional()
});

export const CreateWorkoutSessionSchema = z.object({
  workoutId: z.string().min(1, 'Workout is required'),
  notes: z.string().max(1000).optional()
});

export const UpdateWorkoutSessionSchema = z.object({
  status: WorkoutSessionStatusSchema,
  completedAt: z.date().optional(),
  notes: z.string().max(1000).optional(),
  rating: z.number().int().min(1).max(5).optional()
});

export type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>;
export type UpdateWorkoutInput = z.infer<typeof UpdateWorkoutSchema>;
export type WorkoutFiltersInput = z.infer<typeof WorkoutFiltersSchema>;
export type WorkoutSearchParamsInput = z.infer<typeof WorkoutSearchParamsSchema>;
export type CreateWorkoutSessionInput = z.infer<typeof CreateWorkoutSessionSchema>;
export type UpdateWorkoutSessionInput = z.infer<typeof UpdateWorkoutSessionSchema>;
