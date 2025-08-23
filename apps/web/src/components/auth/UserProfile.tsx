import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface UserProfileData {
  displayName: string;
  age: number;
  gender: "male" | "female" | "other" | "prefer-not-to-say";
  height: number; // in cm
  weight: number; // in kg
  fitnessLevel: "beginner" | "intermediate" | "advanced";
  goals: string[];
  activityLevel:
    | "sedentary"
    | "lightly-active"
    | "moderately-active"
    | "very-active"
    | "extremely-active";
  profilePicture?: string;
}

const FITNESS_LEVELS = [
  {
    value: "beginner",
    label: "Beginner",
    description: "New to fitness or returning after a long break",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    description: "Regular exercise routine for 6+ months",
  },
  {
    value: "advanced",
    label: "Advanced",
    description: "Consistent training for 2+ years",
  },
];

const ACTIVITY_LEVELS = [
  {
    value: "sedentary",
    label: "Sedentary",
    description: "Little to no exercise",
  },
  {
    value: "lightly-active",
    label: "Lightly Active",
    description: "Light exercise 1-3 days/week",
  },
  {
    value: "moderately-active",
    label: "Moderately Active",
    description: "Moderate exercise 3-5 days/week",
  },
  {
    value: "very-active",
    label: "Very Active",
    description: "Hard exercise 6-7 days/week",
  },
  {
    value: "extremely-active",
    label: "Extremely Active",
    description: "Very hard exercise, physical job",
  },
];

const FITNESS_GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "Strength Training",
  "Cardiovascular Fitness",
  "Flexibility",
  "General Health",
  "Sports Performance",
  "Rehabilitation",
];

export default function UserProfile() {
  const { currentUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<UserProfileData>({
    displayName: currentUser?.displayName || "",
    age: 25,
    gender: "prefer-not-to-say",
    height: 170,
    weight: 70,
    fitnessLevel: "beginner",
    goals: [],
    activityLevel: "moderately-active",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const totalSteps = 4;

  const handleInputChange = (field: keyof UserProfileData, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setProfileData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
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

  const handleSave = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Here you would typically save to your backend
      // For now, we'll just update the local auth context
      if (updateUserProfile) {
        await updateUserProfile(profileData);
      }

      setIsEditing(false);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Personal Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.displayName}
              onChange={(e) => handleInputChange("displayName", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              value={profileData.age}
              onChange={(e) =>
                handleInputChange("age", parseInt(e.target.value))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              min="13"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              value={profileData.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Physical Measurements
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Height (cm)
            </label>
            <input
              type="number"
              value={profileData.height}
              onChange={(e) =>
                handleInputChange("height", parseInt(e.target.value))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              min="100"
              max="250"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              value={profileData.weight}
              onChange={(e) =>
                handleInputChange("weight", parseFloat(e.target.value))
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
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
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Fitness Level & Activity
        </h3>
        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Current Fitness Level
            </label>
            <div className="space-y-3">
              {FITNESS_LEVELS.map((level) => (
                <label
                  key={level.value}
                  className="flex cursor-pointer items-start space-x-3"
                >
                  <input
                    type="radio"
                    name="fitnessLevel"
                    value={level.value}
                    checked={profileData.fitnessLevel === level.value}
                    onChange={(e) =>
                      handleInputChange("fitnessLevel", e.target.value)
                    }
                    className="mt-1 h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {level.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {level.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700">
              Activity Level
            </label>
            <div className="space-y-3">
              {ACTIVITY_LEVELS.map((level) => (
                <label
                  key={level.value}
                  className="flex cursor-pointer items-start space-x-3"
                >
                  <input
                    type="radio"
                    name="activityLevel"
                    value={level.value}
                    checked={profileData.activityLevel === level.value}
                    onChange={(e) =>
                      handleInputChange("activityLevel", e.target.value)
                    }
                    className="mt-1 h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {level.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {level.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-900">
          Fitness Goals
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          Select all that apply to your fitness journey
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {FITNESS_GOALS.map((goal) => (
            <label
              key={goal}
              className="flex cursor-pointer items-center space-x-3 rounded-lg border p-3 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={profileData.goals.includes(goal)}
                onChange={() => handleGoalToggle(goal)}
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-900">{goal}</span>
            </label>
          ))}
        </div>
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
      default:
        return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              {isEditing ? "Edit Profile" : "Complete Your Profile"}
            </h1>
            <p className="text-gray-600">
              {isEditing
                ? "Update your personal information and preferences"
                : "Let's personalize your fitness experience"}
            </p>
          </div>

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
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-purple-600 transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Step Content */}
          <div className="mb-8">{renderStep()}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex space-x-3">
              {currentStep < totalSteps ? (
                <button onClick={nextStep} className="btn-primary">
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save Profile"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
