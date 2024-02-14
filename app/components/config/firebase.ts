// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWljB_l63VCJjqFbde-uWeP0wjNQ5x8wY",
  authDomain: "myu-chat.firebaseapp.com",
  projectId: "myu-chat",
  storageBucket: "myu-chat.appspot.com",
  messagingSenderId: "1096199952346",
  appId: "1:1096199952346:web:2d134f6e085e84c9ba52e3",
  measurementId: "G-DFC2CFE56Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);