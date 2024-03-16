"use client"
import { FaUserCircle } from "react-icons/fa";

import { GoDotFill } from "react-icons/go";
import { allPostInfo } from "@/app/components/allPosts/allPost";
import Image from "next/image";
import { fullDate } from "../publishAPost/publishAPost";
import React, { useState } from "react";
import { userAuth } from "../auths/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";



export interface Quote {
  postImg: string
  postsContent: string,
  postId:string,
  postsDate: string,
  authorId: string,
  authorName: string,
  authorPics: string,
  postComment: any[],
  postLike: any[],
  postRepost: any[],
  id: string,
    reposterName: string,
    respotDate: string,
    reposterId: string,
}


export const QuoteREpost = ({ setShowQuoteRepost, data }: { setShowQuoteRepost: React.Dispatch<React.SetStateAction<boolean>>, data: allPostInfo}) => {
  const loggedInUser = userAuth();
  const [commentInput, setCommentInput] = useState<string>('');
  console.log("comment", commentInput)

  
  // Add useEffect to handle overflow when the component mounts and unmounts
  useEffect(() => {
    // On component mount
    document.body.style.overflow = 'hidden';

    // On component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const Repost = async () => {
    const postRef = doc(db, 'posts',  uuid())
try {
  await setDoc(postRef, {
    
  })
} catch (error) {
  
}
  }

    return (
        <div>
        <div className={`fixed  flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 h-full w-full bg-Tp z-[1000]`}>
          <div className="bg-slate-50 relative overflow-y-auto md:w-[700px] w-full md:h-[90vh] p-4   ">
            <div className="py-[20px] px-[20px] border rounded-[20px] mt-[40px] flex item-center gap-x-5">
              <input placeholder="Add Quote" className="bg-transparent p-[5px] text-[20px]  w-full outline-none" type="text" />
             <button className="bg-sky-500 text-slate-50 p-2 rounded">Repost</button>
            </div>
        <h1 onClick={() => setShowQuoteRepost(false)} className="uppercase text-white absolute z-[10] right-[5px] top-[10px] bg-slate-900 focus:bg-slate-500 cursor-pointer text-[20px] px-[12px] rounded-full py-[4px] ">X</h1>
          <div className=" p-2 gap-[20px] relative pb-[70px] flex-col flex">
            <div className="flex gap-1 flex-row items-center">
            <h1 className="font-bold flex  capitalize items-center ">  {data.authorPics !== '' ? <Image src={data.authorPics} height={50} width={50} className="rounded-full " alt="post pic" /> :  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />}@{data.authorName}</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">{data.postsDate}</p>
              </div>
            <div className="">
            <p>{data.postsContent}</p>
            
            </div>
            <Image src={data.postImg} height={400} width={500} className="w-full  " alt="post pic" />
          
                        </div>
                        </div>
</div>
      </div>
     
    )
}