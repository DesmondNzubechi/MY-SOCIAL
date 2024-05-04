
"use client";

import { FaUserCircle } from "react-icons/fa";

import { HiDotsHorizontal } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import './PostSkeleton.css'; // Import CSS file for styling
import { RiImageAddFill } from "react-icons/ri";

export const ConversationSkeletonLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(true);
      }, 2000);
  
      return () => clearTimeout(timer); 
    }, []);
    const user = {
        uid: 'ga43ynd63h8endy'
    }
    const messages: any[] = [
        {
            senderId : "ga43ynd63h8endy"
        },
        {
            senderId : "ga43ynd63h8endyu"
        },
        {
            senderId : "ga43ynd63h8endy"
        },
        {
            senderId : "ga43ynd63h8endyu"
        },
        {
            senderId : "ga43ynd63h8endy"
        },
        {
            senderId : "ga43ynd63h8endyu"
        }
    ]

    return    <div className="flex animate-skeleton-loading flex-col overflow-y-auto overflow-x-hidden h-[100vh] gap-y-[50px] px-[20px] relative bg-contain pt-[50px] justify-around w-full ">
    <div className="right-0 left-0 md:left-[48.8%] right-0 md:right-[0%] px-[20px] flex  items-center justify-between top-[70px]  gap-3 p-2 rounded fixed bg-slate-100 top-0">
            <div className="flex fixed md:left-[48.8%] right-0 top-[70px] md:right-[0%] p-2 justify-between right-0 left-0 bg-slate-50 w-full ">
        
            <div className="flex gap-2 items-center">
<FaUserCircle className="text-[50px] text-slate-200" />
            <h1 className="uppercase font-medium bg-slate-200 h-[30px] w-[200px] text-[20px] "></h1>
        </div>
        <HiDotsHorizontal  className="border text-[30px] text-slate-300 border-slate-200 p-1  rounded-full " />
        </div>
    <div className="flex  pb-[140px] pt-[100px] w-full items-center flex-col gap-y-[20px]">
        {
            messages?.map((chats: any) => {
                return <div  className={`flex items-center ${chats?.senderId !== user?.uid? "self-start" : "self-end" }   ${chats?.senderId !== user?.uid? "flex-row" : "flex-row-reverse" }  gap-2`}>
                    <FaUserCircle className="text-[50px] text-slate-200 " />

                   <p className={`  ${chats?.senderId !== user?.uid ? ' p-[20px] bg-slate-200 w-[250px] h-[50px] text-[20px] text-white rounded-tl-[10px] rounded-r-[15px]' : "p-[20px] bg-slate-200 w-[250px] text-[20px] h-[50px] text-white rounded-tr-[10px] rounded-l-[15px] "} `}></p> 
                  </div>
            })
    }
    
    </div>
    
    <form action=""  className="left-0 md:left-[48.8%] right-0 md:right-[0%]  flex gap-2 right-0 items-center p-2 rounded fixed bg-slate-100 bottom-0">
        <input type="text" name="" disabled placeholder="" className=" py-[10px] text-[20px] bg-slate-200 outline-none  w-full rounded " id="" />
        
        <label htmlFor="file">
        <RiImageAddFill className="text-[40px] text-slate-200 rounded-full    "/>
        </label>
        <button  className="bg-slate-200 py-[5px] shadow-2xl rounded-[7px] text-slate-50 text-[20px] h-[50px] w-[100px]  px-[20px]" type="button"></button>
</form>
</div>
        </div>
}