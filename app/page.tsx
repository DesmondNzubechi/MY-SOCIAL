"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import CoverPics from '../public/codes.jpg'
import { userAuth } from "./components/auths/auth";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosTime } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { FaCommentAlt } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { BiRepost } from "react-icons/bi";
export default function Home() {
  //const loggedInUser = userAuth();
  return (
    <main className="flex min-h-screen py-[20px] flex-col items-center  ">
      <div className="relative max-w-[500px] px-[20px]">
        <Image alt="cover pics" src={CoverPics} className="rounded w-full" height={200} />
        <input type="file" onChange={(e) => {
                                     // setDp(e.target.files?.[0])
                                  }} name="image" className="hidden" id="image" />
                                  <label htmlFor="image" className="absolute bg-slate-50 rounded-full text-[30px] p-1 top-[70px] right-[50px] " >
                                     <FaPlus className="bg-slate-"/>
                                  </label>
        <div className="absolute top-[200px] ">
        <div className="items-center flex relative">
                              
                              <FaUserCircle className="text-[200px] bg-slate-50 rounded-full shadow-2xl " />
                                  <input type="file" onChange={(e) => {
                                     // setDp(e.target.files?.[0])
                                  }} name="image" className="hidden" id="image" />
                                  <label htmlFor="image" className="absolute text-[50px] bottom-[10px] left-[150px] " >
                                      <FcAddImage className="bg-slate-"/>
                                  </label>
                                 </div>
        </div>
        <button className="absolute top-[300px] right-[30px] active:bg-slate-200 shadow-2xl border p-2 rounded-[5px] text-slate-700 text-[20px] ">Edit Profile</button>
        <div className="pt-[180px] flex flex-col gap-y-[20px]">
          <div>
            <h1 className="font-bold text-[20px] text-slate-900 capitalize">Desmond Nzubechukwu</h1>
            <p className="font-[500] text-slate-500">@Nzubechukwu(B2R)</p>
          </div>
          <div>
            <p>Frontend Software Developer | reactJs | NextJs | JavaScript | Typescript | Firebase | Tailwindcss | Crafting Value & Solutions | Sharing Insights in Software Development</p>
          </div>
          <div className="flex items-center gap-x-[20px] ">
            <span className="flex items-center gap-1 text-slate-500"><FaHeart  className="text-[20px]"/> <p className="capitalize">Coding</p></span>
            <span className="flex items-center gap-1 text-slate-500"><IoLocationSharp /> <p className="capitalize">Nigeria</p></span>
<span className="flex items-center gap-1 text-slate-500"><IoIosTime /> <p className="capitalize">Joined March 2024</p></span>
          </div>
        </div>

        <div className="py-[50px] ">
          <div className="shadow-2xl  p-2 gap-[20px] rounded-2xl flex-col flex">
            <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex items-center ">  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />@Nzubechukwu(B2R)</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">2nd March 2024</p>
            </div>
            <div className="">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <button type="button" className="font-bold">See More...</button>
            </div>
            <Image src={CoverPics} className="rounded-2xl " alt="post pic" />
            <div className="flex items-center justify-around">
              <div className="bg-slate-100 flex items-center p-[5px] gap-x-[5px] rounded"><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">20 Comments</p></div>
              <div className="bg-slate-100 flex items-center p-[5px] gap-x-[5px] rounded"><SlLike className="text-[20px] "/> <p className="text-slate-500">50 Likes</p></div>
              <div className="bg-slate-100 flex items-center p-[5px] gap-x-[5px] rounded"><BiRepost className="text-[20px] " /><p className="text-slate-500">10 Repost</p></div>
            </div>
          </div>
        </div>
     </div>
    </main>
  );
}
