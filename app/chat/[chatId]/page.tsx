"use client";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import fvi from '../../../public/codes.jpg';
import { RiImageAddFill } from "react-icons/ri";
import { FcAddImage } from "react-icons/fc";

import { userAuth } from "@/app/components/auths/auth";
import { AllUser } from "@/app/components/allUser/allUser";
import { Timestamp, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/app/components/config/firebase";


interface userInfo  { 
    userID: string,
    username: string,
    useremail: string,
    userPic: string
}

interface messageInfo {
    senderId: string | undefined,
    senderName: string | undefined | null,
    messagTitle: string,
    time: any,
   
}
interface User {
    userID: string;
    username: string;
    userPic: string;
}
const User = ({ params }: { params: { chatId: string } }) => {

    const { chatId } = params; // Access the correct parameter name
    const user = userAuth();
    const allUser = AllUser();
    const [currentUser, setCurrentUser] = useState<User | any>({});
    const lastMessageRef = useRef<HTMLDivElement | null>(null);
    const [currentChat, setCurrentChat] = useState<any>([])
    const [userInfoState, setUserInfoState] = useState<userInfo>({
        userID: '',
        username: '',
        useremail: '',
        userPic: '',
    });
const [message, setMesage] = useState<messageInfo>({
    senderId: '',
    senderName: '',
    messagTitle: '',
  time:  null
})



 
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({behavior: "smooth"})
        }
    }, [currentChat.message])
    console.log("user information", user);
    
    const combinedId = currentUser.userID > params.chatId ?
        user?.uid + params.chatId :
        params.chatId + user?.uid;
   
    useEffect(() => {
        const filterUser = () => {
            const findUser = allUser.find((user: userInfo) => user.userID === params.chatId);
            setUserInfoState(findUser);
            console.log("find user",  findUser)
        };
        
      filterUser()
    }, [chatId, allUser])
    
    // useEffect(() => {
    //     if (user) {
    //         const ChatRef = collection(db, "chats");
    //         const unsub = onSnapshot(ChatRef, (ChatSnapshot) => {
    //             const allChats = ChatSnapshot.docs.map(doc => doc.data());
    //             // const filterCurrentUserChat = allChats.filter(chat => {
    //             //     return chat.id.includes(user?.uid)
    //             // })
    //         })
    //         return () => unsub()
    //     }
       
    // }, [user])

    useEffect(() => {
        const getCurrentUser = () => {
            const currentUser = allUser.find((cUser: any) => {
            return cUser.userID === user?.uid
            })
            setCurrentUser({ ...currentUser })
          
        }
       
            getCurrentUser();
       
    }, [allUser])

    // useEffect(() => {
    //     const userStore = collection(db, 'chats');
    //     const unsub = onSnapshot(userStore, (snapshot) => {
    //         const allTheUser = snapshot.docs.map(doc => doc.data());
    //         console.log("chat collections", allTheUser)

    //     })
    //     return () => {
    //         unsub()
    //     }
    // }, [])

    useEffect(() => {
        const chatStore = doc(db, 'chats', combinedId);
        console.log('combine id', combinedId);

        const unsubscribe = onSnapshot(chatStore, (theChatSnapshot) => {
            try {
                // Check if the document exists before accessing data
                if (theChatSnapshot.exists()) {
                    const theChat = theChatSnapshot.data();
                    setCurrentChat(theChat); // Use an array if you are storing multiple chat documents
                    console.log('current chat', currentChat);
                } else {
                    // Handle case where the document doesn't exist
                    console.log('Chat document does not exist');
                }
            } catch (error) {
                console.error('Error processing chat snapshot:', error);
            }
        });

        return () => unsubscribe();
    }, [combinedId, params.chatId, message.messagTitle]);


    
    const sendAMessage = async () => {
        if (message.messagTitle === '') {
            alert("please in put message");
            return;
        }
        try {
            const chatRef = doc(db, 'chats', combinedId);
        await updateDoc(chatRef, {
            message: [...currentChat?.message, message]
        })
           // alert("message succesful")
        } catch (error) {
           alert(error) 
        }
        
    }

    
    
   
    const [viewProfile, setViewprofile] = useState(false);
    const [dp, setDp] = useState<any>(null);
    console.log("current user", user)
    

    return (
        <div className=" fixed w-full flex flex-row items-start gap-5  justify-around">
         <div className="md:flex flex-col hidden  h-[100vh] w-full overflow-y-scroll gap-5 px-[10px] py-[20px] pt-[100px]  bg-slate-100 items-center ">
                        <h1 className="uppercase text-[30px] text-center font-bold">all the chats</h1>
                        <div className="flex items-center  w-full self-start justify-center gap-5 ">
                            <div className="flex self-start flex-col gap-2">
                                <div className="items-center flex relative">
                                {user?.photoURL? <Image alt={`${user?.displayName}`} width={50} height={30} className="rounded-full h-[50px]" src={user?.photoURL} /> :
                            <FaUserCircle className="text-[50px] " />}
                                <input type="file" onChange={(e) => {
                                    setDp(e.target.files?.[0])
                                }} name="image" className="hidden" id="image" />
                                <label htmlFor="image" className="absolute text-[20px] bottom-[-5px] " >
                                    <FcAddImage />
                                </label>
                                <h1 className="font-bold uppercase text-[20px] ">@{user?.displayName}</h1>
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
                                    allUser?.map((users:any) => {
                                        return <><Link href={`${users.userID}`} className="flex w-full gap-2 items-center">
                                        <FaUserCircle className="text-[40px] " />
                                        <div className="flex flex-col gap-[5px]">
                                            <div className="flex items-center flex-row gap-2">
                                                    <h1 className="text-slate-900 text-[15px] uppercase font-bold font-semibold">{users?.username}</h1> <p className="text-slate-500 md:flex hidden text-[15px]">@{users?.username}</p>
                                                </div>
                                                
                                            {/* <div>
                                                <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                                            </div> */}
                                            </div>
                                        </Link>
                                            <hr />
                                            </>
                                    })
                                }
                            </div>
                        </div>
                    </div>
            <div className="flex flex-col overflow-y-auto overflow-x-hidden h-[100vh] gap-y-[50px] px-[20px] relative bg-contain pt-[50px] justify-around w-full ">
                <div className="right-0 left-0 md:left-[48.8%] right-0 md:right-[0%] px-[20px] flex  items-center justify-between   gap-3 p-2 rounded fixed bg-slate-100 top-0">
                    <div className="flex gap-2 items-center">
                   {userInfoState?.userPic ? <Image alt={userInfoState?.username} width={50} height={30} className="rounded-full h-[50px]" src={userInfoState?.userPic} /> : <FaUserCircle className="text-[50px] " />}
                        <h1 className="uppercase font-medium text-[20px] ">{ userInfoState?.username}</h1>
                    </div>
                    <HiDotsHorizontal onClick={() => {
                        if (!viewProfile) {
                            setViewprofile(true);
                        } else {
                            setViewprofile(false)
                        }
                    }} className="border text-[30px] border-slate-900 p-1  rounded-full " />
                  
                     { viewProfile &&  <Link href="" className="text-slate-900 bg-white  fixed top-[50px] font-medium px-[20px] py-[30px] shadow-2xl rounded  right-0">View Profile</Link>}
                 
           </div>
                <div className="flex  pb-[120px]  items-center flex-col gap-y-[50px]">
                    {
                        currentChat?.message?.map((chats: messageInfo) => {
                            return <div  ref={(el) => (lastMessageRef.current = el)} className={`flex items-center ${chats?.senderId === chatId? "self-start" : "self-end" }   ${chats?.senderId === chatId? "flex-row" : "flex-row-reverse" }  gap-2`}>
                                {chats?.senderId === chatId && (userInfoState?.userPic ? <Image alt={userInfoState?.username} width={50} height={30} className="rounded-full h-[50px]" src={userInfoState?.userPic} /> : <FaUserCircle className="text-[50px] " />)}
                                {chats?.senderId !== chatId &&  (user?.photoURL ? <Image alt={userInfoState?.username} width={50} height={30} className="rounded-full h-[50px]" src={user?.photoURL} /> :<FaUserCircle className="text-[50px] " />)}
                                <p className={` ${chats?.senderId === chatId? ' p-[20px] bg-slate-500 text-[20px] text-white rounded-tl-[10px] rounded-r-[15px]' : "p-[20px] bg-sky-500 text-[20px] text-white rounded-tr-[10px] rounded-l-[15px] "} `}>{chats?.messagTitle}</p>
                              
                            </div>
                        })
                }
                    {/* <div className="flex items-center  self-start  gap-2">
                    <FaUserCircle className="text-[40px]"/>
                    <p className="p-[20px] bg-slate-500 text-[20px] text-white rounded-tl-[10px] rounded-r-[15px] ">What's good ]?</p>
                </div>
               
                <div className="flex items-center self-end align-end gap-2">
                    <p className="p-[20px] bg-sky-500 text-[20px] text-white rounded-tr-[10px] rounded-l-[15px] ">What's good?</p>
                    <FaUserCircle className="text-[40px]"/>
                    </div> */}
                    {/* <div className="flex items-center self-end align-end gap-2">
                        <Image alt="" width={200} height={200} className="w-[200px] shadow-2xl rounded " src={fvi} />
                    <FaUserCircle className="text-[40px]"/>
                </div> */}
                </div>
                
                <form action=""  className="left-0 md:left-[48.8%] right-0 md:right-[0%]  flex gap-2 right-0 items-center p-2 rounded fixed bg-slate-100 bottom-0">
                    <input type="text" onChange={(e) => {
                        setMesage({
                            messagTitle: e.target.value,
                            senderId: user?.uid,
                            senderName: user?.displayName,
                            time: 'january',
                        })
                    }} name="" placeholder="Write you message here" className=" py-[10px] text-[20px] bg-transparent outline-none  w-full rounded " id="" />
                    <input type="file" className="hidden " name="file" id="file" />
                    <label htmlFor="file">
                    <RiImageAddFill className="text-[40px] rounded-full    "/>
                    </label>
                    <button onClick={sendAMessage} className="bg-sky-500 py-[5px] shadow-2xl rounded-[7px] text-slate-50 text-[20px]  px-[20px]" type="button">Send</button>
           </form>
            </div>
            </div>
    )
}

export default User;