"use client"
import { FaUserCircle } from "react-icons/fa";
import CoverPics from '../../../public/codes.jpg';
import { FaCommentAlt } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { BiRepost } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { allPostInfo } from "@/app/components/allPosts/allPost";
import Image from "next/image";
import { fullDate } from "../publishAPost/publishAPost";
import React, { useState } from "react";
import { userAuth } from "../auths/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect } from "react";
export const FullPost = ({ setShowFullPost, data, postComment, setFullPostData }: { setShowFullPost: React.Dispatch<React.SetStateAction<boolean>>, data: allPostInfo, postComment: any[], setFullPostData: React.Dispatch<React.SetStateAction<allPostInfo>> }) => {
  const loggedInUser = userAuth();
  const [commentInput, setCommentInput] = useState<string>('');
  console.log("comment", commentInput)
  console.log("post id", data.id)

  
  // Add useEffect to handle overflow when the component mounts and unmounts
  useEffect(() => {
    // On component mount
    document.body.style.overflow = 'hidden';

    // On component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


  // const addComment = async () => {
  //   if (!loggedInUser) {
  //     alert('Kindly login');
  //     return;
  //   }
  //   if (commentInput === '') {
  //     alert('kindly input you comment');
  //     return;
  //   }
   
  //   try {
  //     const commentRef = doc(db, 'posts', data?.id);
  //     await updateDoc(commentRef, {
  //       postComment: [{
  //         commentDate: 'ggf',
  //         commenterName: loggedInUser?.displayName,
  //         commenterPic: loggedInUser?.photoURL,
  //         commentContent: commentInput
  //       }, ...data.postComment]
  //     })
  //     alert('success');
  //   } catch (error) {
  //     alert(error)
  //   }
  // }

  const addComment = async () => {
    if (!loggedInUser) {
      alert('Kindly login');
      return;
    }
    if (commentInput === '') {
      alert('Kindly input your comment');
      return;
    }
  
    try {
      const commentRef = doc(db, 'posts', data?.id);
      
      // Check if data.postComment is an array
      const updatedComments = Array.isArray(data.postComment) 
        ? [{ commentDate: fullDate, commenterName: loggedInUser?.displayName, commenterPic: loggedInUser?.photoURL, commentContent: commentInput }, ...data.postComment]
        : [{ commentDate: fullDate, commenterName: loggedInUser?.displayName, commenterPic: loggedInUser?.photoURL, commentContent: commentInput }];
  
      await updateDoc(commentRef, {
        postComment: updatedComments
      });
  
      setFullPostData({...data, postComment: [{ commentDate: fullDate, commenterName: loggedInUser?.displayName, commenterPic: loggedInUser?.photoURL, commentContent: commentInput }, ...data.postComment]})
      alert('Success');
    } catch (error) {
      alert(error);
    }
  }
  

    return (
        <div>
        <div className={`fixed  flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 h-full w-full bg-Tp z-[1000]`}>
        <div className="bg-slate-50 relative overflow-y-auto md:w-[700px] w-full md:h-[90vh] p-4   ">
        <h1 onClick={() => setShowFullPost(false)} className="uppercase text-white absolute z-[10] right-[5px] top-[10px] bg-slate-900 focus:bg-slate-500 cursor-pointer text-[20px] px-[12px] rounded-full py-[4px] ">X</h1>
          <div className=" p-2 gap-[20px] relative pb-[70px] flex-col flex">
            <div className="flex gap-1 flex-row items-center">
            <h1 className="font-bold flex  capitalize items-center ">  {data.authorPics !== '' ? <Image src={data.authorPics} height={50} width={50} className="rounded-full " alt="post pic" /> :  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />}@{data.authorName}</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">{data.postsDate}</p>
              </div>
            <div className="">
            <p>{data.postsContent}</p>
            
            </div>
            <Image src={data.postImg} height={400} width={500} className="w-full  " alt="post pic" />
            <div className="flex items-center border-t border-b bg-slate-50 py-[10px] justify-around">
              <div className=" flex items-center p-[5px] gap-x-[5px] rounded"><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">{data.postComment.length} Comments</p></div>
              <div className=" flex items-center p-[5px] gap-x-[5px] rounded"><SlLike className="text-[20px] "/> <p className="text-slate-500">{data.postLike.length} Likes</p></div>
              <div className=" flex items-center p-[5px] gap-x-[5px] rounded"><BiRepost className="text-[20px] " /><p className="text-slate-500">{data.postRepost} Repost</p></div>
                        </div>
                        {/* COMMENTS UNDER POST */}
                        <div className="flex flex-col gap-5">
                <h1 className="font-bold text-slate-700 text-[30px] my-[20px] border-b w-fit">Comments section</h1>
              {postComment.length == 0 ? <h1 className="capitalize text-slate-500 text-[20px] text-center ">There is no comment under this post. be the first person to comment</h1>: 
                  postComment?.map((comment, index) => {
                    const { commenterName, commentDate, commentContent, commenterPic } = comment;
                    console.log("comments data", comment)
                    return  <div key={index} className="flex flex-start gap-1">
                    <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />
                    <div clasName='flex flex-col gap-1 bg-slate-200 rounded-bl-[20px]  rounded-r-[20px] p-3'>
                <div className="flex gap-1 flex-row items-center">
                          <h1 className="font-bold flex items-center "> @{commenterName}</h1> <span className="text-slate-500 text-[10px] ">Commented</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">{commentDate}</p>
    </div>
    <p>{commentContent}</p>
  </div>
                    </div>
                  })
                 
              }
                      
                          
                            
                        </div>
                      
                        {/* ADD YOUR COMMENTS */}
                        <div className="bg-slate-50 bottom-0 md:left-[24%] md:right-[24%] fixed left-0 right-0 border-t md:bottom-[20px] p-2">
                        <div className="py-[10px] w-full bg-white flex items-center justify-around px-[20px] gap-1">
                <input type="text" onChange={(e) => setCommentInput(e.target.value)} placeholder="Input your comment" className="w-full outline-none bg-transparent" />
                <button onClick={addComment} type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
                            </div>
                      </div>
                        </div>
                        </div>
</div>
      </div>
     
    )
}