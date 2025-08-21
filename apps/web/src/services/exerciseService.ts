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
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Exercise, 
  ExerciseSearchParams, 
  ExerciseSearchResult,
  ExerciseFilters,
  ExerciseCategory,
  MuscleGroup,
  Equipment,
  Difficulty
} from '@aurafit/shared/types/exercise';
import { 
  CreateExerciseInput, 
  UpdateExerciseInput,
  CreateExerciseSchema,
  UpdateExerciseSchema
} from '@aurafit/shared/schemas/exercise';

const EXERCISES_COLLECTION = 'exercises';

export class ExerciseService {
  private collectionRef = collection(db, EXERCISES_COLLECTION);

  /**
   * Get all public exercises with pagination
   */
  async getPublicExercises(params: ExerciseSearchParams): Promise<ExerciseSearchResult> {
    try {
      const { query: searchQuery, filters, page, limit: pageLimit, sortBy, sortOrder } = params;
      
      // Build query
      let q = query(
        this.collectionRef,
        where('isPublic', '==', true)
      );

      // Apply filters
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }
      
      if (filters.difficulty) {
        q = query(q, where('difficulty', '==', filters.difficulty));
      }

      if (filters.muscleGroups && filters.muscleGroups.length > 0) {
        q = query(q, where('muscleGroups', 'array-contains-any', filters.muscleGroups));
      }

      if (filters.equipment && filters.equipment.length > 0) {
        q = query(q, where('equipment', 'array-contains-any', filters.equipment));
      }

      // Apply sorting
      q = query(q, orderBy(sortBy, sortOrder));

      // Apply pagination
      if (page > 1) {
        // For now, we'll get all docs and paginate in memory
        // In production, you'd want to implement proper cursor-based pagination
        const allDocs = await getDocs(q);
        const startIndex = (page - 1) * pageLimit;
        const endIndex = startIndex + pageLimit;
        const paginatedDocs = allDocs.docs.slice(startIndex, endIndex);
        
        const exercises = paginatedDocs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate()
        })) as Exercise[];

        return {
          exercises,
          total: allDocs.size,
          page,
          totalPages: Math.ceil(allDocs.size / pageLimit),
          hasMore: endIndex < allDocs.size
        };
      } else {
        q = query(q, limit(pageLimit));
        const snapshot = await getDocs(q);
        
        const exercises = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate()
        })) as Exercise[];

        return {
          exercises,
          total: snapshot.size, // This is approximate
          page,
          totalPages: 1,
          hasMore: snapshot.docs.length === pageLimit
        };
      }
    } catch (error) {
      console.error('Error fetching public exercises:', error);
      throw new Error('Failed to fetch exercises');
    }
  }

  /**
   * Get exercise by ID
   */
  async getExerciseById(id: string): Promise<Exercise | null> {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate()
        } as Exercise;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching exercise:', error);
      throw new Error('Failed to fetch exercise');
    }
  }

  /**
   * Create new exercise
   */
  async createExercise(data: CreateExerciseInput, userId: string): Promise<Exercise> {
    try {
      // Validate input
      const validatedData = CreateExerciseSchema.parse(data);
      
      const exerciseData = {
        ...validatedData,
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(this.collectionRef, exerciseData);
      
      return {
        id: docRef.id,
        ...exerciseData
      } as Exercise;
    } catch (error) {
      console.error('Error creating exercise:', error);
      throw new Error('Failed to create exercise');
    }
  }

  /**
   * Update exercise
   */
  async updateExercise(id: string, data: UpdateExerciseInput, userId: string): Promise<Exercise> {
    try {
      // Validate input
      const validatedData = UpdateExerciseSchema.parse(data);
      
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Exercise not found');
      }
      
      const exerciseData = docSnap.data();
      
      // Check if user owns the exercise or if it's public
      if (exerciseData.createdBy !== userId && !exerciseData.isPublic) {
        throw new Error('Unauthorized to update this exercise');
      }
      
      const updateData = {
        ...validatedData,
        updatedAt: new Date()
      };

      await updateDoc(docRef, updateData);
      
      return {
        id,
        ...exerciseData,
        ...updateData,
        createdAt: exerciseData.createdAt?.toDate(),
        updatedAt: updateData.updatedAt
      } as Exercise;
    } catch (error) {
      console.error('Error updating exercise:', error);
      throw new Error('Failed to update exercise');
    }
  }

  /**
   * Delete exercise
   */
  async deleteExercise(id: string, userId: string): Promise<void> {
    try {
      const docRef = doc(this.collectionRef, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Exercise not found');
      }
      
      const exerciseData = docSnap.data();
      
      // Check if user owns the exercise
      if (exerciseData.createdBy !== userId) {
        throw new Error('Unauthorized to delete this exercise');
      }
      
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting exercise:', error);
      throw new Error('Failed to delete exercise');
    }
  }

  /**
   * Search exercises by name or description
   */
  async searchExercises(searchTerm: string, filters: ExerciseFilters = {}): Promise<Exercise[]> {
    try {
      // For now, we'll implement a simple search
      // In production, you'd want to use Algolia or similar search service
      const q = query(
        this.collectionRef,
        where('isPublic', '==', true)
      );
      
      const snapshot = await getDocs(q);
      const exercises = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Exercise[];

      // Filter by search term
      const filteredExercises = exercises.filter(exercise => {
        const matchesSearch = searchTerm === '' || 
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = !filters.category || exercise.category === filters.category;
        const matchesDifficulty = !filters.difficulty || exercise.difficulty === filters.difficulty;
        const matchesMuscleGroups = !filters.muscleGroups || 
          filters.muscleGroups.some(mg => exercise.muscleGroups.includes(mg));
        const matchesEquipment = !filters.equipment || 
          filters.equipment.some(eq => exercise.equipment.includes(eq));
        
        return matchesSearch && matchesCategory && matchesDifficulty && 
               matchesMuscleGroups && matchesEquipment;
      });

      return filteredExercises;
    } catch (error) {
      console.error('Error searching exercises:', error);
      throw new Error('Failed to search exercises');
    }
  }

  /**
   * Get exercises by category
   */
  async getExercisesByCategory(category: ExerciseCategory): Promise<Exercise[]> {
    try {
      const q = query(
        this.collectionRef,
        where('isPublic', '==', true),
        where('category', '==', category)
      );
      
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Exercise[];
    } catch (error) {
      console.error('Error fetching exercises by category:', error);
      throw new Error('Failed to fetch exercises by category');
    }
  }

  /**
   * Get exercises by muscle group
   */
  async getExercisesByMuscleGroup(muscleGroup: MuscleGroup): Promise<Exercise[]> {
    try {
      const q = query(
        this.collectionRef,
        where('isPublic', '==', true),
        where('muscleGroups', 'array-contains', muscleGroup)
      );
      
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as Exercise[];
    } catch (error) {
      console.error('Error fetching exercises by muscle group:', error);
      throw new Error('Failed to fetch exercises by muscle group');
    }
  }
}

export const exerciseService = new ExerciseService();
