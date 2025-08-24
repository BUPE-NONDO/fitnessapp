import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import WorkoutPlanCreator from "../workouts/WorkoutPlanCreator";
import WorkoutSession from "../workouts/WorkoutSession";
import {
  HomeIcon,
  GoalIcon,
  WorkoutIcon,
  ProgressIcon,
  StrengthIcon,
  CardioIcon,
  FlexibilityIcon,
  BodyweightIcon,
  WeightLossIcon,
  MuscleGainIcon,
  EnduranceIcon,
  PlusIcon,
} from "../ui/Icons";

interface Goal {
  id: string;
  type:
    | "weight-loss"
    | "muscle-gain"
    | "strength"
    | "endurance"
    | "flexibility";
  title: string;
  target: string;
  current: string;
  progress: number;
  deadline: string;
}

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  type: "strength" | "cardio" | "flexibility" | "mixed";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  exercises: any[];
  frequency: "daily" | "3x-week" | "4x-week" | "5x-week";
  targetMuscleGroups: string[];
  nextWorkout: string;
  progress: number;
}

export default function Dashboard() {
  const { currentUser, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "goals" | "workouts" | "progress"
  >("overview");
  const [showWorkoutCreator, setShowWorkoutCreator] = useState(false);
  const [activeWorkoutSession, setActiveWorkoutSession] =
    useState<WorkoutPlan | null>(null);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);

  // Mock data for goals
  const [goals] = useState<Goal[]>([
    {
      id: "1",
      type: "weight-loss",
      title: "Lose 10kg",
      target: "70kg",
      current: "75kg",
      progress: 50,
      deadline: "2024-03-15",
    },
    {
      id: "2",
      type: "strength",
      title: "Bench Press 100kg",
      target: "100kg",
      current: "80kg",
      progress: 40,
      deadline: "2024-04-01",
    },
  ]);

  // Load workout plans from localStorage
  useEffect(() => {
    const savedPlans = JSON.parse(localStorage.getItem("workoutPlans") || "[]");
    setWorkoutPlans(savedPlans);
  }, []);

  // Mock data for workout plans (fallback)
  const defaultWorkoutPlans: WorkoutPlan[] = [
    {
      id: "1",
      name: "Strength Training",
      description: "Upper body strength workout",
      type: "strength",
      duration: 45,
      difficulty: "intermediate",
      exercises: [],
      frequency: "3x-week",
      targetMuscleGroups: ["Chest", "Back", "Arms"],
      nextWorkout: "Today",
      progress: 75,
    },
    {
      id: "2",
      name: "Cardio Blast",
      description: "High-intensity cardio session",
      type: "cardio",
      duration: 30,
      difficulty: "beginner",
      exercises: [],
      frequency: "4x-week",
      targetMuscleGroups: ["Cardio"],
      nextWorkout: "Tomorrow",
      progress: 60,
    },
  ];

  const displayWorkoutPlans =
    workoutPlans.length > 0 ? workoutPlans : defaultWorkoutPlans;

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/signin");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getGoalIcon = (type: string) => {
    switch (type) {
      case "weight-loss":
        return <WeightLossIcon className="h-6 w-6" />;
      case "muscle-gain":
        return <MuscleGainIcon className="h-6 w-6" />;
      case "strength":
        return <StrengthIcon className="h-6 w-6" />;
      case "endurance":
        return <EnduranceIcon className="h-6 w-6" />;
      case "flexibility":
        return <FlexibilityIcon className="h-6 w-6" />;
      default:
        return <GoalIcon className="h-6 w-6" />;
    }
  };

  const getWorkoutIcon = (type: string) => {
    switch (type) {
      case "strength":
        return <StrengthIcon className="h-6 w-6" />;
      case "cardio":
        return <CardioIcon className="h-6 w-6" />;
      case "flexibility":
        return <FlexibilityIcon className="h-6 w-6" />;
      case "mixed":
        return <WorkoutIcon className="h-6 w-6" />;
      default:
        return <WorkoutIcon className="h-6 w-6" />;
    }
  };

  // Show workout creator if active
  if (showWorkoutCreator) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center">
                <button
                  onClick={() => setShowWorkoutCreator(false)}
                  className="mr-4 text-gray-600 hover:text-gray-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-2xl font-bold text-gray-900">AuraFit</h1>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button
                  onClick={handleSignOut}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>
        <WorkoutPlanCreator />
      </div>
    );
  }

  // Show workout session if active
  if (activeWorkoutSession) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white shadow-sm">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center">
                <button
                  onClick={() => setActiveWorkoutSession(null)}
                  className="mr-4 text-gray-600 hover:text-gray-800"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-2xl font-bold text-gray-900">AuraFit</h1>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <button
                  onClick={handleSignOut}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>
        <WorkoutSession workoutPlan={activeWorkoutSession} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                AuraFit
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <button
                onClick={handleSignOut}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:text-base dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white sm:p-6">
          <h1 className="text-xl font-bold sm:text-2xl">
            {getGreeting()}, {currentUser?.displayName || "Fitness Warrior"}! 👋
          </h1>
          <p className="mt-1 text-blue-100">
            Ready to crush your fitness goals today?
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex space-x-1 p-2">
            {[
              {
                id: "overview",
                label: "Overview",
                icon: <HomeIcon className="h-5 w-5" />,
              },
              {
                id: "goals",
                label: "Goals",
                icon: <GoalIcon className="h-5 w-5" />,
              },
              {
                id: "workouts",
                label: "Workouts",
                icon: <WorkoutIcon className="h-5 w-5" />,
              },
              {
                id: "progress",
                label: "Progress",
                icon: <ProgressIcon className="h-5 w-5" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-1 items-center justify-center space-x-2 rounded-xl px-2 py-2 transition-all sm:px-4 sm:py-3 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {tab.icon}
                <span className="hidden font-medium sm:inline">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 sm:p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 sm:h-12 sm:w-12 dark:bg-blue-900">
                    <GoalIcon className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6 dark:text-blue-400" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <div className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                      {goals.length}
                    </div>
                    <div className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      Active Goals
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 sm:p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 sm:h-12 sm:w-12 dark:bg-green-900">
                    <WorkoutIcon className="h-5 w-5 text-green-600 sm:h-6 sm:w-6 dark:text-green-400" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <div className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                      {displayWorkoutPlans.length}
                    </div>
                    <div className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      Workout Plans
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 sm:p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 sm:h-12 sm:w-12 dark:bg-purple-900">
                    <ProgressIcon className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <div className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                      12
                    </div>
                    <div className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      Day Streak
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 sm:p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setActiveTab("workouts")}
                  className="flex items-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white transition-all hover:from-blue-600 hover:to-blue-700 sm:p-4"
                >
                  <WorkoutIcon className="mr-3 h-6 w-6 sm:mr-4 sm:h-8 sm:w-8" />
                  <div className="text-left">
                    <div className="text-sm font-medium sm:text-base">
                      Start Workout
                    </div>
                    <div className="text-xs text-blue-100 sm:text-sm">
                      Begin your training session
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("goals")}
                  className="flex items-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-3 text-white transition-all hover:from-green-600 hover:to-green-700 sm:p-4"
                >
                  <GoalIcon className="mr-3 h-6 w-6 sm:mr-4 sm:h-8 sm:w-8" />
                  <div className="text-left">
                    <div className="text-sm font-medium sm:text-base">
                      Set New Goal
                    </div>
                    <div className="text-xs text-green-100 sm:text-sm">
                      Create a new fitness target
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Progress */}
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 sm:p-6 dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
                Recent Progress
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {goals.slice(0, 2).map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors duration-200 sm:p-4 dark:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <span className="mr-2 text-lg sm:mr-3 sm:text-xl">
                        {getGoalIcon(goal.type)}
                      </span>
                      <div>
                        <div className="text-sm font-medium text-gray-900 sm:text-base dark:text-white">
                          {goal.title}
                        </div>
                        <div className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                          {goal.current} → {goal.target}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-600 sm:text-base dark:text-blue-400">
                        {goal.progress}%
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Complete
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === "goals" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                Your Goals
              </h2>
              <button className="flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700 sm:px-4 sm:text-base">
                <PlusIcon className="h-4 w-4" />
                <span>Add Goal</span>
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 sm:p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center">
                      <span className="mr-3 text-xl sm:mr-4 sm:text-2xl">
                        {getGoalIcon(goal.type)}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                          {goal.title}
                        </h3>
                        <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                          Target: {goal.target} | Current: {goal.current}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Deadline: {goal.deadline}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600 sm:text-2xl dark:text-blue-400">
                        {goal.progress}%
                      </div>
                      <div className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                        Complete
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-300 dark:bg-blue-400"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workouts Tab */}
        {activeTab === "workouts" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                Workout Plans
              </h2>
              <button
                onClick={() => setShowWorkoutCreator(true)}
                className="flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700 sm:px-4 sm:text-base"
              >
                <PlusIcon className="h-4 w-4" />
                <span>Create Plan</span>
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {displayWorkoutPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 sm:p-6 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center">
                      <span className="mr-3 text-xl sm:mr-4 sm:text-2xl">
                        {getWorkoutIcon(plan.type)}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                          {plan.duration} min • {plan.difficulty}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          Next: {plan.nextWorkout}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-600 sm:text-2xl dark:text-green-400">
                        {plan.progress}%
                      </div>
                      <div className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                        Complete
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col space-y-2 sm:mt-4 sm:flex-row sm:space-x-2 sm:space-y-0">
                    <button
                      onClick={() => setActiveWorkoutSession(plan)}
                      className="flex-1 rounded-lg bg-blue-600 py-2 text-sm text-white transition-colors hover:bg-blue-700 sm:text-base"
                    >
                      Start Workout
                    </button>
                    <button className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-200 sm:px-4 sm:text-base dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === "progress" && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
              Progress Tracking
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 sm:p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg dark:text-white">
                  Weight Progress
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      Starting Weight
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      80kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      Current Weight
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      75kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      Target Weight
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      70kg
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      Progress
                    </span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      50%
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors duration-200 sm:p-6 dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg dark:text-white">
                  Workout Stats
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      This Week
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      4 workouts
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      Total Time
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      3h 20m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      Calories Burned
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      1,250
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                      Streak
                    </span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      12 days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
