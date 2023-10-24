"use client";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { auth, database } from "./firebase-config";
import { useEffect, useState } from "react";

// Define a function that sets up a Firebase Firestore database for handling chat messages
export const firebaseDb = () => {
  // Initialize state variables for the new message, and the list of messages
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Create a reference to the "messages" collection in the Firestore database
  const messageRef = collection(database, "messages");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messageRef, {
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      image: auth?.currentUser?.photoURL,
      text: newMessage,
      room: "general",
    });

    setNewMessage("");
  };

  // Listen for changes in the "messages" collection and update the messages list
  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", "general"),
      orderBy("createdAt")
    );

    // Subscribe to real-time updates using onSnapshot
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe(); //used this to cleanup the onSnapshot
  }, []);

  //Export the functions to each components.
  return { handleSubmit, setNewMessage, newMessage, messages };
};
