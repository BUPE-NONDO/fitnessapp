import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

interface UserProfileData {
  displayName: string;
  age: number;
  gender: "male" | "female" | "other" | "prefer-not-to-say";
  height: number;
  weight: number;
  fitnessLevel: "beginner" | "intermediate" | "advanced";
  goals: string[];
  activityLevel:
    | "sedentary"
    | "lightly-active"
    | "moderately-active"
    | "very-active"
    | "extremely-active";
  primaryGoal?: {
    type: string;
    targetWeight?: number;
    timeframe: string;
    motivation: string;
  };
}

interface ActivityData {
  today: {
    calories: number;
    steps: number;
    workouts: number;
    water: number;
    sleep: number;
  };
  weekly: {
    workouts: number;
    totalTime: number;
    calories: number;
    streak: number;
  };
  monthly: {
    weightChange: number;
    bodyFatChange: number;
    muscleGain: number;
  };
}

export default function Dashboard() {
  const { currentUser, signOutUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "overview" | "workouts" | "nutrition" | "progress" | "social"
  >("overview");

  const [userProfile] = useState<UserProfileData>({
    displayName: currentUser?.displayName || "BUPE NONDO",
    age: 25,
    gender: "male",
    height: 175,
    weight: 75,
    fitnessLevel: "intermediate",
    goals: ["Weight Loss", "Muscle Gain", "Strength Training"],
    activityLevel: "moderately-active",
    primaryGoal: {
      type: "weight-loss",
      targetWeight: 70,
      timeframe: "3-months",
      motivation: "To improve overall health and fitness",
    },
  });

  const [activityData] = useState<ActivityData>({
    today: {
      calories: 1850,
      steps: 8420,
      workouts: 1,
      water: 6,
      sleep: 7.5,
    },
    weekly: {
      workouts: 4,
      totalTime: 320,
      calories: 12500,
      streak: 12,
    },
    monthly: {
      weightChange: -2.5,
      bodyFatChange: -1.2,
      muscleGain: 1.8,
    },
  });

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

  const getMotivationalMessage = () => {
    const messages = [
      "You're crushing your fitness goals! 💪",
      "Every workout brings you closer to your dreams! 🎯",
      "Your dedication is inspiring! Keep it up! 🔥",
      "Today is another opportunity to be amazing! ⭐",
      "You've got this! Your future self will thank you! 🚀",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-6 rounded-2xl bg-white shadow-sm">
          <div className="flex space-x-1 p-2">
            {[
              { id: "overview", label: "Overview", icon: "🏠" },
              { id: "workouts", label: "Workouts", icon: "💪" },
              { id: "nutrition", label: "Nutrition", icon: "🍎" },
              { id: "progress", label: "Progress", icon: "📊" },
              { id: "social", label: "Social", icon: "👥" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex flex-1 items-center justify-center space-x-2 rounded-xl px-4 py-3 transition-all ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md"
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
            {/* Welcome Section */}
            <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    {getGreeting()}, {userProfile.displayName}! 👋
                  </h1>
                  <p className="mt-1 text-purple-100">
                    {getMotivationalMessage()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">
                    {activityData.weekly.streak}
                  </div>
                  <div className="text-sm text-purple-100">Day Streak</div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                    <span className="text-lg text-red-600">🔥</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-gray-900">
                      {activityData.today.calories}
                    </div>
                    <div className="text-sm text-gray-500">Calories</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <span className="text-lg text-blue-600">👟</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-gray-900">
                      {activityData.today.steps.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Steps</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <span className="text-lg text-green-600">💧</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-gray-900">
                      {activityData.today.water}
                    </div>
                    <div className="text-sm text-gray-500">Glasses</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <span className="text-lg text-purple-600">😴</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-2xl font-bold text-gray-900">
                      {activityData.today.sleep}h
                    </div>
                    <div className="text-sm text-gray-500">Sleep</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Progress */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Today's Progress
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Calories Burned</span>
                    <span>{activityData.today.calories} / 2200</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-red-500 transition-all duration-300"
                      style={{
                        width: `${(activityData.today.calories / 2200) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Steps</span>
                    <span>
                      {activityData.today.steps.toLocaleString()} / 10,000
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                      style={{
                        width: `${(activityData.today.steps / 10000) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Water Intake</span>
                    <span>{activityData.today.water} / 8 glasses</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-green-500 transition-all duration-300"
                      style={{
                        width: `${(activityData.today.water / 8) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-gray-900">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <Link
                  to="/workout-plans"
                  className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 p-4 text-center text-white transition-all hover:from-red-600 hover:to-red-700"
                >
                  <div className="mb-2 text-2xl">🏋️</div>
                  <div className="font-medium">Start Workout</div>
                </Link>

                <Link
                  to="/nutrition/log"
                  className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-4 text-center text-white transition-all hover:from-green-600 hover:to-green-700"
                >
                  <div className="mb-2 text-2xl">🍎</div>
                  <div className="font-medium">Log Food</div>
                </Link>

                <Link
                  to="/progress"
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-center text-white transition-all hover:from-blue-600 hover:to-blue-700"
                >
                  <div className="mb-2 text-2xl">📊</div>
                  <div className="font-medium">View Progress</div>
                </Link>

                <Link
                  to="/social"
                  className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-center text-white transition-all hover:from-purple-600 hover:to-purple-700"
                >
                  <div className="mb-2 text-2xl">👥</div>
                  <div className="font-medium">Community</div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== "overview" && (
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <div className="mb-4 text-4xl">
              {activeTab === "workouts"
                ? "💪"
                : activeTab === "nutrition"
                  ? "🍎"
                  : activeTab === "progress"
                    ? "📊"
                    : "👥"}
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Coming
              Soon
            </h2>
            <p className="text-gray-500">
              This feature is being developed with modern fitness app standards.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
