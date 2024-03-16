"use client";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { userAuth } from "../auths/auth";

export const SideBar = ({ setPublishPost }: { setPublishPost: React.Dispatch<React.SetStateAction<string>> }) => {
  const loggedInUser = userAuth();
    return     <div className="md:col-span-2  bg-white shadow-2xl fixed z-[100] gap-2 top-[100px] w-[300px]  w-[30%]  md:right-[50px] right-[20px] rounded-[20px] p-2 py-[20px] hidden md:flex flex-col justify-center">
   {loggedInUser ? <ul className="flex flex-col gap-3 items-center ">
      <div className="flex flex-col border  rounded-[10px] py-[10px] px-[20px] items-center">
        <FaUserCircle className="text-[70px] bg-slate-50 rounded-full  " />
        <h1 className="text-[20px] font-bold">@Unknown Man</h1>
        <Link className="bg-sky-500  w-full text-center text-slate-50 rounded p-1" href='/my-profile'>Complet Profile</Link>
      </div>
    <Link href='/' className="text-slate-700 text-[20px] capitalize ">Home</Link>
      <Link href='/users' className="text-slate-700 text-[20px] capitalize ">Friends</Link>
      <Link href='/chat' className="text-slate-700 text-[20px] capitalize ">Chats</Link>
      <button onClick={() => setPublishPost('block')} type="button" className="text-slate-700 text-[20px] capitalize ">Make a post</button>
      <button className="flex text-[20px] mt-[20px] items-center"><IoMdLogOut /> <span className="text-slate-500">Logout</span></button>
    </ul> :  <ul className="flex flex-col gap-3 items-center ">
    <Link href='/' className="text-slate-700 text-[20px] capitalize ">Home</Link>
      <Link href='/login' className="flex text-[20px] mt-[20px] items-center"><IoMdLogOut /> <span className="text-slate-500">Login</span></Link>
    </ul>}
  </div>
}