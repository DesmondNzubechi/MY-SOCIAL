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
import { FullPost } from "./components/full post/fullPost";
export default function Home() {
  //const loggedInUser = userAuth();
  return (
    <main className="flex min-h-screen py-[20px] flex-col items-center  ">
      <div className="fixed hidden flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 h-full w-full bg-Tp z-[1000]">
        <div className="bg-slate-50 overflow-y-auto md:w-[700px] w-full md:h-[90vh] p-4 md:rounded-[10px]  ">
          <div className="flex justify-between items-center mb-[20px]">
            <h1 className="text-center font-bold capitalize  text-[20px]">Edit profile</h1>
            <h1 className="uppercase text-white bg-slate-900 focus:bg-slate-500 cursor-pointer text-[30px] px-[18px] rounded-full py-[5px] ">X</h1>
          </div>
          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="userName" className="font-bold">Useranme:</label>
              <hr />
              <input type="text" value='Nzubechukwu(B2R)' className="bg-transparent outline-none" placeholder="Username..."/>
            </div>
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="userName" className="font-bold">Bio:</label>
              <hr />
              <textarea  className="bg-transparent min-w-[300px] min-h-[200px] outline-none" placeholder="Bio">Frontend Software Developer | reactJs | NextJs | JavaScript | Typescript | Firebase | Tailwindcss | Crafting Value & Solutions | Sharing Insights in Software Development</textarea>
            </div>
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="userName" className="font-bold">❤️Favorite:</label>
              <hr />
              <input type="text" value='Coding' className="bg-transparent outline-none" placeholder="Favorite"/>
            </div>
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="location" className="font-bold">Location:</label>
              <hr />
              <input type="text" value='Nigeria' className="bg-transparent outline-none" placeholder="Location"/>
            </div>
          </form>
          <button className="bg-slate-900 mt-[20px] py-[15px]  w-full text-slate-50 rounded ">Update Profile</button>
</div>
      </div>
      <FullPost/>
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
          <div className="shadow-xl border  p-2 gap-[20px] rounded-[10px] flex-col flex">
            <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex items-center ">  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />@Nzubechukwu(B2R)</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">2nd March 2024</p>
            </div>
            <div className="">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <button type="button" className="font-bold">See More...</button>
            </div>
            <Image src={CoverPics} className="rounded-[10px] " alt="post pic" />
            <div className="flex items-center border-t border-b py-[5px] justify-around">
              <div className=" border-r flex items-center p-[5px] gap-x-[5px] "><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">20 Comments</p></div>
              <div className=" flex items-center p-[5px] gap-x-[5px] "><SlLike className="text-[20px] "/> <p className="text-slate-500">50 Likes</p></div>
              <div className=" flex items-center p-[5px] gap-x-[5px] border-l "><BiRepost className="text-[20px] " /><p className="text-slate-500">10 Repost</p></div>
            </div>
          
              <div className="py-[10px] w-full bg-slate-50 flex items-center justify-around px-[20px] gap-1">
                <input type="text" placeholder="Input your comment" className="w-full outline-none bg-transparent" />
                <button type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
              </div>
           
          </div>
        </div>
     </div>
    </main>
  );
}
