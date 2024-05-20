
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { HeaderNavLink } from "./components/Header/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MY SOCIAL",
  description: "MYsocial is a social space where people can connect, share experiences, and engage in meaningful conversations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
    <HeaderNavLink/>
        {children}
      
      </body>
      <ToastContainer autoClose={2000} />
    </html>
  ); 
}