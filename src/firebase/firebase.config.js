// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMOXqGHCo0TV6lzRQ0UyvEFWMtPOKeopw",
  authDomain: "smart-deals-981e2.firebaseapp.com",
  projectId: "smart-deals-981e2",
  storageBucket: "smart-deals-981e2.firebasestorage.app",
  messagingSenderId: "419502619590",
  appId: "1:419502619590:web:01d3cd8a2b61aad44310c7",
  measurementId: "G-2ST0X46K1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);