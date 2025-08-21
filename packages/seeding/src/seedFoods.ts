import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { sampleFoods } from './data/sampleFoods';

// Initialize Firebase Admin SDK
const serviceAccount = require('../../../staging-service-account.json');

if (!initializeApp.length) {
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

export async function seedFoods() {
  try {
    console.log('🌱 Starting food database seeding...');

    // Check if foods already exist
    const existingFoods = await db.collection('foods').limit(1).get();
    
    if (!existingFoods.empty) {
      console.log('⚠️  Foods collection already has data. Skipping seeding.');
      return;
    }

    // Add foods to Firestore
    const batch = db.batch();
    
    sampleFoods.forEach((food) => {
      const foodRef = db.collection('foods').doc();
      batch.set(foodRef, {
        ...food,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    await batch.commit();
    
    console.log(`✅ Successfully seeded ${sampleFoods.length} foods to the database!`);
    console.log('📊 Food categories included:');
    
    const categories = [...new Set(sampleFoods.map(food => food.category))];
    categories.forEach(category => {
      const count = sampleFoods.filter(food => food.category === category).length;
      console.log(`   - ${category}: ${count} items`);
    });

  } catch (error) {
    console.error('❌ Error seeding foods:', error);
    throw error;
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedFoods()
    .then(() => {
      console.log('🎉 Food seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Food seeding failed:', error);
      process.exit(1);
    });
}
