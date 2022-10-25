// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAi1t1eElDn0-CLsWff7UHTwKLkGYMogoc",
    authDomain: "order-form-bdb98.firebaseapp.com",
    projectId: "order-form-bdb98",
    storageBucket: "order-form-bdb98.appspot.com",
    messagingSenderId: "132959416594",
    appId: "1:132959416594:web:b604e3fcaad2010115c3cb",
    measurementId: "G-HXP5KZ08S5"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export { db ,storage}