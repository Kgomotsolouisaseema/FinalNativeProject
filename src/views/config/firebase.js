// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth , GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage,ref} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjHrYfFvq5zKyA6W5ZxKJHtzyrsygLBvs",
  authDomain: "tinyseatery.firebaseapp.com",
  projectId: "tinyseatery",
  storageBucket: "tinyseatery.appspot.com",
  messagingSenderId: "497934157524",
  appId: "1:497934157524:web:ff48a47d7e124c561f1d41",
  measurementId: "G-B6D3GK2SN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const  auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const  storage = getStorage(app)
export const storageRef = ref(storage)