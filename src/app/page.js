"use client";
import App from "./components/App/App";
import Navbar from "./components/navbar/Navbar";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase-config";

export default function Home() {
  const cookies = new Cookies();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isSSR = typeof window === "undefined";

  useEffect(() => {
    if (isSSR) {
      setIsAuthenticated(!!cookies.get("user-token"));
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsAuthenticated(!!user);
        if (user) {
          cookies.set("user-token", user.refreshToken);
        } else {
          cookies.remove("user-token");
        }
      });

      return () => unsubscribe();
    }
  }, [isSSR]);

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <main>
        <App isAuthenticated={isAuthenticated} />
      </main>
    </>
  );
}
