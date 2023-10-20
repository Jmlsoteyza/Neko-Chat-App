"use client";

import Cookies from "universal-cookie";
import { auth, googleProvider, githubProvider } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

export const firebaseAuth = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  //export the cookies boolean to check if the web is logged in or not
  const cookies = new Cookies();

  const signUp = async () => {
    try {
      const resultToken = await createUserWithEmailAndPassword(
        auth,
        newUserEmail,
        newUserPassword
      );
      cookies.set("user-token", resultToken.user.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  const signInEmailAndPassword = async () => {
    try {
      const resultToken = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      cookies.set("user-token", resultToken.user.refreshToken);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const resultToken = await signInWithPopup(auth, googleProvider);
      cookies.set("user-token", resultToken.user.refreshToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

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
