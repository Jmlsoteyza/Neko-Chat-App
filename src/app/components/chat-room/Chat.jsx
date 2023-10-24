import ChatRoom from "./ChatRoom";
import { useEffect, useState } from "react";
import { auth, database } from "@/app/utils/firebase-config";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

export default function Chat() {
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

  return (
    <div>
      <ChatRoom
        handleSubmit={handleSubmit}
        setNewMessage={setNewMessage}
        newMessage={newMessage}
        messages={messages}
      />
    </div>
  );
}
