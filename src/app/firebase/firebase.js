import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABfNQgTMmB6muVIYBlvHghMVKAqHyzm_Q",
  authDomain: "grabcar-8506b.firebaseapp.com",
  databaseURL: "https://grabcar-8506b-default-rtdb.firebaseio.com",
  projectId: "grabcar-8506b",
  storageBucket: "grabcar-8506b.appspot.com",
  messagingSenderId: "65020574918",
  appId: "1:65020574918:web:fdcdcb1889bd438433ebc7",
  measurementId: "G-LSN662MQ9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export {db, storage};
export const auth = getAuth(app);
