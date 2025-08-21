import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  FoodItem, 
  CreateFoodItemInput, 
  UpdateFoodItemInput,
  NutritionLog,
  CreateNutritionLogInput,
  UpdateNutritionLogInput,
  NutritionGoals,
  CreateNutritionGoalsInput,
  UpdateNutritionGoalsInput,
  NutritionSearchParams,
  NutritionSearchResult,
  NutritionFilters,
  FoodCategory,
  MealType
} from '@aurafit/shared/types/nutrition';
import {
  FoodItemSchema,
  CreateFoodItemSchema,
  UpdateFoodItemSchema,
  NutritionLogSchema,
  CreateNutritionLogSchema,
  UpdateNutritionLogSchema,
  NutritionGoalsSchema,
  CreateNutritionGoalsSchema,
  UpdateNutritionGoalsSchema,
  NutritionSearchParamsSchema
} from '@aurafit/shared/schemas/nutrition';

export class NutritionService {
  private readonly FOODS_COLLECTION = 'foods';
  private readonly NUTRITION_LOGS_COLLECTION = 'nutritionLogs';
  private readonly NUTRITION_GOALS_COLLECTION = 'nutritionGoals';

  // Food Database Methods
  async getFoods(params: NutritionSearchParams = {}): Promise<NutritionSearchResult> {
    try {
      const validatedParams = NutritionSearchParamsSchema.parse(params);
      const { search, category, page = 1, limit: limitParam = 20, sortBy = 'name', sortOrder = 'asc' } = validatedParams;

      let q = query(collection(db, this.FOODS_COLLECTION));

      // Apply filters
      if (search) {
        q = query(q, where('name', '>=', search), where('name', '<=', search + '\uf8ff'));
      }

      if (category) {
        q = query(q, where('category', '==', category));
      }

      // Apply sorting
      q = query(q, orderBy(sortBy, sortOrder));

      // Apply pagination
      const offset = (page - 1) * limitParam;
      if (offset > 0) {
        // For pagination, we'd need to implement cursor-based pagination
        // This is a simplified version
      }
      q = query(q, limit(limitParam));

      const snapshot = await getDocs(q);
      const foods: FoodItem[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        foods.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as FoodItem);
      });

      return {
        foods,
        total: foods.length, // In a real app, you'd get total from a separate count query
        page,
        limit: limitParam,
        totalPages: Math.ceil(foods.length / limitParam)
      };
    } catch (error) {
      console.error('Error fetching foods:', error);
      throw new Error('Failed to fetch foods');
    }
  }

  async getFoodById(foodId: string): Promise<FoodItem | null> {
    try {
      const docRef = doc(db, this.FOODS_COLLECTION, foodId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as FoodItem;
      }

      return null;
    } catch (error) {
      console.error('Error fetching food by ID:', error);
      throw new Error('Failed to fetch food');
    }
  }

  async createFood(foodData: CreateFoodItemInput): Promise<FoodItem> {
    try {
      const validatedData = CreateFoodItemSchema.parse(foodData);
      
      const docRef = await addDoc(collection(db, this.FOODS_COLLECTION), {
        ...validatedData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const newFood = await this.getFoodById(docRef.id);
      if (!newFood) {
        throw new Error('Failed to create food item');
      }

      return newFood;
    } catch (error) {
      console.error('Error creating food:', error);
      throw new Error('Failed to create food item');
    }
  }

  async updateFood(foodId: string, foodData: UpdateFoodItemInput): Promise<FoodItem> {
    try {
      const validatedData = UpdateFoodItemSchema.parse(foodData);
      
      const docRef = doc(db, this.FOODS_COLLECTION, foodId);
      await updateDoc(docRef, {
        ...validatedData,
        updatedAt: serverTimestamp()
      });

      const updatedFood = await this.getFoodById(foodId);
      if (!updatedFood) {
        throw new Error('Failed to update food item');
      }

      return updatedFood;
    } catch (error) {
      console.error('Error updating food:', error);
      throw new Error('Failed to update food item');
    }
  }

  async deleteFood(foodId: string): Promise<void> {
    try {
      const docRef = doc(db, this.FOODS_COLLECTION, foodId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting food:', error);
      throw new Error('Failed to delete food item');
    }
  }

  // Nutrition Logging Methods
  async getNutritionLogs(userId: string, startDate?: string, endDate?: string): Promise<NutritionLog[]> {
    try {
      let q = query(
        collection(db, this.NUTRITION_LOGS_COLLECTION),
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );

      if (startDate) {
        q = query(q, where('date', '>=', startDate));
      }

      if (endDate) {
        q = query(q, where('date', '<=', endDate));
      }

      const snapshot = await getDocs(q);
      const logs: NutritionLog[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        logs.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as NutritionLog);
      });

      return logs;
    } catch (error) {
      console.error('Error fetching nutrition logs:', error);
      throw new Error('Failed to fetch nutrition logs');
    }
  }

  async getNutritionLogById(logId: string): Promise<NutritionLog | null> {
    try {
      const docRef = doc(db, this.NUTRITION_LOGS_COLLECTION, logId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as NutritionLog;
      }

      return null;
    } catch (error) {
      console.error('Error fetching nutrition log by ID:', error);
      throw new Error('Failed to fetch nutrition log');
    }
  }

  async getNutritionLogByDate(userId: string, date: string): Promise<NutritionLog | null> {
    try {
      const q = query(
        collection(db, this.NUTRITION_LOGS_COLLECTION),
        where('userId', '==', userId),
        where('date', '==', date)
      );

      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as NutritionLog;
      }

      return null;
    } catch (error) {
      console.error('Error fetching nutrition log by date:', error);
      throw new Error('Failed to fetch nutrition log');
    }
  }

  async createNutritionLog(logData: CreateNutritionLogInput): Promise<NutritionLog> {
    try {
      const validatedData = CreateNutritionLogSchema.parse(logData);
      
      const docRef = await addDoc(collection(db, this.NUTRITION_LOGS_COLLECTION), {
        ...validatedData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const newLog = await this.getNutritionLogById(docRef.id);
      if (!newLog) {
        throw new Error('Failed to create nutrition log');
      }

      return newLog;
    } catch (error) {
      console.error('Error creating nutrition log:', error);
      throw new Error('Failed to create nutrition log');
    }
  }

  async updateNutritionLog(logId: string, logData: UpdateNutritionLogInput): Promise<NutritionLog> {
    try {
      const validatedData = UpdateNutritionLogSchema.parse(logData);
      
      const docRef = doc(db, this.NUTRITION_LOGS_COLLECTION, logId);
      await updateDoc(docRef, {
        ...validatedData,
        updatedAt: serverTimestamp()
      });

      const updatedLog = await this.getNutritionLogById(logId);
      if (!updatedLog) {
        throw new Error('Failed to update nutrition log');
      }

      return updatedLog;
    } catch (error) {
      console.error('Error updating nutrition log:', error);
      throw new Error('Failed to update nutrition log');
    }
  }

  async deleteNutritionLog(logId: string): Promise<void> {
    try {
      const docRef = doc(db, this.NUTRITION_LOGS_COLLECTION, logId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting nutrition log:', error);
      throw new Error('Failed to delete nutrition log');
    }
  }

  // Nutrition Goals Methods
  async getNutritionGoals(userId: string): Promise<NutritionGoals | null> {
    try {
      const q = query(
        collection(db, this.NUTRITION_GOALS_COLLECTION),
        where('userId', '==', userId),
        where('isActive', '==', true)
      );

      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as NutritionGoals;
      }

      return null;
    } catch (error) {
      console.error('Error fetching nutrition goals:', error);
      throw new Error('Failed to fetch nutrition goals');
    }
  }

  async createNutritionGoals(goalsData: CreateNutritionGoalsInput): Promise<NutritionGoals> {
    try {
      const validatedData = CreateNutritionGoalsSchema.parse(goalsData);
      
      const docRef = await addDoc(collection(db, this.NUTRITION_GOALS_COLLECTION), {
        ...validatedData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const newGoals = await this.getNutritionGoals(validatedData.userId);
      if (!newGoals) {
        throw new Error('Failed to create nutrition goals');
      }

      return newGoals;
    } catch (error) {
      console.error('Error creating nutrition goals:', error);
      throw new Error('Failed to create nutrition goals');
    }
  }

  async updateNutritionGoals(goalsId: string, goalsData: UpdateNutritionGoalsInput): Promise<NutritionGoals> {
    try {
      const validatedData = UpdateNutritionGoalsSchema.parse(goalsData);
      
      const docRef = doc(db, this.NUTRITION_GOALS_COLLECTION, goalsId);
      await updateDoc(docRef, {
        ...validatedData,
        updatedAt: serverTimestamp()
      });

      const updatedGoals = await this.getNutritionGoals(validatedData.userId || '');
      if (!updatedGoals) {
        throw new Error('Failed to update nutrition goals');
      }

      return updatedGoals;
    } catch (error) {
      console.error('Error updating nutrition goals:', error);
      throw new Error('Failed to update nutrition goals');
    }
  }

  // Utility Methods
  async searchFoods(searchTerm: string, limit: number = 10): Promise<FoodItem[]> {
    try {
      const q = query(
        collection(db, this.FOODS_COLLECTION),
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff'),
        limit(limit)
      );

      const snapshot = await getDocs(q);
      const foods: FoodItem[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        foods.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as FoodItem);
      });

      return foods;
    } catch (error) {
      console.error('Error searching foods:', error);
      throw new Error('Failed to search foods');
    }
  }

  async getFoodsByCategory(category: FoodCategory): Promise<FoodItem[]> {
    try {
      const q = query(
        collection(db, this.FOODS_COLLECTION),
        where('category', '==', category),
        orderBy('name', 'asc')
      );

      const snapshot = await getDocs(q);
      const foods: FoodItem[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        foods.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as FoodItem);
      });

      return foods;
    } catch (error) {
      console.error('Error fetching foods by category:', error);
      throw new Error('Failed to fetch foods by category');
    }
  }

  calculateMealTotals(foods: any[]): {
    totalCalories: number;
    totalProtein: number;
    totalCarbohydrates: number;
    totalFat: number;
    totalFiber: number;
    totalSugar: number;
    totalSodium: number;
  } {
    return foods.reduce((totals, food) => ({
      totalCalories: totals.totalCalories + (food.calories * food.quantity),
      totalProtein: totals.totalProtein + (food.protein * food.quantity),
      totalCarbohydrates: totals.totalCarbohydrates + (food.carbohydrates * food.quantity),
      totalFat: totals.totalFat + (food.fat * food.quantity),
      totalFiber: totals.totalFiber + (food.fiber * food.quantity),
      totalSugar: totals.totalSugar + (food.sugar * food.quantity),
      totalSodium: totals.totalSodium + (food.sodium * food.quantity)
    }), {
      totalCalories: 0,
      totalProtein: 0,
      totalCarbohydrates: 0,
      totalFat: 0,
      totalFiber: 0,
      totalSugar: 0,
      totalSodium: 0
    });
  }
}

export const nutritionService = new NutritionService();
