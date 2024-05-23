// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm898kZL_TpSQfnmVTAPDLEYmg_Nhedis",
  authDomain: "buybusy-2-3d4bd.firebaseapp.com",
  projectId: "buybusy-2-3d4bd",
  storageBucket: "buybusy-2-3d4bd.appspot.com",
  messagingSenderId: "338252530267",
  appId: "1:338252530267:web:1e0bf5491ce10efc44f57e",
  measurementId: "G-MESXR1BGWQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth };
