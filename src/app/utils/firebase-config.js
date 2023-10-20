import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDj8Cl-yPHWOIaTeMNZgTMTxCgDGiriyi0",
  authDomain: "neko-chat-app-f5444.firebaseapp.com",
  projectId: "neko-chat-app-f5444",
  storageBucket: "neko-chat-app-f5444.appspot.com",
  messagingSenderId: "901936650616",
  appId: "1:901936650616:web:77f4c01bb6e19c2572508d",
  measurementId: "G-90PXEFKP1H",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//database from firestore
export const database = getFirestore(app);

//Provider
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
