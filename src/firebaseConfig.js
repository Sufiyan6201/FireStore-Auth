
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAlmc-ehhEhmBVZB-14EXiWgrRStwrbe0s",
    authDomain: "fir-b9167.firebaseapp.com",
    databaseURL: "https://fir-b9167-default-rtdb.firebaseio.com",
    projectId: "fir-b9167",
    storageBucket: "fir-b9167.firebasestorage.app",
    messagingSenderId: "1030756940222",
    appId: "1:1030756940222:web:7561d5d04fb18385ebe1ef"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth(app);

