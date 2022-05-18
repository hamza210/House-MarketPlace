import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL2mw-jKdDCZK6oHMVyFi7rvjZOAZcU1E",
  authDomain: "house-marketplace-app-23d59.firebaseapp.com",
  projectId: "house-marketplace-app-23d59",
  storageBucket: "house-marketplace-app-23d59.appspot.com",
  messagingSenderId: "52346478162",
  appId: "1:52346478162:web:8f5dff940f850fc4a7498b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()
