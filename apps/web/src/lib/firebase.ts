import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Real Firebase configuration for production
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyC-example-key-for-production",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "fitness-app-bupe-staging.firebaseapp.com",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID || "fitness-app-bupe-staging",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "fitness-app-bupe-staging.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:example",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Only connect to emulators in development mode when explicitly enabled
if (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === "true") {
  try {
    // Import emulator functions only when needed
    const { connectAuthEmulator } = await import("firebase/auth");
    const { connectFirestoreEmulator } = await import("firebase/firestore");
    const { connectStorageEmulator } = await import("firebase/storage");

    // Connect to emulators
    connectAuthEmulator(auth, "http://127.0.0.1:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    connectStorageEmulator(storage, "127.0.0.1", 9199);
    console.log("🔥 Connected to Firebase emulators");
  } catch (error) {
    console.log(
      "⚠️ Emulator connection failed, using production Firebase:",
      error
    );
  }
} else {
  console.log("🚀 Using production Firebase services");
}

export default app;
