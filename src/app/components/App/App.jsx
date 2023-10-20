"use client";
import dynamic from "next/dynamic";

// remove pre-rendering
const Hero = dynamic(() => import("../hero/Hero"));
const Chat = dynamic(() => import("../chat-room/Chat"));

export default function App({ isAuthenticated }) {
  // it checks if the user is logged in or not, if it's render Chatroom if not render hero.
  if (!isAuthenticated) {
    return <Hero />
  }

  return <Chat />
}
