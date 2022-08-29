import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyCC1o-phpEisnIru_YEOeNB2oPKPSJek1Y",
  authDomain: "socialmediaapp-7931e.firebaseapp.com",
  projectId: "socialmediaapp-7931e",
  storageBucket: "socialmediaapp-7931e.appspot.com",
  messagingSenderId: "503349377214",
  appId: "1:503349377214:web:046a1d0128e57dffa086ef",
  measurementId: "G-SB0LL2QMTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);