// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm-3F5Z6GBzvEK-BUhzgKrNUODAkWNjmQ",
  authDomain: "myuchats-cc6c5.firebaseapp.com",
  projectId: "myuchats-cc6c5",
  storageBucket: "myuchats-cc6c5.appspot.com",
  messagingSenderId: "1012050697565",
  appId: "1:1012050697565:web:7f07d0528a7fc20a9e1cb4",
  measurementId: "G-012DKD5G9X"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);