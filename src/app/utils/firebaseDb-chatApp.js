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

export const firebaseDb = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //add document into collections
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

  // received the message to a chatroom or to each users
  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", "general"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return { handleSubmit, setNewMessage, newMessage, messages };
};
