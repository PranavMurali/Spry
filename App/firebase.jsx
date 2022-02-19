// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfCO4PmzD7WnD-vGh_YIaZS9lv2kwlnNY",
  authDomain: "spry-c6f20.firebaseapp.com",
  projectId: "spry-c6f20",
  storageBucket: "spry-c6f20.appspot.com",
  messagingSenderId: "455979811101",
  appId: "1:455979811101:web:bc1c4d4b433df1796ea1f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();