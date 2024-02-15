"use client";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const userAuth = () => {
    const [user, setUser] = useState <any | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( (user) => {
    setUser(user)
        })
        
        return () => unsubscribe();
    },[])

    return user
}