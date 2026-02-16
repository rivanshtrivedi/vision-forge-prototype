import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLsEeqk6firMeRkKqNn6CQuRgbRkVndY",
  authDomain: "vision-forge-21351.firebaseapp.com",
  projectId: "vision-forge-21351",
  storageBucket: "vision-forge-21351.firebasestorage.app",
  messagingSenderId: "685005328518",
  appId: "1:685005328518:web:766f248962236c394dc107"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
