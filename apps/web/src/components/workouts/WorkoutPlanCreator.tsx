import { useState } from "react";
import {
  StrengthIcon,
  CardioIcon,
  FlexibilityIcon,
  BodyweightIcon,
  PlusIcon,
} from "../ui/Icons";

interface Exercise {
  id: string;
  name: string;
  category: "strength" | "cardio" | "flexibility" | "bodyweight";
  muscleGroup: string;
  equipment: string;
  sets: number;
  reps: number;
  restTime: number;
  weight?: number;
}

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  type: "strength" | "cardio" | "flexibility" | "mixed";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number; // in minutes
  exercises: Exercise[];
  frequency: "daily" | "3x-week" | "4x-week" | "5x-week";
  targetMuscleGroups: string[];
}

const EXERCISE_LIBRARY = [
  {
    id: "1",
    name: "Push-ups",
    category: "bodyweight",
    muscleGroup: "Chest",
    equipment: "None",
  },
  {
    id: "2",
    name: "Squats",
    category: "bodyweight",
    muscleGroup: "Legs",
    equipment: "None",
  },
  {
    id: "3",
    name: "Pull-ups",
    category: "bodyweight",
    muscleGroup: "Back",
    equipment: "Pull-up bar",
  },
  {
    id: "4",
    name: "Bench Press",
    category: "strength",
    muscleGroup: "Chest",
    equipment: "Barbell",
  },
  {
    id: "5",
    name: "Deadlift",
    category: "strength",
    muscleGroup: "Back",
    equipment: "Barbell",
  },
  {
    id: "6",
    name: "Running",
    category: "cardio",
    muscleGroup: "Cardio",
    equipment: "None",
  },
  {
    id: "7",
    name: "Plank",
    category: "bodyweight",
    muscleGroup: "Core",
    equipment: "None",
  },
  {
    id: "8",
    name: "Lunges",
    category: "bodyweight",
    muscleGroup: "Legs",
    equipment: "None",
  },
  {
    id: "9",
    name: "Bicep Curls",
    category: "strength",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
  },
  {
    id: "10",
    name: "Shoulder Press",
    category: "strength",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
  },
];

export default function WorkoutPlanCreator() {
  const [workoutPlan, setWorkoutPlan] = useState<Partial<WorkoutPlan>>({
    name: "",
    description: "",
    type: "strength",
    difficulty: "beginner",
    duration: 30,
    exercises: [],
    frequency: "3x-week",
    targetMuscleGroups: [],
  });

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Partial<Exercise>>({
    sets: 3,
    reps: 10,
    restTime: 60,
  });

  const addExercise = () => {
    if (
      selectedExercise.name &&
      selectedExercise.sets &&
      selectedExercise.reps
    ) {
      const newExercise: Exercise = {
        id: Date.now().toString(),
        name: selectedExercise.name,
        category: selectedExercise.category as any,
        muscleGroup: selectedExercise.muscleGroup || "",
        equipment: selectedExercise.equipment || "",
        sets: selectedExercise.sets,
        reps: selectedExercise.reps,
        restTime: selectedExercise.restTime || 60,
        weight: selectedExercise.weight,
      };

      setWorkoutPlan((prev) => ({
        ...prev,
        exercises: [...(prev.exercises || []), newExercise],
      }));

      setSelectedExercise({ sets: 3, reps: 10, restTime: 60 });
      setShowExerciseModal(false);
    }
  };

  const removeExercise = (exerciseId: string) => {
    setWorkoutPlan((prev) => ({
      ...prev,
      exercises: prev.exercises?.filter((ex) => ex.id !== exerciseId) || [],
    }));
  };

  const saveWorkoutPlan = () => {
    if (workoutPlan.name && workoutPlan.exercises?.length) {
      const newPlan: WorkoutPlan = {
        id: Date.now().toString(),
        name: workoutPlan.name,
        description: workoutPlan.description || "",
        type: workoutPlan.type as any,
        difficulty: workoutPlan.difficulty as any,
        duration: workoutPlan.duration || 30,
        exercises: workoutPlan.exercises,
        frequency: workoutPlan.frequency as any,
        targetMuscleGroups: workoutPlan.targetMuscleGroups || [],
      };

      // Save to localStorage for now (in real app, save to database)
      const existingPlans = JSON.parse(
        localStorage.getItem("workoutPlans") || "[]"
      );
      localStorage.setItem(
        "workoutPlans",
        JSON.stringify([...existingPlans, newPlan])
      );

      // Reset form
      setWorkoutPlan({
        name: "",
        description: "",
        type: "strength",
        difficulty: "beginner",
        duration: 30,
        exercises: [],
        frequency: "3x-week",
        targetMuscleGroups: [],
      });

      alert("Workout plan saved successfully!");
    } else {
      alert(
        "Please fill in all required fields and add at least one exercise."
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl dark:text-white">
        Create Workout Plan
      </h2>

      {/* Basic Information */}
      <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 sm:mb-6 sm:p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg dark:text-white">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Plan Name *
            </label>
            <input
              type="text"
              value={workoutPlan.name}
              onChange={(e) =>
                setWorkoutPlan((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
              placeholder="e.g., Upper Body Strength"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={workoutPlan.type}
              onChange={(e) =>
                setWorkoutPlan((prev) => ({
                  ...prev,
                  type: e.target.value as any,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            >
              <option value="strength">Strength Training</option>
              <option value="cardio">Cardio</option>
              <option value="flexibility">Flexibility</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Difficulty
            </label>
            <select
              value={workoutPlan.difficulty}
              onChange={(e) =>
                setWorkoutPlan((prev) => ({
                  ...prev,
                  difficulty: e.target.value as any,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={workoutPlan.duration}
              onChange={(e) =>
                setWorkoutPlan((prev) => ({
                  ...prev,
                  duration: parseInt(e.target.value),
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              min="10"
              max="180"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Frequency
            </label>
            <select
              value={workoutPlan.frequency}
              onChange={(e) =>
                setWorkoutPlan((prev) => ({
                  ...prev,
                  frequency: e.target.value as any,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="3x-week">3x per week</option>
              <option value="4x-week">4x per week</option>
              <option value="5x-week">5x per week</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={workoutPlan.description}
            onChange={(e) =>
              setWorkoutPlan((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Describe your workout plan..."
          />
        </div>
      </div>

      {/* Exercises */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Exercises</h3>
          <button
            onClick={() => setShowExerciseModal(true)}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            <span>Add Exercise</span>
          </button>
        </div>

        {workoutPlan.exercises?.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No exercises added yet. Click "Add Exercise" to get started.
          </p>
        ) : (
          <div className="space-y-3">
            {workoutPlan.exercises?.map((exercise, index) => (
              <div
                key={exercise.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium text-gray-900">
                    {index + 1}.
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {exercise.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {exercise.muscleGroup} • {exercise.equipment}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-gray-600">
                    {exercise.sets} sets × {exercise.reps} reps
                    {exercise.weight && ` @ ${exercise.weight}kg`}
                  </div>
                  <button
                    onClick={() => removeExercise(exercise.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveWorkoutPlan}
          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
        >
          Save Workout Plan
        </button>
      </div>

      {/* Exercise Modal */}
      {showExerciseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Add Exercise
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Exercise
                </label>
                <select
                  value={selectedExercise.name || ""}
                  onChange={(e) => {
                    const exercise = EXERCISE_LIBRARY.find(
                      (ex) => ex.name === e.target.value
                    );
                    setSelectedExercise((prev) => ({
                      ...prev,
                      name: exercise?.name,
                      category: exercise?.category,
                      muscleGroup: exercise?.muscleGroup,
                      equipment: exercise?.equipment,
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an exercise...</option>
                  {EXERCISE_LIBRARY.map((exercise) => (
                    <option key={exercise.id} value={exercise.name}>
                      {exercise.name} ({exercise.muscleGroup})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Sets
                  </label>
                  <input
                    type="number"
                    value={selectedExercise.sets}
                    onChange={(e) =>
                      setSelectedExercise((prev) => ({
                        ...prev,
                        sets: parseInt(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="10"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Reps
                  </label>
                  <input
                    type="number"
                    value={selectedExercise.reps}
                    onChange={(e) =>
                      setSelectedExercise((prev) => ({
                        ...prev,
                        reps: parseInt(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="50"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Rest (sec)
                  </label>
                  <input
                    type="number"
                    value={selectedExercise.restTime}
                    onChange={(e) =>
                      setSelectedExercise((prev) => ({
                        ...prev,
                        restTime: parseInt(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    min="30"
                    max="300"
                  />
                </div>
              </div>

              {selectedExercise.category === "strength" && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={selectedExercise.weight || ""}
                    onChange={(e) =>
                      setSelectedExercise((prev) => ({
                        ...prev,
                        weight: parseInt(e.target.value),
                      }))
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="500"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowExerciseModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={addExercise}
                className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Add Exercise</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
