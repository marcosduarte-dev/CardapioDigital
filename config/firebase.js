// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg6vMbhtG60fT3DyVOl-hS3zGoaj2ALi0",
  authDomain: "cardapiodigital-4f53e.firebaseapp.com",
  databaseURL: "https://cardapiodigital-4f53e-default-rtdb.firebaseio.com",
  projectId: "cardapiodigital-4f53e",
  storageBucket: "cardapiodigital-4f53e.appspot.com",
  messagingSenderId: "44716936143",
  appId: "1:44716936143:web:07adc70f196f20109560ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});