import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4WTKwCN15CJ8dNsmF5cILOH1dB-Ssbdo",
  authDomain: "wordlab-doc.firebaseapp.com",
  projectId: "wordlab-doc",
  storageBucket: "wordlab-doc.appspot.com",
  messagingSenderId: "81331527064",
  appId: "1:81331527064:web:3c82fdbe90288de1761fed",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider };
