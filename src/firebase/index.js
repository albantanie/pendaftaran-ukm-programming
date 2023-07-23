// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {  
  apiKey: "AIzaSyDkZdl1iAPPI3OUZG9veoQ08d37MpUOkss",
  authDomain: "itts-a8f6e.firebaseapp.com",
  projectId: "itts-a8f6e",
  storageBucket: "itts-a8f6e.appspot.com",
  messagingSenderId: "449236857277",
  appId: "1:449236857277:web:109e333b620cb6e68ba2d4",
  measurementId: "G-9EC1G2FKLM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export {
    db
}