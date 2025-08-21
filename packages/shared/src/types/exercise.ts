export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  muscleGroups: MuscleGroup[];
  equipment: Equipment[];
  difficulty: Difficulty;
  instructions: string[];
  tips: string[];
  videoUrl?: string;
  imageUrl?: string;
  isPublic: boolean;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ExerciseCategory {
  STRENGTH = 'strength',
  CARDIO = 'cardio',
  FLEXIBILITY = 'flexibility',
  BALANCE = 'balance',
  SPORTS = 'sports',
  FUNCTIONAL = 'functional',
  YOGA = 'yoga',
  PILATES = 'pilates',
  CROSSFIT = 'crossfit',
  BODYWEIGHT = 'bodyweight'
}

export enum MuscleGroup {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDERS = 'shoulders',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
  FOREARMS = 'forearms',
  ABS = 'abs',
  OBLIQUES = 'obliques',
  QUADS = 'quads',
  HAMSTRINGS = 'hamstrings',
  GLUTES = 'glutes',
  CALVES = 'calves',
  FULL_BODY = 'full_body',
  CORE = 'core',
  UPPER_BODY = 'upper_body',
  LOWER_BODY = 'lower_body'
}

export enum Equipment {
  NONE = 'none',
  DUMBBELLS = 'dumbbells',
  BARBELL = 'barbell',
  KETTLEBELL = 'kettlebell',
  RESISTANCE_BANDS = 'resistance_bands',
  CABLE_MACHINE = 'cable_machine',
  SMITH_MACHINE = 'smith_machine',
  LEG_PRESS = 'leg_press',
  BENCH = 'bench',
  PULL_UP_BAR = 'pull_up_bar',
  DIP_BARS = 'dip_bars',
  TRX = 'trx',
  STABILITY_BALL = 'stability_ball',
  FOAM_ROLLER = 'foam_roller',
  YOGA_MAT = 'yoga_mat',
  TREADMILL = 'treadmill',
  STATIONARY_BIKE = 'stationary_bike',
  ROWING_MACHINE = 'rowing_machine',
  ELLIPTICAL = 'elliptical'
}

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface ExerciseFilters {
  category?: ExerciseCategory;
  muscleGroups?: MuscleGroup[];
  equipment?: Equipment[];
  difficulty?: Difficulty;
  search?: string;
}

export interface ExerciseSearchParams {
  query: string;
  filters: ExerciseFilters;
  page: number;
  limit: number;
  sortBy: 'name' | 'difficulty' | 'category' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface ExerciseSearchResult {
  exercises: Exercise[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
