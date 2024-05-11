// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import './envConfig'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_MY_API_KEY,  
  authDomain: "myuchats-cc6c5.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_MY_PROJECT_ID,
  storageBucket: "myuchats-cc6c5.appspot.com",
  messagingSenderId: "1012050697565",
  appId: "1:1012050697565:web:7f07d0528a7fc20a9e1cb4",
  measurementId: "G-012DKD5G9X"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);