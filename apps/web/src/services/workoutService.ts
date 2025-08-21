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
  writeBatch,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Workout, 
  WorkoutSession,
  WorkoutSet,
  WorkoutSearchParams, 
  WorkoutSearchResult,
  WorkoutFilters,
  WorkoutType,
  WorkoutDifficulty,
  WorkoutSessionStatus,
  CreateWorkoutInput,
  UpdateWorkoutInput,
  WorkoutProgress
} from '@aurafit/shared/types/workout';
import { 
  CreateWorkoutSchema,
  UpdateWorkoutSchema
} from '@aurafit/shared/schemas/workout';
import { exerciseService } from './exerciseService';

const WORKOUTS_COLLECTION = 'workouts';
const WORKOUT_SESSIONS_COLLECTION = 'workoutSessions';
const WORKOUT_SETS_COLLECTION = 'workoutSets';

export class WorkoutService {
  private workoutsCollection = collection(db, WORKOUTS_COLLECTION);
  private sessionsCollection = collection(db, WORKOUT_SESSIONS_COLLECTION);
  private setsCollection = collection(db, WORKOUT_SETS_COLLECTION);

  /**
   * Get all public workouts with pagination
   */
  async getPublicWorkouts(params: WorkoutSearchParams): Promise<WorkoutSearchResult> {
    try {
      const { query: searchQuery, filters, page, limit: pageLimit, sortBy, sortOrder } = params;
      
      // Build query
      let q = query(
        this.workoutsCollection,
        where('isPublic', '==', true)
      );

      // Apply filters
      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }
      
      if (filters.difficulty) {
        q = query(q, where('difficulty', '==', filters.difficulty));
      }

      // Apply sorting
      q = query(q, orderBy(sortBy, sortOrder));

      // Apply pagination
      if (page > 1) {
        // For now, we'll get all docs and paginate in memory
        const allDocs = await getDocs(q);
        const startIndex = (page - 1) * pageLimit;
        const endIndex = startIndex + pageLimit;
        const paginatedDocs = allDocs.docs.slice(startIndex, endIndex);
        
        const workouts = await this.populateWorkoutExercises(
          paginatedDocs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate()
          })) as Workout[]
        );

        return {
          workouts,
          total: allDocs.size,
          page,
          totalPages: Math.ceil(allDocs.size / pageLimit),
          hasMore: endIndex < allDocs.size
        };
      } else {
        q = query(q, limit(pageLimit));
        const snapshot = await getDocs(q);
        
        const workouts = await this.populateWorkoutExercises(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate()
          })) as Workout[]
        );

        return {
          workouts,
          total: snapshot.size, // This is approximate
          page,
          totalPages: 1,
          hasMore: snapshot.docs.length === pageLimit
        };
      }
    } catch (error) {
      console.error('Error fetching public workouts:', error);
      throw new Error('Failed to fetch workouts');
    }
  }

  /**
   * Get workout by ID with populated exercises
   */
  async getWorkoutById(id: string): Promise<Workout | null> {
    try {
      const docRef = doc(this.workoutsCollection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const workout = {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as Workout;

        // Populate exercises
        const populatedWorkout = await this.populateWorkoutExercises([workout]);
        return populatedWorkout[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching workout:', error);
      throw new Error('Failed to fetch workout');
    }
  }

  /**
   * Create new workout
   */
  async createWorkout(data: CreateWorkoutInput, userId: string): Promise<Workout> {
    try {
      // Validate input
      const validatedData = CreateWorkoutSchema.parse(data);
      
      const workoutData = {
        ...validatedData,
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(this.workoutsCollection, workoutData);
      
      return {
        id: docRef.id,
        ...workoutData
      } as Workout;
    } catch (error) {
      console.error('Error creating workout:', error);
      throw new Error('Failed to create workout');
    }
  }

  /**
   * Update workout
   */
  async updateWorkout(id: string, data: UpdateWorkoutInput, userId: string): Promise<Workout> {
    try {
      // Validate input
      const validatedData = UpdateWorkoutSchema.parse(data);
      
      const docRef = doc(this.workoutsCollection, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Workout not found');
      }
      
      const workoutData = docSnap.data();
      
      // Check if user owns the workout or if it's public
      if (workoutData.createdBy !== userId && !workoutData.isPublic) {
        throw new Error('Unauthorized to update this workout');
      }
      
      const updateData = {
        ...validatedData,
        updatedAt: new Date()
      };

      await updateDoc(docRef, updateData);
      
      return {
        id,
        ...workoutData,
        ...updateData,
        createdAt: workoutData.createdAt?.toDate(),
        updatedAt: updateData.updatedAt
      } as Workout;
    } catch (error) {
      console.error('Error updating workout:', error);
      throw new Error('Failed to update workout');
    }
  }

  /**
   * Delete workout
   */
  async deleteWorkout(id: string, userId: string): Promise<void> {
    try {
      const docRef = doc(this.workoutsCollection, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Workout not found');
      }
      
      const workoutData = docSnap.data();
      
      // Check if user owns the workout
      if (workoutData.createdBy !== userId) {
        throw new Error('Unauthorized to delete this workout');
      }
      
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting workout:', error);
      throw new Error('Failed to delete workout');
    }
  }

  /**
   * Start a workout session
   */
  async startWorkoutSession(workoutId: string, userId: string, notes?: string): Promise<WorkoutSession> {
    try {
      const workout = await this.getWorkoutById(workoutId);
      if (!workout) {
        throw new Error('Workout not found');
      }

      // Create session
      const sessionData = {
        workoutId,
        userId,
        startedAt: new Date(),
        status: WorkoutSessionStatus.IN_PROGRESS,
        sets: [],
        notes
      };

      const sessionRef = await addDoc(this.sessionsCollection, sessionData);

      // Create workout sets for tracking
      const batch = writeBatch(db);
      workout.exercises.forEach((exercise) => {
        for (let setNumber = 1; setNumber <= exercise.sets; setNumber++) {
          const setRef = doc(this.setsCollection);
          batch.set(setRef, {
            workoutId: sessionRef.id,
            exerciseId: exercise.exerciseId,
            setNumber,
            completed: false,
            reps: exercise.reps,
            weight: exercise.weight,
            duration: exercise.duration
          });
        }
      });

      await batch.commit();

      return {
        id: sessionRef.id,
        ...sessionData
      } as WorkoutSession;
    } catch (error) {
      console.error('Error starting workout session:', error);
      throw new Error('Failed to start workout session');
    }
  }

  /**
   * Update workout session
   */
  async updateWorkoutSession(sessionId: string, data: Partial<WorkoutSession>): Promise<WorkoutSession> {
    try {
      const docRef = doc(this.sessionsCollection, sessionId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Workout session not found');
      }

      const updateData = {
        ...data,
        updatedAt: new Date()
      };

      await updateDoc(docRef, updateData);
      
      return {
        id: sessionId,
        ...docSnap.data(),
        ...updateData,
        startedAt: docSnap.data().startedAt?.toDate(),
        completedAt: docSnap.data().completedAt?.toDate()
      } as WorkoutSession;
    } catch (error) {
      console.error('Error updating workout session:', error);
      throw new Error('Failed to update workout session');
    }
  }

  /**
   * Complete a workout set
   */
  async completeWorkoutSet(setId: string, data: Partial<WorkoutSet>): Promise<WorkoutSet> {
    try {
      const docRef = doc(this.setsCollection, setId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Workout set not found');
      }

      const updateData = {
        ...data,
        completed: true,
        completedAt: new Date()
      };

      await updateDoc(docRef, updateData);
      
      return {
        id: setId,
        ...docSnap.data(),
        ...updateData,
        completedAt: updateData.completedAt
      } as WorkoutSet;
    } catch (error) {
      console.error('Error completing workout set:', error);
      throw new Error('Failed to complete workout set');
    }
  }

  /**
   * Get user's workout progress
   */
  async getUserWorkoutProgress(userId: string): Promise<WorkoutProgress[]> {
    try {
      const q = query(
        this.sessionsCollection,
        where('userId', '==', userId),
        where('status', '==', WorkoutSessionStatus.COMPLETED)
      );
      
      const snapshot = await getDocs(q);
      const sessions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startedAt: doc.data().startedAt?.toDate(),
        completedAt: doc.data().completedAt?.toDate()
      })) as WorkoutSession[];

      // Group by workout and calculate progress
      const progressMap = new Map<string, WorkoutProgress>();
      
      sessions.forEach(session => {
        if (!progressMap.has(session.workoutId)) {
          progressMap.set(session.workoutId, {
            workoutId: session.workoutId,
            workoutName: '', // Will be populated later
            totalSessions: 0,
            completedSessions: 0,
            averageRating: 0,
            personalBest: undefined
          });
        }
        
        const progress = progressMap.get(session.workoutId)!;
        progress.completedSessions++;
        
        if (session.rating) {
          progress.averageRating = (progress.averageRating + session.rating) / progress.completedSessions;
        }
        
        if (session.completedAt) {
          const duration = session.completedAt.getTime() - session.startedAt.getTime();
          if (!progress.personalBest || duration < progress.personalBest.duration) {
            progress.personalBest = {
              duration,
              completedAt: session.completedAt
            };
          }
        }
      });

      // Populate workout names
      const workoutIds = Array.from(progressMap.keys());
      const workouts = await Promise.all(
        workoutIds.map(id => this.getWorkoutById(id))
      );

      workouts.forEach(workout => {
        if (workout && progressMap.has(workout.id)) {
          const progress = progressMap.get(workout.id)!;
          progress.workoutName = workout.name;
        }
      });

      return Array.from(progressMap.values());
    } catch (error) {
      console.error('Error fetching workout progress:', error);
      throw new Error('Failed to fetch workout progress');
    }
  }

  /**
   * Populate workout exercises with exercise details
   */
  private async populateWorkoutExercises(workouts: Workout[]): Promise<Workout[]> {
    try {
      const exerciseIds = new Set<string>();
      workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
          exerciseIds.add(exercise.exerciseId);
        });
      });

      const exercises = await Promise.all(
        Array.from(exerciseIds).map(id => exerciseService.getExerciseById(id))
      );

      const exerciseMap = new Map<string, any>();
      exercises.forEach(exercise => {
        if (exercise) {
          exerciseMap.set(exercise.id, exercise);
        }
      });

      return workouts.map(workout => ({
        ...workout,
        exercises: workout.exercises.map(exercise => ({
          ...exercise,
          exercise: exerciseMap.get(exercise.exerciseId)
        }))
      }));
    } catch (error) {
      console.error('Error populating workout exercises:', error);
      return workouts; // Return workouts without populated exercises
    }
  }
}

export const workoutService = new WorkoutService();
