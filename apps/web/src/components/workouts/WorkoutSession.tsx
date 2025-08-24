import { useState, useEffect } from "react";
import { TimerIcon, SkipIcon, CheckIcon } from "../ui/Icons";

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
  duration: number;
  exercises: Exercise[];
  frequency: "daily" | "3x-week" | "4x-week" | "5x-week";
  targetMuscleGroups: string[];
}

interface ExerciseProgress {
  exerciseId: string;
  completedSets: number;
  actualReps: number[];
  actualWeight?: number[];
  notes: string;
}

export default function WorkoutSession({
  workoutPlan,
}: {
  workoutPlan: WorkoutPlan;
}) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [exerciseProgress, setExerciseProgress] = useState<ExerciseProgress[]>(
    []
  );
  const [sessionComplete, setSessionComplete] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [currentNotes, setCurrentNotes] = useState("");

  const currentExercise = workoutPlan.exercises[currentExerciseIndex];

  useEffect(() => {
    if (sessionStartTime === null) {
      setSessionStartTime(new Date());
    }
  }, [sessionStartTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimeLeft > 0) {
      interval = setInterval(() => {
        setRestTimeLeft((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimeLeft]);

  const startRest = () => {
    setIsResting(true);
    setRestTimeLeft(currentExercise.restTime);
  };

  const completeSet = () => {
    const currentProgress = exerciseProgress.find(
      (p) => p.exerciseId === currentExercise.id
    );

    if (currentProgress) {
      // Update existing progress
      setExerciseProgress((prev) =>
        prev.map((p) =>
          p.exerciseId === currentExercise.id
            ? { ...p, completedSets: p.completedSets + 1 }
            : p
        )
      );
    } else {
      // Create new progress entry
      setExerciseProgress((prev) => [
        ...prev,
        {
          exerciseId: currentExercise.id,
          completedSets: 1,
          actualReps: [currentExercise.reps],
          actualWeight: currentExercise.weight
            ? [currentExercise.weight]
            : undefined,
          notes: "",
        },
      ]);
    }

    if (currentSet < currentExercise.sets) {
      setCurrentSet((prev) => prev + 1);
      startRest();
    } else {
      // Exercise complete, move to next
      if (currentExerciseIndex < workoutPlan.exercises.length - 1) {
        setCurrentExerciseIndex((prev) => prev + 1);
        setCurrentSet(1);
        startRest();
      } else {
        // Workout complete
        setSessionComplete(true);
      }
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTimeLeft(0);
  };

  const saveSession = () => {
    const sessionData = {
      workoutPlanId: workoutPlan.id,
      workoutPlanName: workoutPlan.name,
      startTime: sessionStartTime,
      endTime: new Date(),
      exerciseProgress,
      notes: currentNotes,
    };

    // Save to localStorage
    const existingSessions = JSON.parse(
      localStorage.getItem("workoutSessions") || "[]"
    );
    localStorage.setItem(
      "workoutSessions",
      JSON.stringify([...existingSessions, sessionData])
    );

    alert("Workout session saved successfully!");
    // In a real app, you'd navigate back to dashboard or show summary
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (sessionComplete) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <div className="mb-4 text-6xl">🎉</div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Workout Complete!
          </h2>
          <p className="mb-6 text-gray-600">
            Great job completing your workout!
          </p>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Session Notes
            </label>
            <textarea
              value={currentNotes}
              onChange={(e) => setCurrentNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="How did your workout feel? Any notes..."
            />
          </div>

          <button
            onClick={saveSession}
            className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
          >
            Save Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Header */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {workoutPlan.name}
            </h2>
            <p className="text-gray-600">
              Exercise {currentExerciseIndex + 1} of{" "}
              {workoutPlan.exercises.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Session Time</div>
            <div className="text-lg font-semibold text-gray-900">
              {sessionStartTime
                ? formatTime(
                    Math.floor((Date.now() - sessionStartTime.getTime()) / 1000)
                  )
                : "0:00"}
            </div>
          </div>
        </div>
      </div>

      {/* Rest Timer */}
      {isResting && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-6 text-center">
          <h3 className="mb-2 text-lg font-semibold text-blue-900">
            Rest Time
          </h3>
          <div className="mb-4 text-4xl font-bold text-blue-600">
            {formatTime(restTimeLeft)}
          </div>
          <button
            onClick={skipRest}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <SkipIcon className="h-4 w-4" />
            <span>Skip Rest</span>
          </button>
        </div>
      )}

      {/* Current Exercise */}
      {!isResting && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {currentExercise.name}
            </h3>
            <span className="text-sm text-gray-500">
              {currentExercise.muscleGroup}
            </span>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {currentSet}
              </div>
              <div className="text-sm text-gray-500">Set</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {currentExercise.sets}
              </div>
              <div className="text-sm text-gray-500">Total Sets</div>
            </div>
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {currentExercise.reps}
              </div>
              <div className="text-sm text-gray-500">Target Reps</div>
            </div>
          </div>

          {currentExercise.weight && (
            <div className="mb-4 rounded-lg bg-blue-50 p-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-900">
                  {currentExercise.weight} kg
                </div>
                <div className="text-sm text-blue-600">Target Weight</div>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={completeSet}
              className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-green-600 py-3 font-medium text-white transition-colors hover:bg-green-700"
            >
              <CheckIcon className="h-4 w-4" />
              <span>Complete Set</span>
            </button>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="rounded-lg bg-gray-100 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-200"
            >
              Notes
            </button>
          </div>

          {showNotes && (
            <div className="mt-4">
              <textarea
                placeholder="Add notes for this exercise..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          )}
        </div>
      )}

      {/* Progress */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Workout Progress
        </h3>
        <div className="space-y-3">
          {workoutPlan.exercises.map((exercise, index) => {
            const progress = exerciseProgress.find(
              (p) => p.exerciseId === exercise.id
            );
            const isCurrent = index === currentExerciseIndex;
            const isCompleted = index < currentExerciseIndex;

            return (
              <div
                key={exercise.id}
                className={`flex items-center justify-between rounded-lg p-3 ${
                  isCurrent
                    ? "border border-blue-200 bg-blue-50"
                    : isCompleted
                      ? "border border-green-200 bg-green-50"
                      : "bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium ${
                      isCurrent
                        ? "bg-blue-600 text-white"
                        : isCompleted
                          ? "bg-green-600 text-white"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {exercise.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {progress
                        ? `${progress.completedSets}/${exercise.sets} sets`
                        : `${exercise.sets} sets`}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {isCurrent
                    ? "In Progress"
                    : isCompleted
                      ? "Complete"
                      : "Pending"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
