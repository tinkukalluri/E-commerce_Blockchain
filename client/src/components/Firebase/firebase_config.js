// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyCpzNpZQnW6cXSTIp9ckuq8mPLArjarhR8",
    authDomain: "ecommerce-blockchain-1fb3d.firebaseapp.com",
    projectId: "ecommerce-blockchain-1fb3d",
    storageBucket: "ecommerce-blockchain-1fb3d.appspot.com",
    messagingSenderId: "413264676842",
    appId: "1:413264676842:web:0dd4eb46d8f34293bd5493"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);