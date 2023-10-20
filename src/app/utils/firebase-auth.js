"use client";

import Cookies from "universal-cookie";
import { auth, googleProvider, githubProvider } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

export const FirebaseAuth = ({ setIsAuthenticated }) => {
  // This state is for sign in method where I returned it and pass to signIn Component.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // This state is for sign up method where I returned it and pass to signUp Component.
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  // export the cookies boolean to check if the web is logged in or not
  const cookies = new Cookies();

  // This a function that is used in firebase to be able to sign in and sign up with different methods
  // Including Github links, Gmail links and your created accounts.
  // And set a user-token to handle the firebase authentication with sign in and sign out

  // Function to sign up a user with email and password
  const signUp = async () => {
    try {
      const resultToken = await createUserWithEmailAndPassword(
        auth,
        newUserEmail,
        newUserPassword
      );
      cookies.set("user-token", resultToken.user.refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to sign in a user with email and password
  const signInEmailAndPassword = async () => {
    try {
      const resultToken = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      cookies.set("user-token", resultToken.user.refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to sign in a user with Google authentication
  const signInWithGoogle = async () => {
    try {
      const resultToken = await signInWithPopup(auth, googleProvider);
      cookies.set("user-token", resultToken.user.refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to sign in a user with GitHub authentication
  const signInWithGithub = async () => {
    try {
      const resultToken = await signInWithPopup(auth, githubProvider);
      cookies.set("user-token", resultToken.user.refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        console.error("Account already exists with a different credential.");
      } else {
        console.error("An error occurred during sign-in:", error);
      }
    }
  };

  // Lastly I returned all of the functions to pass it to each of their components
  // I decided to pass it like this because for me it's much easier to put
  // all of the firebase function into one file. That's why I decided to
  // use this method rather than using createcontext hook
  return {
    signInWithGithub,
    signInWithGoogle,
    signUp,
    signInEmailAndPassword,
    setEmail,
    setPassword,
    password,
    email,
    newUserPassword,
    newUserEmail,
    setNewUserEmail,
    setNewUserPassword,
  };
};
