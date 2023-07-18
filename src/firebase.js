// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ9Wk_YyzsuVnII2PpV2z3G1AMq_2J4Hc",
  authDomain: "network-resilient-app.firebaseapp.com",
  projectId: "network-resilient-app",
  storageBucket: "network-resilient-app.appspot.com",
  messagingSenderId: "471494198719",
  appId: "1:471494198719:web:e7a17342c548790f1f0d0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
