import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { sampleExercises } from './data/sampleExercises';

// Initialize Firebase Admin
const serviceAccount = require('../../../staging-service-account.json');

if (!serviceAccount) {
  console.error('Service account not found. Please ensure staging-service-account.json exists.');
  process.exit(1);
}

const app = initializeApp({
  credential: cert(serviceAccount),
  projectId: serviceAccount.project_id
});

const db = getFirestore(app);

export async function seedExercises() {
  try {
    console.log('🌱 Starting exercise seeding...');
    
    const exercisesCollection = db.collection('exercises');
    
    // Check if exercises already exist
    const existingExercises = await exercisesCollection.limit(1).get();
    
    if (!existingExercises.empty) {
      console.log('⚠️  Exercises already exist in the database. Skipping seeding.');
      return;
    }
    
    // Add sample exercises
    const batch = db.batch();
    
    sampleExercises.forEach((exercise) => {
      const docRef = exercisesCollection.doc();
      const exerciseData = {
        ...exercise,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      batch.set(docRef, exerciseData);
    });
    
    await batch.commit();
    
    console.log(`✅ Successfully seeded ${sampleExercises.length} exercises!`);
    console.log('📊 Exercise categories included:');
    
    const categories = [...new Set(sampleExercises.map(ex => ex.category))];
    categories.forEach(category => {
      const count = sampleExercises.filter(ex => ex.category === category).length;
      console.log(`   - ${category}: ${count} exercises`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding exercises:', error);
    throw error;
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedExercises()
    .then(() => {
      console.log('🎉 Exercise seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Exercise seeding failed:', error);
      process.exit(1);
    });
}
