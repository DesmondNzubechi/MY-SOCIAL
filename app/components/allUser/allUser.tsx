"use clients"

import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../config/firebase";
import { userAuth } from "../auths/auth";

export const AllUser = () => {
    const loggedInUser = userAuth();
    const [allUser, setAllUser] = useState<any>([]);

    useEffect(() => {

        const userCollection = collection(db, 'users');

        const unsub = onSnapshot(userCollection, (snapshot) => {
            const users = snapshot.docs.map(doc => ({ ...doc.data() }))
            const filterUser = users.filter((user: any) => {
                return user.userID !== loggedInUser?.uid
            })
            setAllUser(filterUser);
        })
        return () => {
            unsub();
 }
    },[]) 

    return allUser;
}