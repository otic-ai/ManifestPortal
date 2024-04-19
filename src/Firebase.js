import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

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

// Get the Auth instance from the initialized app
const auth = getAuth(app);

// Set authentication persistence to local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Authentication persistence mode set to local");
  })
  .catch((error) => {
    console.error("Error setting authentication persistence:", error);
  });

// Export the Auth instance for use in other parts of your application
export { auth };
export const db = getFirestore(app);
// Export the Firebase app instance if needed (optional)
export default app;
