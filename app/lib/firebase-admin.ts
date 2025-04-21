import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Check if Firebase admin is already initialized to avoid multiple instances
const apps = getApps();

if (!apps.length) {
  // Use environment variables in production or service account in development
  if (process.env.FIREBASE_PROJECT_ID) {
    // For production (e.g. Vercel deployment) - use environment variables
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
  } else {
    // If Firebase project ID is missing, log an error and throw an exception
    const errorMessage = 'Firebase configuration is missing. Please check your environment variables.';
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

// Export the auth and firestore instances
export const adminAuth = getAuth();
export const adminDb = getFirestore(); 