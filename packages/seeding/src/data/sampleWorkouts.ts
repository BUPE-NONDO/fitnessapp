import { Workout, WorkoutType, WorkoutDifficulty } from '@aurafit/shared/types/workout';

export const sampleWorkouts: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Full Body Strength',
    description: 'A comprehensive full-body workout targeting all major muscle groups with compound movements for maximum efficiency.',
    type: WorkoutType.STRENGTH,
    difficulty: WorkoutDifficulty.INTERMEDIATE,
    duration: 45,
    exercises: [
      {
        exerciseId: 'push-ups',
        sets: 3,
        reps: 12,
        restTime: 60,
        order: 1
      },
      {
        exerciseId: 'squats',
        sets: 3,
        reps: 15,
        restTime: 60,
        order: 2
      },
      {
        exerciseId: 'plank',
        sets: 3,
        duration: 30,
        restTime: 45,
        order: 3
      },
      {
        exerciseId: 'lunges',
        sets: 3,
        reps: 10,
        restTime: 60,
        order: 4
      }
    ],
    isPublic: true
  },
  {
    name: 'Quick Cardio Blast',
    description: 'A high-intensity cardio workout designed to burn calories and improve cardiovascular fitness in just 20 minutes.',
    type: WorkoutType.CARDIO,
    difficulty: WorkoutDifficulty.BEGINNER,
    duration: 20,
    exercises: [
      {
        exerciseId: 'running',
        sets: 1,
        duration: 1200,
        restTime: 0,
        order: 1
      },
      {
        exerciseId: 'burpees',
        sets: 3,
        reps: 8,
        restTime: 30,
        order: 2
      }
    ],
    isPublic: true
  },
  {
    name: 'Upper Body Power',
    description: 'Focus on building strength and power in your upper body with compound movements and progressive overload.',
    type: WorkoutType.STRENGTH,
    difficulty: WorkoutDifficulty.ADVANCED,
    duration: 60,
    exercises: [
      {
        exerciseId: 'push-ups',
        sets: 4,
        reps: 15,
        restTime: 90,
        order: 1
      },
      {
        exerciseId: 'pull-ups',
        sets: 4,
        reps: 8,
        restTime: 120,
        order: 2
      },
      {
        exerciseId: 'dumbbell-bench-press',
        sets: 3,
        reps: 10,
        weight: 20,
        restTime: 120,
        order: 3
      }
    ],
    isPublic: true
  },
  {
    name: 'Morning Yoga Flow',
    description: 'A gentle yoga sequence perfect for starting your day with mindfulness and flexibility.',
    type: WorkoutType.YOGA,
    difficulty: WorkoutDifficulty.BEGINNER,
    duration: 30,
    exercises: [
      {
        exerciseId: 'yoga-downward-dog',
        sets: 3,
        duration: 60,
        restTime: 30,
        order: 1
      },
      {
        exerciseId: 'plank',
        sets: 2,
        duration: 45,
        restTime: 30,
        order: 2
      }
    ],
    isPublic: true
  },
  {
    name: 'HIIT Circuit',
    description: 'High-intensity interval training circuit that alternates between work and rest periods for maximum fat burn.',
    type: WorkoutType.HIIT,
    difficulty: WorkoutDifficulty.INTERMEDIATE,
    duration: 25,
    exercises: [
      {
        exerciseId: 'burpees',
        sets: 4,
        reps: 10,
        restTime: 30,
        order: 1
      },
      {
        exerciseId: 'squats',
        sets: 4,
        reps: 20,
        restTime: 30,
        order: 2
      },
      {
        exerciseId: 'push-ups',
        sets: 4,
        reps: 12,
        restTime: 30,
        order: 3
      },
      {
        exerciseId: 'lunges',
        sets: 4,
        reps: 15,
        restTime: 30,
        order: 4
      }
    ],
    isPublic: true
  },
  {
    name: 'Core Crusher',
    description: 'Intensive core workout targeting all abdominal muscles for a strong and stable midsection.',
    type: WorkoutType.STRENGTH,
    difficulty: WorkoutDifficulty.INTERMEDIATE,
    duration: 20,
    exercises: [
      {
        exerciseId: 'plank',
        sets: 4,
        duration: 45,
        restTime: 30,
        order: 1
      },
      {
        exerciseId: 'squats',
        sets: 3,
        reps: 15,
        restTime: 45,
        order: 2
      }
    ],
    isPublic: true
  },
  {
    name: 'Endurance Builder',
    description: 'Long-duration workout designed to build cardiovascular endurance and stamina.',
    type: WorkoutType.ENDURANCE,
    difficulty: WorkoutDifficulty.ADVANCED,
    duration: 90,
    exercises: [
      {
        exerciseId: 'running',
        sets: 1,
        duration: 3600,
        restTime: 0,
        order: 1
      },
      {
        exerciseId: 'squats',
        sets: 2,
        reps: 20,
        restTime: 60,
        order: 2
      }
    ],
    isPublic: true
  },
  {
    name: 'Recovery Stretch',
    description: 'Gentle stretching and mobility work perfect for active recovery days.',
    type: WorkoutType.RECOVERY,
    difficulty: WorkoutDifficulty.BEGINNER,
    duration: 15,
    exercises: [
      {
        exerciseId: 'yoga-downward-dog',
        sets: 2,
        duration: 90,
        restTime: 30,
        order: 1
      },
      {
        exerciseId: 'plank',
        sets: 1,
        duration: 30,
        restTime: 0,
        order: 2
      }
    ],
    isPublic: true
  }
];
