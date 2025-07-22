// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGptaroEXWX347GWkbs8k5tx7Ignscg7M",
  authDomain: "coffee-store-c164e.firebaseapp.com",
  projectId: "coffee-store-c164e",
  storageBucket: "coffee-store-c164e.firebasestorage.app",
  messagingSenderId: "141872882910",
  appId: "1:141872882910:web:e6f726b2910247b5dace4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);