import { render, screen, fireEvent } from "@testing-library/react";
import WorkoutPlanCreator from "../WorkoutPlanCreator";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("WorkoutPlanCreator", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue("[]");
    localStorageMock.setItem.mockClear();
  });

  test("renders workout plan creator form", () => {
    render(<WorkoutPlanCreator />);

    expect(screen.getByText("Create Workout Plan")).toBeInTheDocument();
    expect(screen.getByLabelText("Plan Name *")).toBeInTheDocument();
    expect(screen.getByText("Basic Information")).toBeInTheDocument();
    expect(screen.getByText("Exercises")).toBeInTheDocument();
  });

  test("allows adding exercises", () => {
    render(<WorkoutPlanCreator />);

    // Click add exercise button
    fireEvent.click(screen.getByText("+ Add Exercise"));

    // Modal should appear
    expect(screen.getByText("Add Exercise")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Select an exercise...")
    ).toBeInTheDocument();
  });

  test("saves workout plan when form is complete", () => {
    render(<WorkoutPlanCreator />);

    // Fill in required fields
    fireEvent.change(screen.getByLabelText("Plan Name *"), {
      target: { value: "Test Workout" },
    });

    // Add an exercise
    fireEvent.click(screen.getByText("+ Add Exercise"));
    fireEvent.change(screen.getByDisplayValue("Select an exercise..."), {
      target: { value: "Push-ups (Chest)" },
    });
    fireEvent.click(screen.getByText("Add Exercise"));

    // Save the plan
    fireEvent.click(screen.getByText("Save Workout Plan"));

    // Should save to localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "workoutPlans",
      expect.stringContaining("Test Workout")
    );
  });
});
