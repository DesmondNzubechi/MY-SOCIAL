"use client"
import { FaMessage } from "react-icons/fa6";
import { FaUsersRectangle } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { TbSocial } from "react-icons/tb";
import Link from "next/link";
import { AllUser } from "../allUser/allUser";
import { userAuth } from "../auths/auth";
import { personalInfo } from "@/app/my-profile/page";
import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Image from "next/image";
import { LogOut } from "../LogOut/LogOut";


export const HeaderNavLink = () => {
    
  const allUser = AllUser()
  const loggedInUser = userAuth();
  const [userPersonalInfo, setUserPersonalInfo] = useState<personalInfo>({
    userID: "",
    fullname: "",
    useremail: "",
    userPic:"",
    coverPic: "",
    username: "",
    bio: "",
    location: "",
    favorite: "",
    dateJoined: ''
  })

  const getUserProfile = () => {
    const findUser = allUser.find((profile: any) => {
      return profile.userID === loggedInUser?.uid
    })
    setUserPersonalInfo(findUser);
  }

  useEffect(() => {
    getUserProfile()
  }, [allUser, loggedInUser])
    const [viewProState, setViewproState] = useState<boolean>(false)
  
    const viewProFn = () => {
        if (viewProState) {
            setViewproState(false)
        } else {
            setViewproState(true)
        }
    }
    const [logOut, setLogOut] = useState<boolean>(false);
    
    return <>
        <LogOut logOut={logOut} setLogOut={setLogOut} />
      { viewProState && <div className="md:col-span-2  bg-white shadow-2xl border fixed z-[200] gap-2 md:top-[75px] top-[55px] w-fit  right-0 rounded-[10px] p-2 p-[20px]  md:flex flex-col justify-center">
   {loggedInUser ? <ul className="flex flex-col gap-3 items-center ">
      <div className="flex flex-col   rounded-[10px] py-[10px] px-[20px] items-center">
     {userPersonalInfo?.userPic?  <Image className="rounded-full h-[50px] w-[50px]" alt={`${userPersonalInfo?.username} profile pic`} src={userPersonalInfo?.userPic} height={50} width={50} /> : <FaUserCircle className="text-[70px] bg-slate-50 rounded-full  " />}
          <h1 className="text-[20px] font-bold">{userPersonalInfo?.username}</h1>
        <Link onClick={viewProFn} className="border   w-full text-center text-slate-900 rounded p-1" href='/my-profile'>View Profile</Link>
      </div>
                <button onClick={() => {
                    viewProFn();
                    setLogOut(true)
      } } className="flex text-[20px]  items-center"><IoMdLogOut /> <span className="text-slate-500">Logout</span></button>
    </ul> :  <ul className="flex flex-col gap-3 items-center ">
    <Link href='/' onClick={viewProFn} className="text-slate-700 text-[20px] capitalize ">Home</Link>
      <Link href='/login' onClick={viewProFn} className="flex text-[20px] mt-[20px] items-center"><IoMdLogOut /> <span className="text-slate-500">Login</span></Link>
    </ul>}
  </div>} 
         <header className="flex items-center bg-slate-50 fixed top-0 left-0 right-0 w-full z-[100] shadow gap-5 bg-white  py-[10px] px-[30px] overflow-x-hidden justify-between">
          <div className="flex items-center gap-3">
          <div className="flex items-center  text-white py-[5px] px-[10px] rounded">
          <TbSocial className="md:text-[50px] text-[25px] text-blue-500"/>
          <h1 className="md:text-[15px] text-[12px] text-blue-500 ">MYsocial</h1>
            </div>
            <input type="text" className="bg-slate-50 rounded capitalize outline-none py-[18px] w-full md:block hidden  text-center text-[15px]" placeholder="search for a post here" name="" id="" />
     </div>
          <div className="flex items-center gap-5 ">
          <Link href="/" className="flex flex-col items-center gap-0">
              <MdHome className="text-slate-700 text-[15px] md:text-[20px]"/>
              <span className="md:text-[12px] text-[10px] ">Home</span>
            </Link>
            <Link href="/chat" className="flex flex-col items-center gap-0">
              <FaMessage className="text-slate-700  text-[15px] md:text-[20px]"/>
              <span className="md:text-[12px] text-[10px]">Messaging</span>
            </Link>
            <Link href="/users" className="flex flex-col items-center gap-0">
              <FaUsersRectangle className="text-slate-700  text-[15px] md:text-[20px]"/>
              <span className="md:text-[12px] text-[10px]">Friends</span>
            </Link> 
            <button onClick={viewProFn} className="flex flex-col items-center gap-0">
            {userPersonalInfo?.userPic?  <Image className="rounded-full h-[20px] w-[20px]" alt={`${userPersonalInfo?.username} profile pic`} src={userPersonalInfo?.userPic} height={50} width={50} /> : <FaUserCircle className="text-slate-700  text-[15px] md:text-[20px]" />}
              <span className="md:text-[12px] text-[10px]">Me</span>
            </button>
          </div>
    </header>
    </>
}