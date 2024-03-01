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
     </div>
    </main>
  );
}
