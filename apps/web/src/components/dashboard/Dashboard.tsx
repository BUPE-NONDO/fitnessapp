import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

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
  type: "strength" | "cardio" | "flexibility" | "mixed";
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  nextWorkout: string;
  progress: number;
}

export default function Dashboard() {
  const { currentUser, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "goals" | "workouts" | "progress"
  >("overview");

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

  // Mock data for workout plans
  const [workoutPlans] = useState<WorkoutPlan[]>([
    {
      id: "1",
      name: "Strength Training",
      type: "strength",
      duration: "45 min",
      difficulty: "intermediate",
      nextWorkout: "Today",
      progress: 75,
    },
    {
      id: "2",
      name: "Cardio Blast",
      type: "cardio",
      duration: "30 min",
      difficulty: "beginner",
      nextWorkout: "Tomorrow",
      progress: 60,
    },
  ]);

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
        return "⚖️";
      case "muscle-gain":
        return "💪";
      case "strength":
        return "🏋️";
      case "endurance":
        return "🏃";
      case "flexibility":
        return "🧘";
      default:
        return "🎯";
    }
  };

  const getWorkoutIcon = (type: string) => {
    switch (type) {
      case "strength":
        return "🏋️";
      case "cardio":
        return "🏃";
      case "flexibility":
        return "🧘";
      case "mixed":
        return "⚡";
      default:
        return "💪";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
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

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">
            {getGreeting()}, {currentUser?.displayName || "Fitness Warrior"}! 👋
          </h1>
          <p className="mt-1 text-blue-100">
            Ready to crush your fitness goals today?
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 rounded-2xl bg-white shadow-sm">
          <div className="flex space-x-1 p-2">
            {[
              { id: "overview", label: "Overview", icon: "🏠" },
              { id: "goals", label: "Goals", icon: "🎯" },
              { id: "workouts", label: "Workouts", icon: "💪" },
              { id: "progress", label: "Progress", icon: "📊" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-1 items-center justify-center space-x-2 rounded-xl px-4 py-3 transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {goals.length}
                    </div>
                    <div className="text-sm text-gray-500">Active Goals</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                    <span className="text-xl">💪</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {workoutPlans.length}
                    </div>
                    <div className="text-sm text-gray-500">Workout Plans</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                    <span className="text-xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-sm text-gray-500">Day Streak</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <button
                  onClick={() => setActiveTab("workouts")}
                  className="flex items-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white transition-all hover:from-blue-600 hover:to-blue-700"
                >
                  <div className="mr-4 text-2xl">💪</div>
                  <div className="text-left">
                    <div className="font-medium">Start Workout</div>
                    <div className="text-sm text-blue-100">
                      Begin your training session
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("goals")}
                  className="flex items-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-4 text-white transition-all hover:from-green-600 hover:to-green-700"
                >
                  <div className="mr-4 text-2xl">🎯</div>
                  <div className="text-left">
                    <div className="font-medium">Set New Goal</div>
                    <div className="text-sm text-green-100">
                      Create a new fitness target
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Progress */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Recent Progress
              </h2>
              <div className="space-y-4">
                {goals.slice(0, 2).map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-xl">
                        {getGoalIcon(goal.type)}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {goal.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {goal.current} → {goal.target}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">
                        {goal.progress}%
                      </div>
                      <div className="text-xs text-gray-500">Complete</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === "goals" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Goals</h2>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                + Add Goal
              </button>
            </div>

            <div className="space-y-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-4 text-2xl">
                        {getGoalIcon(goal.type)}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Target: {goal.target} | Current: {goal.current}
                        </p>
                        <p className="text-xs text-gray-400">
                          Deadline: {goal.deadline}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {goal.progress}%
                      </div>
                      <div className="text-sm text-gray-500">Complete</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-300"
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
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Workout Plans
              </h2>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                + Create Plan
              </button>
            </div>

            <div className="space-y-4">
              {workoutPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="rounded-xl bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-4 text-2xl">
                        {getWorkoutIcon(plan.type)}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {plan.duration} • {plan.difficulty}
                        </p>
                        <p className="text-xs text-blue-600">
                          Next: {plan.nextWorkout}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {plan.progress}%
                      </div>
                      <div className="text-sm text-gray-500">Complete</div>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 rounded-lg bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700">
                      Start Workout
                    </button>
                    <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200">
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
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Progress Tracking
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Weight Progress
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Starting Weight
                    </span>
                    <span className="font-medium">80kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Current Weight
                    </span>
                    <span className="font-medium">75kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Target Weight</span>
                    <span className="font-medium">70kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="font-bold text-green-600">50%</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Workout Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">This Week</span>
                    <span className="font-medium">4 workouts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Total Time</span>
                    <span className="font-medium">3h 20m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Calories Burned
                    </span>
                    <span className="font-medium">1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Streak</span>
                    <span className="font-bold text-blue-600">12 days</span>
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
