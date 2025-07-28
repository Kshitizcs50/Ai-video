// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-f1e2a.firebaseapp.com",
  projectId: "ai-short-video-f1e2a",
  storageBucket: "ai-short-video-f1e2a.firebasestorage.app",
  messagingSenderId: "101351240252",
  appId: "1:101351240252:web:e545a6b18a2103ce18c939",
  measurementId: "G-W90XLD0W0Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);