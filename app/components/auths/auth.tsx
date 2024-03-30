"use client";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { User } from "firebase/auth";
import { updateProfile } from "firebase/auth";
export const userAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check if we are on the client side before using hooks
        if (typeof window !== 'undefined') {
            const unsubscribe = auth.onAuthStateChanged((authUser) => {
                setUser(authUser);
            });

            return () => unsubscribe();
        }
    }, []);

    return user;
};
