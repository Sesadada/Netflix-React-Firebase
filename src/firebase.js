import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB-3YvdrDact3hZd3WHeuUcpoyCj_PQH7M",
  authDomain: "netflixapp-d8262.firebaseapp.com",
  projectId: "netflixapp-d8262",
  storageBucket: "netflixapp-d8262.appspot.com",
  messagingSenderId: "57155715167",
  appId: "1:57155715167:web:93e2b5f9e28683aaaa5bea",
});

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, firebase, db };
