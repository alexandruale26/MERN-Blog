// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // !!! use this "import.meta.env" instead of "process.env"
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ed6c1.firebaseapp.com",
  projectId: "mern-blog-ed6c1",
  storageBucket: "mern-blog-ed6c1.appspot.com",
  messagingSenderId: "1060834398002",
  appId: "1:1060834398002:web:29e9954b0d5a0ffa85512b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
