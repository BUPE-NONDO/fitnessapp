import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface OnboardingData {
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
  primaryGoal: {
    type: string;
    targetWeight?: number;
    timeframe: string;
    motivation: string;
  };
  preferences: {
    workoutDuration: number;
    workoutFrequency: number;
    preferredExercises: string[];
    dietaryRestrictions: string[];
  };
}

const FITNESS_LEVELS = [
  {
    value: "beginner",
    label: "Beginner",
    description: "New to fitness or returning after a long break",
    icon: "🌱",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Regular exercise routine for 6+ months",
    icon: "💪",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Consistent training for 2+ years",
    icon: "🔥",
  },
];

const ACTIVITY_LEVELS = [
  {
    value: "sedentary",
    label: "Sedentary",
    description: "Little to no exercise",
    icon: "🛋️",
  },
  {
    value: "lightly-active",
    label: "Lightly Active",
    description: "Light exercise 1-3 days/week",
    icon: "🚶",
  },
  {
    value: "moderately-active",
    label: "Moderately Active",
    description: "Moderate exercise 3-5 days/week",
    icon: "🏃",
  },
  {
    value: "very-active",
    label: "Very Active",
    description: "Hard exercise 6-7 days/week",
    icon: "🏋️",
  },
  {
    value: "extremely-active",
    label: "Extremely Active",
    description: "Very hard exercise, physical job",
    icon: "⚡",
  },
];

const FITNESS_GOALS = [
  {
    value: "Weight Loss",
    icon: "⚖️",
    description: "Lose body fat and get leaner",
  },
  {
    value: "Muscle Gain",
    icon: "💪",
    description: "Build muscle mass and strength",
  },
  {
    value: "Strength Training",
    icon: "🏋️",
    description: "Improve overall strength",
  },
  {
    value: "Cardiovascular Fitness",
    icon: "❤️",
    description: "Improve heart health and endurance",
  },
  {
    value: "Flexibility",
    icon: "🧘",
    description: "Improve mobility and flexibility",
  },
  {
    value: "General Health",
    icon: "🏥",
    description: "Maintain overall health and wellness",
  },
  {
    value: "Sports Performance",
    icon: "⚽",
    description: "Enhance athletic performance",
  },
  {
    value: "Rehabilitation",
    icon: "🩹",
    description: "Recover from injury or surgery",
  },
];

const WORKOUT_PREFERENCES = [
  { value: "strength-training", label: "Strength Training", icon: "🏋️" },
  { value: "cardio", label: "Cardio", icon: "❤️" },
  { value: "yoga", label: "Yoga & Flexibility", icon: "🧘" },
  { value: "hiit", label: "HIIT", icon: "⚡" },
  { value: "pilates", label: "Pilates", icon: "🤸" },
  { value: "running", label: "Running", icon: "🏃" },
  { value: "cycling", label: "Cycling", icon: "🚴" },
  { value: "swimming", label: "Swimming", icon: "🏊" },
];

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    displayName: "",
    age: 25,
    gender: "prefer-not-to-say",
    height: 170,
    weight: 70,
    fitnessLevel: "beginner",
    goals: [],
    activityLevel: "moderately-active",
    primaryGoal: {
      type: "general-health",
      timeframe: "3-months",
      motivation: "",
    },
    preferences: {
      workoutDuration: 45,
      workoutFrequency: 3,
      preferredExercises: [],
      dietaryRestrictions: [],
    },
  });

  const totalSteps = 6;

  const handleInputChange = (field: keyof OnboardingData, value: any) => {
    setOnboardingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handlePreferenceToggle = (preference: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        preferredExercises: prev.preferences.preferredExercises.includes(
          preference
        )
          ? prev.preferences.preferredExercises.filter((p) => p !== preference)
          : [...prev.preferences.preferredExercises, preference],
      },
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    // Here you would save the onboarding data to your backend
    console.log("Onboarding completed:", onboardingData);
    navigate("/dashboard");
  };

  const renderStep1 = () => (
    <div className="space-y-6 text-center">
      <div className="mb-4 text-6xl">🎯</div>
      <h2 className="text-3xl font-bold text-gray-900">Welcome to AuraFit!</h2>
      <p className="mx-auto max-w-2xl text-xl text-gray-600">
        Let's personalize your fitness journey. We'll ask a few questions to
        create the perfect experience for you.
      </p>
      <div className="mx-auto max-w-md rounded-xl bg-purple-50 p-6">
        <h3 className="mb-2 font-semibold text-purple-900">
          What we'll cover:
        </h3>
        <ul className="space-y-1 text-left text-purple-700">
          <li>• Your personal information</li>
          <li>• Fitness goals and preferences</li>
          <li>• Current activity level</li>
          <li>• Workout preferences</li>
          <li>• Nutrition goals</li>
        </ul>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Tell us about yourself
        </h2>
        <p className="text-gray-600">
          This helps us personalize your experience
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={onboardingData.displayName}
            onChange={(e) => handleInputChange("displayName", e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your full name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              value={onboardingData.age}
              onChange={(e) =>
                handleInputChange("age", parseInt(e.target.value))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
              min="13"
              max="120"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              value={onboardingData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Height (cm)
            </label>
            <input
              type="number"
              value={onboardingData.height}
              onChange={(e) =>
                handleInputChange("height", parseInt(e.target.value))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
              min="100"
              max="250"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              value={onboardingData.weight}
              onChange={(e) =>
                handleInputChange("weight", parseFloat(e.target.value))
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
              min="30"
              max="300"
              step="0.1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          What are your fitness goals?
        </h2>
        <p className="text-gray-600">
          Select all that apply to your fitness journey
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {FITNESS_GOALS.map((goal) => (
          <label
            key={goal.value}
            className="flex cursor-pointer items-start space-x-3 rounded-xl border p-4 transition-colors hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={onboardingData.goals.includes(goal.value)}
              onChange={() => handleGoalToggle(goal.value)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{goal.icon}</span>
                <span className="font-medium text-gray-900">{goal.value}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {goal.description}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          What's your current fitness level?
        </h2>
        <p className="text-gray-600">
          This helps us recommend appropriate workouts
        </p>
      </div>

      <div className="space-y-3">
        {FITNESS_LEVELS.map((level) => (
          <label
            key={level.value}
            className="flex cursor-pointer items-start space-x-3 rounded-xl border p-4 transition-colors hover:bg-gray-50"
          >
            <input
              type="radio"
              name="fitnessLevel"
              value={level.value}
              checked={onboardingData.fitnessLevel === level.value}
              onChange={(e) =>
                handleInputChange("fitnessLevel", e.target.value)
              }
              className="mt-1 h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{level.icon}</span>
                <span className="font-medium text-gray-900">{level.label}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {level.description}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          What's your activity level?
        </h2>
        <p className="text-gray-600">
          This helps us calculate your daily calorie needs
        </p>
      </div>

      <div className="space-y-3">
        {ACTIVITY_LEVELS.map((level) => (
          <label
            key={level.value}
            className="flex cursor-pointer items-start space-x-3 rounded-xl border p-4 transition-colors hover:bg-gray-50"
          >
            <input
              type="radio"
              name="activityLevel"
              value={level.value}
              checked={onboardingData.activityLevel === level.value}
              onChange={(e) =>
                handleInputChange("activityLevel", e.target.value)
              }
              className="mt-1 h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{level.icon}</span>
                <span className="font-medium text-gray-900">{level.label}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {level.description}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          What types of workouts do you enjoy?
        </h2>
        <p className="text-gray-600">Select your preferred exercise types</p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {WORKOUT_PREFERENCES.map((pref) => (
          <label
            key={pref.value}
            className="flex cursor-pointer flex-col items-center rounded-xl border p-4 transition-colors hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={onboardingData.preferences.preferredExercises.includes(
                pref.value
              )}
              onChange={() => handlePreferenceToggle(pref.value)}
              className="sr-only"
            />
            <div
              className={`mb-2 text-3xl ${onboardingData.preferences.preferredExercises.includes(pref.value) ? "text-purple-600" : "text-gray-400"}`}
            >
              {pref.icon}
            </div>
            <div
              className={`text-center text-sm font-medium ${onboardingData.preferences.preferredExercises.includes(pref.value) ? "text-purple-600" : "text-gray-700"}`}
            >
              {pref.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-200">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">{renderStep()}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="rounded-xl border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex space-x-3">
              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-medium text-white transition-all hover:from-purple-700 hover:to-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3 font-medium text-white transition-all hover:from-green-700 hover:to-emerald-700"
                >
                  Complete Setup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
