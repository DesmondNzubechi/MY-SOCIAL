"use client";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useState } from "react";
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

const User = ({ params }: { params: { chatId: string } }) => {

    const { chatId } = params; // Access the correct parameter name
  
    const allUser = AllUser();
    const [userInfoState, setUserInfoState] = useState<userInfo>({
        userID: '',
        username: '',
        useremail: '',
        userPic: '',
    });

   
   
    useEffect(() => {
        const filterUser = () => {
            const findUser = allUser.find((user: userInfo) => user.userID === params.chatId);
            setUserInfoState(findUser);
            console.log("find user",  findUser)
        };
        
      filterUser()
}, [chatId, allUser])
    
console.log("routess", userInfoState);
console.log('params', params.chatId);
console.log("all users", allUser)
    // let userChat = [
    //     {
    //         name: 'Nzube',
    //         message: "How are you doing",
    //         id: "jsdhh",
    //         userImg: ''
    //     },
    //     {
    //         name: 'og man',
    //         message: "How are you doing",
    //         id: "js",
    //         userImg: ''
    //     }
    // ]

    const [viewProfile, setViewprofile] = useState(false);
    const user = userAuth();
    const [dp, setDp] = useState<any>(null);
    console.log(user)
    //  const updateDp = async () => {
    //      const dpRef = ref(storage, 'dp');
    //      try {
    //          const dpName = ref(dpRef, dp.name)
    //          const uploadDp = await uploadBytes(dpName, dp);
    //          const dpUrl = await getDownloadURL(uploadDp.ref);
    //          await updateProfile(user, {
    //            photoURL: dpUrl
    //        })
    //      } catch (error) {
             
    //      }
    //  }

    return (
        <div className="py-[20px] fixed w-full flex flex-row items-start gap-5  justify-around">
            <div className=" hidden md:flex flex-col max-h-[100vh] overflow-y-auto gap-5 overflow-x-hidden px-[30px] py-[20px] items-center ">
                <h1 className="uppercase text-[30px] text-center font-bold">myu chat</h1>
                <div className="flex items-center w-full self-start justify-between gap-5 ">
                <div className="items-center flex relative">
                                <FaUserCircle className="text-[50px] " />
                                <input type="file" onChange={(e) => {
                                    setDp(e.target.files?.[0])
                                  //  updateDp();
                                }} name="image" className="hidden" id="image" />
                                <label htmlFor="image" className="absolute text-[20px] bottom-[-5px] " >
                                    <FcAddImage />
                                </label>
                                <h1 className="font-medium text-[20px] ">@{user?.displayName}</h1>
                                </div>
                    <button className="bg-red-500 p-1 text-slate-50 px-[20px] rounded text-[20px] font-medium">Logout</button>
                </div>
                <div className="flex flex-col gap-5">
                <div className="flex items-center border px-5 border-[2px] bg-slate-100 gap-1 rounded-[20px] justify-center">
                    <input type="search" name="" className="outline-none bg-transparent p-2" placeholder="Serach for messages" id="" />
                    <IoMdSearch />
                </div>
                <div className="flex flex-col gap-5">
                <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr /> <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr /> <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr /> <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr /> <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr /> <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr />
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto overflow-x-hidden h-[100vh] gap-y-[50px] px-[20px] relative bg-contain justify-around w-full ">
                <div className="left-0  md:left-[363px]  px-[20px] flex right-0 items-center justify-between  gap-3 p-2 rounded fixed bg-slate-200 top-0">
                    <div className="flex gap-2 items-center">
                    <FaUserCircle className="text-[40px]" />
                    <h1 className="uppercase font-medium text-[20px] ">Desmond Nzubechukwu</h1>
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
                <div className="flex pt-[200px] pb-[120px]  items-center flex-col gap-y-[50px]">
                <div className="flex items-center  self-start  gap-2">
                    <FaUserCircle className="text-[40px]"/>
                    <p className="p-[20px] bg-slate-500 text-[20px] text-white rounded-tl-[10px] rounded-r-[15px] ">What's good ]?</p>
                </div>
                <div className="flex items-center self-end align-end gap-2">
                    <p className="p-[20px] bg-sky-500 text-[20px] text-white rounded-tr-[10px] rounded-l-[15px] ">What's good?</p>
                    <FaUserCircle className="text-[40px]"/>
                    </div>
                    <div className="flex items-center  self-start  gap-2">
                    <FaUserCircle className="text-[40px]"/>
                    <p className="p-[20px] bg-slate-500 text-[20px] text-white rounded-tl-[10px] rounded-r-[15px] ">What's good ]?</p>
                </div>
                <div className="flex items-center self-end align-end gap-2">
                    <p className="p-[20px] bg-sky-500 text-[20px] text-white rounded-tr-[10px] rounded-l-[15px] ">What's good?</p>
                    <FaUserCircle className="text-[40px]"/>
                    </div>
                    <div className="flex items-center  self-start  gap-2">
                    <FaUserCircle className="text-[40px]"/>
                    <p className="p-[20px] bg-slate-500 text-[20px] text-white rounded-tl-[10px] rounded-r-[15px] ">What's good ]?</p>
                </div>
                <div className="flex items-center self-end align-end gap-2">
                    <p className="p-[20px] bg-sky-500 text-[20px] text-white rounded-tr-[10px] rounded-l-[15px] ">What's good?</p>
                    <FaUserCircle className="text-[40px]"/>
                    </div>
                    <div className="flex items-center  self-start  gap-2">
                    <FaUserCircle className="text-[40px]"/>
                    <p className="p-[20px] bg-slate-500 text-[20px] text-white rounded-tl-[10px] rounded-r-[15px] ">What's good ]?</p>
                </div>
                <div className="flex items-center self-end align-end gap-2">
                    <p className="p-[20px] bg-sky-500 text-[20px] text-white rounded-tr-[10px] rounded-l-[15px] ">What's good?</p>
                    <FaUserCircle className="text-[40px]"/>
                    </div>
                    <div className="flex items-center self-end align-end gap-2">
                        <Image alt="" width={200} height={200} className="w-[200px] shadow-2xl rounded " src={fvi} />
                    <FaUserCircle className="text-[40px]"/>
                </div>
                </div>
                
                <form action=""  className="left-0  md:left-[363px] flex gap-2 right-0 items-center p-2 rounded fixed bg-slate-200 bottom-0">
                    <input type="text" name="" placeholder="Write you message here" className=" py-[10px] text-[20px] bg-transparent outline-none  w-full rounded " id="" />
                    <input type="file" className="hidden " name="file" id="file" />
                    <label htmlFor="file">
                    <RiImageAddFill className="text-[40px] rounded-full    "/>
                    </label>
                    <button className="bg-sky-500 py-[5px] shadow-2xl rounded-[7px] text-slate-50 text-[20px]  px-[20px]">Send</button>
           </form>
            </div>
            </div>
    )
}

export default User;