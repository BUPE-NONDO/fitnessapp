import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, collection, query, where, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';

export interface WorkoutPlan {
  id: string;
  userId: string;
  title: string;
  description: string;
  goal: string;
  fitnessLevel: string;
  duration: number;
  workoutsPerWeek: number;
  estimatedCaloriesPerWeek: number;
  weeklySchedule: WorkoutDay[];
  progressTracking: {
    currentWeek: number;
    completedWorkouts: number;
    totalWorkouts: number;
    startDate: Date;
    lastUpdated: Date;
  };
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkoutDay {
  id: string;
  dayOfWeek: string;
  name: string;
  type: string;
  duration: number;
  exercises: Exercise[];
  warmUp: Exercise[];
  coolDown: Exercise[];
  totalCalories: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  duration?: string;
  restTime: string;
  muscle: string;
  equipment?: string;
  instructions?: string;
}

export class UserWorkoutPlanService {
  static async getCurrentWorkoutPlan(userId: string): Promise<WorkoutPlan | null> {
    try {
      console.log(`🔍 Fetching current workout plan for user: ${userId}`);
      
      const plansRef = collection(db, 'workout_plans');
      const q = query(
        plansRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'), 
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const planDoc = querySnapshot.docs[0];
        const planData = planDoc.data();
        console.log(`✅ Found current workout plan: ${planData.title}`);
        console.log(`📋 Plan has ${planData.weeklySchedule?.length || 0} workout days`);
        
        return {
          id: planDoc.id,
          ...planData,
          createdAt: planData.createdAt?.toDate() || new Date(),
          updatedAt: planData.updatedAt?.toDate() || new Date(),
          progressTracking: {
            currentWeek: 1,
            completedWorkouts: 0,
            totalWorkouts: planData.workoutsPerWeek * planData.duration,
            startDate: planData.createdAt?.toDate() || new Date(),
            lastUpdated: new Date(),
            ...planData.progressTracking,
          }
        } as WorkoutPlan;
      }
      
      console.log(`❌ No workout plans found for user: ${userId}`);
      return null;
    } catch (error) {
      console.error('❌ Error fetching current workout plan:', error);
      return null;
    }
  }

  static async getAllWorkoutPlans(userId: string): Promise<WorkoutPlan[]> {
    try {
      console.log(`🔍 Fetching all workout plans for user: ${userId}`);
      
      const plansRef = collection(db, 'workout_plans');
      const q = query(
        plansRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const plans: WorkoutPlan[] = [];
      querySnapshot.forEach((doc) => {
        const planData = doc.data();
        plans.push({
          id: doc.id,
          ...planData,
          createdAt: planData.createdAt?.toDate() || new Date(),
          updatedAt: planData.updatedAt?.toDate() || new Date(),
          progressTracking: {
            currentWeek: 1,
            completedWorkouts: 0,
            totalWorkouts: planData.workoutsPerWeek * planData.duration,
            startDate: planData.createdAt?.toDate() || new Date(),
            lastUpdated: new Date(),
            ...planData.progressTracking,
          }
        } as WorkoutPlan);
      });
      
      console.log(`✅ Found ${plans.length} workout plans for user: ${userId}`);
      return plans;
    } catch (error) {
      console.error('❌ Error fetching all workout plans:', error);
      return [];
    }
  }

  static async hasWorkoutPlan(userId: string): Promise<boolean> {
    try {
      const currentPlan = await this.getCurrentWorkoutPlan(userId);
      return currentPlan !== null;
    } catch (error) {
      console.error('❌ Error checking if user has workout plan:', error);
      return false;
    }
  }
}
