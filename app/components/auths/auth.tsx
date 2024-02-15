"use client";
import { auth } from "../config/firebase";
import Chat from "@/app/chat/page";

export const userAuth = () => {
    const user = auth()
}