import React from 'react';

interface WaterTrackerProps {
  waterIntake: number; // in ml
  onUpdate: (waterIntake: number) => void;
}

export default function WaterTracker({ waterIntake, onUpdate }: WaterTrackerProps) {
  const handleAddWater = (amount: number) => {
    onUpdate(waterIntake + amount);
  };

  const handleReset = () => {
    onUpdate(0);
  };

  const liters = waterIntake / 1000;
  const glasses = Math.round(waterIntake / 250); // Assuming 250ml per glass

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        💧 Water Intake
      </h3>
      
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-blue-600 mb-1">
          {liters.toFixed(1)}L
        </div>
        <div className="text-sm text-gray-600">
          {glasses} glasses ({waterIntake}ml)
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleAddWater(250)}
            className="btn-secondary text-sm py-2"
          >
            + 250ml
          </button>
          <button
            onClick={() => handleAddWater(500)}
            className="btn-secondary text-sm py-2"
          >
            + 500ml
          </button>
          <button
            onClick={() => handleAddWater(1000)}
            className="btn-secondary text-sm py-2"
          >
            + 1L
          </button>
        </div>
        
        <button
          onClick={handleReset}
          className="w-full text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Goal: 2.5L</span>
          <span>{Math.round((liters / 2.5) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((liters / 2.5) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
