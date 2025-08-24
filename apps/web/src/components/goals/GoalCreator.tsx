import { useState } from "react";
import {
  WeightLossIcon,
  MuscleGainIcon,
  StrengthIcon,
  EnduranceIcon,
  FlexibilityIcon,
  GoalIcon,
  PlusIcon,
} from "../ui/Icons";

interface Goal {
  id: string;
  title: string;
  description: string;
  type:
    | "weight-loss"
    | "muscle-gain"
    | "strength"
    | "endurance"
    | "flexibility";
  target: string;
  current: string;
  deadline: string;
  progress: number;
}

interface GoalCreatorProps {
  onClose: () => void;
  onSave: (goal: Goal) => void;
}

const GOAL_TYPES = [
  {
    id: "weight-loss",
    label: "Weight Loss",
    icon: <WeightLossIcon className="h-5 w-5" />,
  },
  {
    id: "muscle-gain",
    label: "Muscle Gain",
    icon: <MuscleGainIcon className="h-5 w-5" />,
  },
  {
    id: "strength",
    label: "Strength",
    icon: <StrengthIcon className="h-5 w-5" />,
  },
  {
    id: "endurance",
    label: "Endurance",
    icon: <EnduranceIcon className="h-5 w-5" />,
  },
  {
    id: "flexibility",
    label: "Flexibility",
    icon: <FlexibilityIcon className="h-5 w-5" />,
  },
];

export default function GoalCreator({ onClose, onSave }: GoalCreatorProps) {
  const [goal, setGoal] = useState<Partial<Goal>>({
    title: "",
    description: "",
    type: "strength",
    target: "",
    current: "",
    deadline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!goal.title || !goal.target || !goal.current || !goal.deadline) {
      alert("Please fill in all required fields");
      return;
    }

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: goal.title!,
      description: goal.description || "",
      type: goal.type!,
      target: goal.target!,
      current: goal.current!,
      deadline: goal.deadline!,
      progress: 0,
    };

    onSave(newGoal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-colors duration-200 dark:bg-gray-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Create New Goal
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Goal Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Goal Title *
            </label>
            <input
              type="text"
              value={goal.title}
              onChange={(e) =>
                setGoal((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
              placeholder="e.g., Lose 10 pounds"
              required
            />
          </div>

          {/* Goal Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={goal.description}
              onChange={(e) =>
                setGoal((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
              placeholder="Describe your goal..."
              rows={3}
            />
          </div>

          {/* Goal Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Goal Type *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {GOAL_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    setGoal((prev) => ({
                      ...prev,
                      type: type.id as Goal["type"],
                    }))
                  }
                  className={`flex items-center space-x-2 rounded-lg border p-3 text-left transition-colors ${
                    goal.type === type.id
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {type.icon}
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current and Target Values */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Value *
              </label>
              <input
                type="text"
                value={goal.current}
                onChange={(e) =>
                  setGoal((prev) => ({ ...prev, current: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
                placeholder="e.g., 80kg"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Target Value *
              </label>
              <input
                type="text"
                value={goal.target}
                onChange={(e) =>
                  setGoal((prev) => ({ ...prev, target: e.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
                placeholder="e.g., 70kg"
                required
              />
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Deadline *
            </label>
            <input
              type="date"
              value={goal.deadline}
              onChange={(e) =>
                setGoal((prev) => ({ ...prev, deadline: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-blue-400"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Create Goal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
