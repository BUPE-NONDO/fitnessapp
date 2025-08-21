import { Exercise, ExerciseCategory, MuscleGroup, Equipment, Difficulty } from '@aurafit/shared/types/exercise';

export const sampleExercises: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Push-ups',
    description: 'A classic bodyweight exercise that targets the chest, shoulders, and triceps. Great for building upper body strength and endurance.',
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.CHEST, MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS],
    equipment: [Equipment.NONE],
    difficulty: Difficulty.BEGINNER,
    instructions: [
      'Start in a plank position with your hands slightly wider than shoulder-width apart',
      'Lower your body until your chest nearly touches the floor',
      'Push your body back up to the starting position',
      'Keep your core tight and body in a straight line throughout the movement'
    ],
    tips: [
      'Keep your elbows close to your body',
      'Breathe steadily throughout the exercise',
      'Start with modified push-ups if needed'
    ],
    isPublic: true
  },
  {
    name: 'Squats',
    description: 'A fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes. Essential for building leg strength and stability.',
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.QUADS, MuscleGroup.HAMSTRINGS, MuscleGroup.GLUTES],
    equipment: [Equipment.NONE],
    difficulty: Difficulty.BEGINNER,
    instructions: [
      'Stand with your feet shoulder-width apart',
      'Lower your body by bending your knees and hips',
      'Keep your chest up and knees behind your toes',
      'Return to the starting position by pushing through your heels'
    ],
    tips: [
      'Keep your weight in your heels',
      'Maintain a neutral spine',
      'Go as deep as your mobility allows'
    ],
    isPublic: true
  },
  {
    name: 'Plank',
    description: 'An isometric core exercise that builds stability and endurance in the abdominal muscles and lower back.',
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.ABS, MuscleGroup.CORE],
    equipment: [Equipment.NONE],
    difficulty: Difficulty.BEGINNER,
    instructions: [
      'Start in a forearm plank position',
      'Keep your body in a straight line from head to heels',
      'Engage your core muscles',
      'Hold the position for the prescribed time'
    ],
    tips: [
      'Don\'t let your hips sag',
      'Breathe steadily',
      'Focus on maintaining proper form'
    ],
    isPublic: true
  },
  {
    name: 'Dumbbell Bench Press',
    description: 'A compound upper body exercise that targets the chest, shoulders, and triceps using dumbbells for better range of motion.',
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.CHEST, MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS],
    equipment: [Equipment.DUMBBELLS, Equipment.BENCH],
    difficulty: Difficulty.INTERMEDIATE,
    instructions: [
      'Lie on a bench with dumbbells held at chest level',
      'Press the dumbbells up until your arms are fully extended',
      'Lower the dumbbells back to your chest',
      'Repeat for the desired number of repetitions'
    ],
    tips: [
      'Keep your feet flat on the floor',
      'Maintain a slight arch in your lower back',
      'Control the movement throughout'
    ],
    isPublic: true
  },
  {
    name: 'Deadlift',
    description: 'A compound exercise that targets the entire posterior chain, including the back, glutes, and hamstrings.',
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.GLUTES, MuscleGroup.HAMSTRINGS],
    equipment: [Equipment.BARBELL],
    difficulty: Difficulty.ADVANCED,
    instructions: [
      'Stand with your feet hip-width apart, barbell over your midfoot',
      'Bend at your hips and knees to grasp the barbell',
      'Keep your back straight and chest up',
      'Stand up by extending your hips and knees',
      'Lower the barbell back to the ground with control'
    ],
    tips: [
      'Keep the barbell close to your body',
      'Engage your lats throughout the movement',
      'Focus on hip hinge movement'
    ],
    isPublic: true
  },
  {
    name: 'Running',
    description: 'A cardiovascular exercise that improves endurance, burns calories, and strengthens the heart and lungs.',
    category: ExerciseCategory.CARDIO,
    muscleGroups: [MuscleGroup.QUADS, MuscleGroup.HAMSTRINGS, MuscleGroup.CALVES],
    equipment: [Equipment.NONE],
    difficulty: Difficulty.BEGINNER,
    instructions: [
      'Start with a proper warm-up',
      'Maintain good posture with your head up',
      'Land midfoot with each step',
      'Keep a steady breathing rhythm',
      'Cool down with a light walk'
    ],
    tips: [
      'Start slow and gradually increase intensity',
      'Stay hydrated throughout your run',
      'Listen to your body and rest when needed'
    ],
    isPublic: true
  },
  {
    name: 'Yoga Downward Dog',
    description: 'A foundational yoga pose that stretches the hamstrings, calves, and shoulders while building strength in the arms and core.',
    category: ExerciseCategory.YOGA,
    muscleGroups: [MuscleGroup.HAMSTRINGS, MuscleGroup.SHOULDERS, MuscleGroup.CORE],
    equipment: [Equipment.YOGA_MAT],
    difficulty: Difficulty.BEGINNER,
    instructions: [
      'Start on your hands and knees',
      'Lift your hips up and back',
      'Form an inverted V shape with your body',
      'Press your hands into the mat and lengthen your spine',
      'Hold the pose for several breaths'
    ],
    tips: [
      'Keep your heels reaching toward the ground',
      'Engage your core muscles',
      'Relax your neck and shoulders'
    ],
    isPublic: true
  },
  {
    name: 'Burpees',
    description: 'A high-intensity full-body exercise that combines strength and cardio, targeting multiple muscle groups simultaneously.',
    category: ExerciseCategory.FUNCTIONAL,
    muscleGroups: [MuscleGroup.FULL_BODY, MuscleGroup.CORE],
    equipment: [Equipment.NONE],
    difficulty: Difficulty.ADVANCED,
    instructions: [
      'Start in a standing position',
      'Drop into a squat position and place your hands on the ground',
      'Kick your feet back into a plank position',
      'Perform a push-up (optional)',
      'Jump your feet back to the squat position',
      'Jump up from the squat position'
    ],
    tips: [
      'Maintain proper form throughout',
      'Land softly when jumping',
      'Modify the exercise if needed'
    ],
    isPublic: true
  },
  {
    name: 'Pull-ups',
    description: 'An upper body strength exercise that targets the back, biceps, and shoulders using your body weight.',
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.BACK, MuscleGroup.BICEPS, MuscleGroup.SHOULDERS],
    equipment: [Equipment.PULL_UP_BAR],
    difficulty: Difficulty.ADVANCED,
    instructions: [
      'Grasp the pull-up bar with your hands shoulder-width apart',
      'Hang with your arms fully extended',
      'Pull your body up until your chin is over the bar',
      'Lower your body back to the starting position',
      'Repeat for the desired number of repetitions'
    ],
    tips: [
      'Engage your core throughout the movement',
      'Avoid swinging or using momentum',
      'Focus on controlled movement'
    ],
    isPublic: true
  },
  {
    name: 'Lunges',
    description: 'A unilateral lower body exercise that targets the quadriceps, hamstrings, and glutes while improving balance and stability.',
    category: ExerciseCategory.STRENGTH,
    muscleGroups: [MuscleGroup.QUADS, MuscleGroup.HAMSTRINGS, MuscleGroup.GLUTES],
    equipment: [Equipment.NONE],
    difficulty: Difficulty.INTERMEDIATE,
    instructions: [
      'Stand with your feet hip-width apart',
      'Step forward with one leg and lower your body',
      'Keep your front knee behind your toes',
      'Push back to the starting position',
      'Repeat with the other leg'
    ],
    tips: [
      'Keep your torso upright',
      'Maintain balance throughout the movement',
      'Control the descent and ascent'
    ],
    isPublic: true
  }
];
