const { initializeApp } = require('firebase/app');
const { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, connectFirestoreEmulator, doc, setDoc } = require('firebase/firestore');

// Firebase configuration for development
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "demo-project.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to emulators
connectAuthEmulator(auth, 'http://127.0.0.1:9099');
connectFirestoreEmulator(db, '127.0.0.1', 8080);

async function createTestUser() {
  try {
    console.log('🔧 Creating test user in Firebase emulator...');
    
    // Create a test user
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'test@fitnessapp.com', 
      'password123'
    );
    
    const user = userCredential.user;
    console.log('✅ Test user created:', user.email);
    
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      displayName: 'Test User',
      createdAt: new Date(),
      preferences: {
        theme: 'light',
        notifications: true,
        units: 'metric'
      }
    });
    
    console.log('✅ User profile created in Firestore');
    console.log('📧 Email: test@fitnessapp.com');
    console.log('🔑 Password: password123');
    console.log('🆔 UID:', user.uid);
    
    // Sign out
    await auth.signOut();
    console.log('✅ Test user setup complete!');
    
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️ Test user already exists');
      console.log('📧 Email: test@fitnessapp.com');
      console.log('🔑 Password: password123');
    } else {
      console.error('❌ Error creating test user:', error.message);
    }
  }
}

createTestUser();
