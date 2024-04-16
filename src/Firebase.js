// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBK3-qnh7MFtc_FS6Xt4t6fb9vm58MC5Dg",
  authDomain: "manifestuserportal.firebaseapp.com",
  projectId: "manifestuserportal",
  storageBucket: "manifestuserportal.appspot.com",
  messagingSenderId: "49334076046",
  appId: "1:49334076046:web:a2792dba2dd559322affdf",
  measurementId: "G-W9KVL9TJHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;