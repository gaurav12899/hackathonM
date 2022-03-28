// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6f53J-C4WDgBs0tLx3H9ZGTm6J2XtxrI",
  authDomain: "molecule-d81af.firebaseapp.com",
  projectId: "molecule-d81af",
  storageBucket: "molecule-d81af.appspot.com",
  messagingSenderId: "936333449200",
  appId: "1:936333449200:web:61b2b070f75e5584b6ef35",
  measurementId: "G-8VBMF3G6W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();