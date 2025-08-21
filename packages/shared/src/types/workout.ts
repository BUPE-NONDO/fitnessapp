import { Exercise } from './exercise';

export interface Workout {
  id: string;
  name: string;
  description: string;
  type: WorkoutType;
  difficulty: WorkoutDifficulty;
  duration: number; // in minutes
  exercises: WorkoutExercise[];
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutExercise {
  exerciseId: string;
  exercise?: Exercise; // Populated when fetching workout details
  sets: number;
  reps?: number;
  duration?: number; // in seconds, for time-based exercises
  weight?: number; // in kg
  restTime: number; // in seconds
  order: number;
  notes?: string;
}

export interface WorkoutSet {
  id: string;
  workoutId: string;
  exerciseId: string;
  setNumber: number;
  reps?: number;
  weight?: number;
  duration?: number; // in seconds
  completed: boolean;
  completedAt?: Date;
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  status: WorkoutSessionStatus;
  sets: WorkoutSet[];
  notes?: string;
  rating?: number; // 1-5 stars
}

export enum WorkoutType {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  FLEXIBILITY = 'flexibility',
  HIIT = 'hiit',
  CIRCUIT = 'circuit',
  ENDURANCE = 'endurance',
  POWER = 'power',
  RECOVERY = 'recovery',
  WARM_UP = 'warm_up',
  COOL_DOWN = 'cool_down'
}

export enum WorkoutDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum WorkoutSessionStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  CANCELLED = 'cancelled'
}

export interface WorkoutFilters {
  type?: WorkoutType;
  difficulty?: WorkoutDifficulty;
  duration?: {
    min?: number;
    max?: number;
  };
  search?: string;
}

export interface WorkoutSearchParams {
  query: string;
  filters: WorkoutFilters;
  page: number;
  limit: number;
  sortBy: 'name' | 'difficulty' | 'duration' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface WorkoutSearchResult {
  workouts: Workout[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface CreateWorkoutInput {
  name: string;
  description: string;
  type: WorkoutType;
  difficulty: WorkoutDifficulty;
  duration: number;
  exercises: Omit<WorkoutExercise, 'exercise'>[];
  isPublic: boolean;
}

export interface UpdateWorkoutInput {
  name?: string;
  description?: string;
  type?: WorkoutType;
  difficulty?: WorkoutDifficulty;
  duration?: number;
  exercises?: Omit<WorkoutExercise, 'exercise'>[];
  isPublic?: boolean;
}

export interface WorkoutProgress {
  workoutId: string;
  workoutName: string;
  totalSessions: number;
  completedSessions: number;
  averageRating: number;
  lastCompletedAt?: Date;
  personalBest?: {
    duration: number;
    completedAt: Date;
  };
}
