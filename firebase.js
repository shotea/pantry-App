// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYgA1zhcygBlkP1qHvoLZFBFoikC7Xz1Q",
  authDomain: "inventory-management-7c279.firebaseapp.com",
  projectId: "inventory-management-7c279",
  storageBucket: "inventory-management-7c279.appspot.com",
  messagingSenderId: "491576745597",
  appId: "1:491576745597:web:38a2e7e294e91159a55b14",
  measurementId: "G-NSYC5X9Z57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}