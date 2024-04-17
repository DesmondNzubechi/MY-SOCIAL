"use client";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoIosChatbubbles } from "react-icons/io";
import { FcAddImage } from "react-icons/fc";
import { userAuth } from "../components/auths/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../components/config/firebase";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { ProtectedRoute } from "../components/protected  route/protected";
import { signOut } from "firebase/auth";
import { auth } from "../components/config/firebase";
import Login from "../login/page";
import { db } from "../components/config/firebase";
import Image from "next/image";
import { AllUser } from "../components/allUser/allUser";
import { Timestamp, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { v4 as uuid } from "uuid";


const currentDate = new Date();
const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // 'short' for abbreviated name, 'long' for full name
    day: 'numeric',
    weekday: 'long', // 'short' for abbreviated name, 'long' for full name
};

const fullDate = currentDate.toLocaleString(undefined, options);
     
const Chat = () => {
    const user = userAuth();
    //const allUser = AllUser();
    const [allTheUsers, setAllTheUsers] = useState<Array<any>>([]);

    //const [secondChat, setSecondChat] = useState<any>({});


    useEffect(() => {
        const userStore = collection(db, 'users');
        const unsub = onSnapshot(userStore, (snapshot) => {
            const allTheUser = snapshot.docs.map(doc => doc.data());
            setAllTheUsers(allTheUser)

        })
        return () => {
            unsub()
        }
    }, [])
console.log('all the user', allTheUsers)
interface User {
    userID: string;
    username: string;
    userPic: string;
}

const [currentUser, setCurrentUser] = useState<User | any>({});

    useEffect(() => {
        const getCurrentUser = () => {
            const currentUser = allTheUsers.find((cUser: any) => {
            return cUser.userID === user?.uid
            })
            setCurrentUser({ ...currentUser })
            console.log("type", currentUser)
        }
       
            getCurrentUser();
       
    }, [allTheUsers])
    // console.log('all user', allUser)
    console.log("current user", currentUser)

    
    const startChat = async (theUserID: any) => {
        try {
            const combinedId = currentUser?.userID  > theUserID.userID ?
              currentUser?.userID  + theUserID.userID :
              theUserID.userID + currentUser?.userID ;
            
            const docRef = doc(db, 'chats', combinedId);
            const res = await getDoc(docRef);
            if (!res.exists()) {
              await setDoc(docRef,
                {
                  message: [],
                  firstUser: currentUser, 
                  secondUser: theUserID,
                  lastMessage: { message: "Start New Chat", messageDate: fullDate, messageId:uuid() }
                });
            }
         
        } catch (error) {
            alert(error)
        }
    }


const [dp, setDp] = useState<File | any>(null);

    //console.log(user)
    
    const updateDp = async () => {
        const dpRef = ref(storage, 'dp');
        try {
            const dpName = ref(dpRef, currentUser.username)
            const uploadDp = await uploadBytes(dpName, dp);
            const dpUrl = await getDownloadURL(uploadDp.ref);
           

            await updateDoc(doc(db, 'users', currentUser.userID), {
             userPic: dpUrl   
            })
            alert("success");
        } catch (error) {
           alert(error) 
        }
    }

    useEffect(() => {
        if (dp !== null) {
            updateDp()
        }

    }, [dp])


    const [allTheChat, setAllTheChat] = useState<any>([])


    useEffect(() => {
        const chatRef = collection(db, 'chats');
        const Unsub = onSnapshot(chatRef, (snapShot) => {
        let chats = snapShot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            setAllTheChat(chats)
        })

        return () => Unsub();
    }, [])
    
    const [myChats, setMyChats] = useState<any>([])
    useEffect(() => {
        const filterMyChat = allTheChat.filter((myChat:any) => {
            return myChat.id.includes(user?.uid)
        })
        setMyChats(filterMyChat)
    }, [allTheChat])
    console.log("all my chat", myChats)
    console.log("all the chat", allTheChat)
    
    return (
        <>
            {user ? (
                <div className="py-[20px] flex flex-row items-center gap-5  absolute left-0 right-0 top-[50p] bottom-0 justify-evenly">
                    <div className="flex flex-col h-[100vh] w-full overflow-y-scroll gap-5 px-[10px] py-[20px] pt-[100px]  bg-slate-100 items-center ">
                        <h1 className="uppercase text-[30px] text-center font-bold">all the chats</h1>
                        <div className="flex items-center  w-full self-start justify-center gap-5 ">
                            <div className="flex self-start flex-col gap-2">
                                <div className="items-center flex relative">
                                {currentUser.userPic? <Image alt={currentUser.username} width={50} height={30} className="rounded-full h-[50px]" src={currentUser?.userPic} /> :
                            <FaUserCircle className="text-[50px] " />}
                                <input type="file" onChange={(e) => {
                                    setDp(e.target.files?.[0])
                                }} name="image" className="hidden" id="image" />
                                <label htmlFor="image" className="absolute text-[20px] bottom-[-5px] " >
                                    <FcAddImage />
                                </label>
                                <h1 className="font-bold uppercase text-[20px] ">@{currentUser?.username}</h1>
                                </div>
                            </div>
                           
                            {/* <button onClick={() => logOutUser()} className="bg-red-500 p-1 text-slate-50 px-[20px] rounded text-[20px] font-medium">Logout</button> */}
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center  border px-5 border-[2px] bg-slate-100 gap-1 rounded-[10px] justify-center">
                                <input type="search" name="" className="outline-none w-full bg-transparent p-2" placeholder="Serach for messages" id="" />
                                <IoMdSearch />
                            </div>
                            <div className="flex w-full flex-col gap-5">
                              
                                {
                                    myChats?.map((chat:any) => {
                                        return <><Link   key={chat?.lastMessage?.messageId} href={`chat/${chat?.id}`} className="flex w-full gap-2 items-center">
                                        {(chat.secondUser.userPic !== '' && chat.firstUser.userPic !== '')? <Image alt='user pic' width={50} height={30} className="rounded-full h-[50px]" src={chat?.firstUser.userID === currentUser.userID ? chat?.secondUser?.userPic : chat?.firstUser?.userPic} /> :
                                                
                                                <FaUserCircle className="text-[40px] " />}
                                        <div className="flex flex-col gap-[5px]">
                                            <div className="flex items-center flex-row gap-2">
                                                    <h1 className="text-slate-900 text-[15px] uppercase font-bold font-semibold">{chat?.firstUser.userID === currentUser.userID ? chat?.secondUser?.username : chat?.firstUser?.username}</h1> <p className="text-slate-500 italic text-[15px]">{chat?.lastMessage?.messageDate}</p>
                                                </div>  
                                           <div>
                                                    <p className="text-slate-500 text-[15px]">{chat?.lastMessage?.message}</p>
                                            </div>
                                            </div>
                                        </Link>
                                            <hr />
                                            </>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex w-full flex-col items-center justify-self-center">
                        <IoIosChatbubbles className="text-[100px]" />
                        <h1 className="uppercase font-bold  text-[30px]">Click on a user</h1>
                        <p className="text-slate-500">Choose from your existing conversations, start a new one.</p>
                    </div>
                </div>) : (
                    <Login /> 
            )}
            </>
        )
}

export default Chat;