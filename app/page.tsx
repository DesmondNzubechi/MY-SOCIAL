"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import CoverPics from '../public/codes.jpg'
import { userAuth } from "./components/auths/auth";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import { FcAddImage } from "react-icons/fc";
export default function Home() {
  //const loggedInUser = userAuth();
  return (
    <main className="flex min-h-screen flex-col items-center  ">
      <div className="relative px-[20px]">
        <Image alt="cover pics" src={CoverPics} className="rounded" height={300} />
        <input type="file" onChange={(e) => {
                                     // setDp(e.target.files?.[0])
                                  }} name="image" className="hidden" id="image" />
                                  <label htmlFor="image" className="absolute bg-slate-50 rounded-full text-[30px] p-1 top-[40px] right-[50px] " >
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
        <div className="pt-[150px] flex flex-col gap-y-[20px]">
          <div>
            <h1 className="font-bold text-[20px] text-slate-900 uppercase">Desmond Nzubechukwu</h1>
            <p className="font-semibold text-slate-500">@Nzubechukwu(B2R)</p>
          </div>
          <div>
            <p>Frontend Software Developer | reactJs | NextJs | JavaScript | Typescript | Firebase | Tailwindcss | Crafting Value & Solutions | Sharing Insights in Software Development</p>
          </div>
          <div>
            
          </div>
        </div>
     </div>
    </main>
  );
}
