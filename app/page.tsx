"use client";
import Image from "next/image";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./components/config/firebase";
import { useRouter } from "next/navigation";
import { userAuth } from "./components/auths/auth";
import { redirect } from "next/navigation";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
     
    </main>
  );
}
