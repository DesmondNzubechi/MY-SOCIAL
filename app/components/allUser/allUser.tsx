"use clients"

import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../config/firebase";


export const AllUser = () => {
    const [allUser, setAllUser] = useState<any>([]);

    useEffect(() => {

        const userCollection = collection(db, 'users');

        const unsub = onSnapshot(userCollection, (snapshot) => {
            const users = snapshot.docs.map(doc => ({ ...doc.data() }))
            setAllUser(users)
        })
        return () => {
            unsub();
 }
    },[])

    return allUser;
}