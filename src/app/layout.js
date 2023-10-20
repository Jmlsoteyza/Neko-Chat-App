import Navbar from "./components/navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "Neko-Chat-App",
  description: "Neko Chat App - Log in or Sign up",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
