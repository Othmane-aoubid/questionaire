import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATTmYPYIzp1oOQnaRhQrvVaGYske1jiVo",
  authDomain: "projectquestionaire-f16e5.firebaseapp.com",
  projectId: "projectquestionaire-f16e5",
  storageBucket: "projectquestionaire-f16e5.firebasestorage.app",
  messagingSenderId: "415212803815",
  appId: "1:415212803815:web:8abd1538d98e18ef1bf442",
  measurementId: "G-NMBKHM1Z0G",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
