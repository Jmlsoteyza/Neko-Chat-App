"use client";
import dynamic from "next/dynamic";

// remove pre-rendering
const Hero = dynamic(() => import("../hero/Hero"));
const Chat = dynamic(() => import("../chat-room/Chat"));

export default function App({ isAuthenticated }) {
  // it checks if the it's logged in or not, if it's logged in render <Chat /> otherwise render <Hero />
  if (!isAuthenticated) {
    return <Hero />
  }

  return <Chat />
}
