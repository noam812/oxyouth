import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth, } from "firebase/auth"

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAINphzichwIH0B970X0mSEZ8pMVelnmS0",
  authDomain: "oxyouth.firebaseapp.com",
  projectId: "oxyouth",
  storageBucket: "oxyouth.appspot.com",
  messagingSenderId: "296191090280",
  appId: "1:296191090280:web:65a50cee24ae3c377225dd",
  measurementId: "G-8F0Y4321Z3",
});

// Initialize Firebase

const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);


export { storage ,auth };
