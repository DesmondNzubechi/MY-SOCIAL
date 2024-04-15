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
import { db, storage } from "@/app/components/config/firebase";
import { fullDate } from "@/app/components/publishAPost/publishAPost";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import Chat from "../page";
import { userInfo } from "os";
//import { userInfo } from "os";
interface userInfo  { 
    userID: string,
    username: string,
    useremail: string,
    userPic: string
}

interface messageInfo {
    senderId: string | undefined,
    senderName: string | undefined | null,
    messageTitle: string,
    time: any,
    messageImg: string,
   
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
    messageTitle: '',
    time: fullDate,
  messageImg: '',
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
            const findUser = allUser.find((theUser: userInfo) => params.chatId.includes(theUser.userID) && theUser.userID !== user?.uid);
            setUserInfoState(findUser);
            console.log("find user",  findUser)
        };
        
      filterUser()
    }, [chatId, allUser, params.chatId])
    

    useEffect(() => {
        const getCurrentUser = () => {
            const currentUser = allUser.find((cUser: any) => {
            return cUser.userID === user?.uid
            })
            setCurrentUser({ ...currentUser })
          
        }
       
            getCurrentUser();
       
    }, [allUser])


    useEffect(() => {
        const chatStore = doc(db, 'chats', params.chatId);
       // console.log('combine id', combinedId);

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
    }, [combinedId, params.chatId, message.messageTitle]);



    
    const sendAMessage = async () => {
        if (message.messageTitle === '') {
            toast.info("Please input your message", {
                hideProgressBar: true,
                position: "top-center"
            })
            return;
        }
        try {
            const chatRef = doc(db, 'chats', params.chatId);
        await updateDoc(chatRef, {
            message: [...currentChat?.message, message],
            lastMessage: { message: message.messageTitle, messageDate: fullDate, messageId:uuid() }
        })
        setMesage({
            senderId: '',
        senderName: '',
        messageTitle: '',
        time: fullDate,
            messageImg: '',
        })
        toast.success("message sent successfully", {
            hideProgressBar: true,
            position: "top-center"
        })
           
        } catch (error) {
            toast.error("An error occured. Try again", {
                hideProgressBar: true,
                position: "top-center"
            })
        }
        
    }

    
    
   
    const [viewProfile, setViewprofile] = useState(false);
    const [dp, setDp] = useState<any>(null);
   
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
    const messenger = currentChat?.firstUser?.userID === currentUser.userID ? currentChat.secondUser : currentUser.firstUser
    const imageExtensions = /\.(jpeg|jpg|gif|png|bmp)$/i;
    const  isImageLink = (str: any) => {
        return imageExtensions.test(str);
    }
    const [chatImg, setChatImg] = useState<File | any>(null);

    const sendChatImage = async () => {
        try {
            const chatImgRef = ref(storage, "chat images");
            const chatImgname = ref(chatImgRef, `${uuid()} chat image ${chatImg.name}`)
          const uploadChatImg =  await uploadBytes(chatImgname, chatImg);
            const getChatImgURL = await getDownloadURL(uploadChatImg.ref);
            const chatRef = doc(db, "chats", params.chatId);
            await updateDoc(chatRef, {
                message: [...currentChat?.message,
                    {
                        messageImg: getChatImgURL,
                        messageTitle: '',
                        senderId: user?.uid,
                        senderName: user?.displayName,
                        time: fullDate,
                    }
                ],
                lastMessage: { message: "An Image", messageDate: fullDate, messageId:uuid() }
            })
            toast.success("message sent successfully", {
                hideProgressBar: true,
                position: "top-center"
            })
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        if (chatImg !== null) {
            sendChatImage()
        }
    }, [chatImg])
    console.log("current chat ", currentChat)
    
    
    
    return (
        <div className=" fixed w-full top-[70px] flex flex-row items-start gap-5  justify-around">
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
                            <div className="flex w-full flex-col pb-[50px] gap-5">
                              
                            {
                                    myChats?.map((chat:any) => {
                                        return <><Link   key={chat?.lastMessage?.messageId} href={`${chat?.id}`} className="flex w-full gap-2 items-center">
                                        <FaUserCircle className="text-[40px] " />
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
            <div className="flex flex-col overflow-y-auto overflow-x-hidden h-[100vh] gap-y-[50px] px-[20px] relative bg-contain pt-[50px] justify-around w-full ">
                <div className="right-0 left-0 md:left-[48.8%] right-0 md:right-[0%] px-[20px] flex  items-center justify-between top-[70px]  gap-3 p-2 rounded fixed bg-slate-100 top-0">
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
                <div className="flex  pb-[140px] pt-[50px]  items-center flex-col gap-y-[50px]">
                    {
                        currentChat?.message?.map((chats: messageInfo) => {
                            return <div  ref={(el) => (lastMessageRef.current = el)} className={`flex items-center ${chats?.senderId !== user?.uid? "self-start" : "self-end" }   ${chats?.senderId !== user?.uid? "flex-row" : "flex-row-reverse" }  gap-2`}>
                                {chats?.senderId === chatId && (userInfoState?.userPic ? <Image alt={userInfoState?.username} width={50} height={30} className="rounded-full h-[50px]" src={userInfoState?.userPic} /> : <FaUserCircle className="text-[50px] " />)}
                                {chats?.senderId !== chatId &&  (user?.photoURL ? <Image alt={userInfoState?.username} width={50} height={30} className="rounded-full h-[50px]" src={user?.photoURL} /> :<FaUserCircle className="text-[50px] " />)}
                                {chats.messageTitle !== '' && <p className={` ${chats?.senderId !== user?.uid ? ' p-[20px] bg-slate-500 text-[20px] text-white rounded-tl-[10px] rounded-r-[15px]' : "p-[20px] bg-sky-500 text-[20px] text-white rounded-tr-[10px] rounded-l-[15px] "} `}>{chats?.messageTitle}</p> }
                               {chats.messageImg !== '' && <Image alt="" width={200} height={200} className="w-[200px] shadow-2xl rounded " src={chats?.messageImg} /> }
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
                            messageTitle: e.target.value,
                            senderId: user?.uid,
                            senderName: user?.displayName,
                            time: fullDate,
                            messageImg: ''
                        })
                    }} name="" value={message.messageTitle} placeholder="Write you message here" className=" py-[10px] text-[20px] bg-transparent outline-none  w-full rounded " id="" />
                    <input type="file" onChange={(e) => {
                        setChatImg(e.target.files?.[0])
                    }} className="hidden " name="file" id="file" />
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