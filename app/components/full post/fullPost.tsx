"use client"
import { FaUserCircle } from "react-icons/fa";
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
import 'react-toastify/ReactToastify.css';
import { toast } from "react-toastify";
import Link from "next/link";
import { AllUser } from "../allUser/allUser";
import { personalInfo } from "@/app/my-profile/page";

export const FullPost = ({ setShowFullPost, postRepost, data, postComment, setFullPostData }: { setShowFullPost: React.Dispatch<React.SetStateAction<boolean>>, data: allPostInfo, postComment: any[], postRepost:any[], setFullPostData: React.Dispatch<React.SetStateAction<allPostInfo>> }) => {
  const loggedInUser = userAuth(); 
  const allUser = AllUser();
  const [commentInput, setCommentInput] = useState<string>('');
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
    getUserProfile();
  }, [allUser, loggedInUser])
  
  // Add useEffect to handle overflow when the component mounts and unmounts
  useEffect(() => {
    // On component mount
    document.body.style.overflow = 'hidden';

    // On component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


  const addComment = async () => {
    if (!loggedInUser) {
      toast.info("Kindly login before adding a comment", {
        hideProgressBar: true,
     });
      return;
    }
    if (commentInput === '') {
      
      toast.info("Kindly input your comment", {
        hideProgressBar: true,
        autoClose: 500,
        position: "top-center"
     });
      return;
    }
  
    try {
      const commentRef = doc(db, 'posts', data?.id);
      
      // Check if data.postComment is an array
      const updatedComments = Array.isArray(data.postComment) 
        ? [{ commentDate: fullDate, commenterName: userPersonalInfo?.username, commenterPic: userPersonalInfo?.userPic, commentContent: commentInput, commenterId: userPersonalInfo?.userID }, ...data.postComment]
        : [{ commentDate: fullDate, commenterName: userPersonalInfo?.username, commenterPic: userPersonalInfo?.userPic, commentContent: commentInput, commenterId: userPersonalInfo?.userID }];
  
      await updateDoc(commentRef, {
        postComment: updatedComments
      });

      setFullPostData({ ...data, postComment: [{ commentDate: fullDate, commenterName: userPersonalInfo?.username, commenterPic: userPersonalInfo?.userPic, commentContent: commentInput, commenterId: userPersonalInfo?.userID }, ...data.postComment] })
      setCommentInput('');
      toast.success("You added a new comment", {
        autoClose: 500
     })
    } catch (error) {
      toast.error("An error occured, please try again.", {
        hideProgressBar: true,
        autoClose: 500
      })
    }
  }
  
    
  const likePost = async (data: allPostInfo) => {
    if (!loggedInUser) {
      toast.info("Kindly login before you can like this post", {
        hideProgressBar: true,
     });
      return;
    }
    const postRef = doc(db, 'posts', data.id)
    try {
      const likeStatus = data.postLike.find(like => like.likeId === loggedInUser?.uid);
      const addLike = data.postLike.filter(like => like.likeId !== loggedInUser?.uid)
     
        if (likeStatus) {
          await updateDoc(postRef, {
            postLike: [...addLike]
            
          })
          setFullPostData({ ...data, postLike: [...addLike]})
      
          toast.info("You Unliked this post", {
            hideProgressBar: true,
         });
        } else {
          await updateDoc(postRef, {
            postLike: [...data.postLike, {likeId: loggedInUser?.uid, likeName: loggedInUser?.displayName}]
          })
          setFullPostData({ ...data, postLike: [...data.postLike, {likeId: loggedInUser?.uid, likeName: loggedInUser?.displayName}]})
      
          toast.success("You liked this post", {
            hideProgressBar: true,
         });
        }
} catch (error) { 
      toast.error("An error occured, please try again.", {
   hideProgressBar: true
 })
}
  }

    return (
        <div>
        <div className={`fixed  flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 h-full w-full bg-Tp z-[1000]`}>
        <div className="bg-slate-50 relative overflow-y-auto md:w-[700px] w-full h-full md:h-[90vh] p-4   ">
        <h1 onClick={() => setShowFullPost(false)} className="uppercase text-white fixed z-[10] right-[35px] md:right-[450px] md:top-[50px] top-[10px] bg-slate-900 focus:bg-slate-500 hover:bg-red-500 cursor-pointer text-[20px] px-[12px] rounded-full py-[4px] ">X</h1>
          <div className=" p-2 gap-[20px] relative pb-[70px] flex-col flex">
            <div className="flex gap-1 flex-row items-center">
            <h1 className="font-bold flex  capitalize items-center ">  {data.authorPics !== '' ? <Link href={`/users/${data.authorId}`}><Image src={data.authorPics} height={50} width={50} className="rounded-full w-[30px] md:w-[50px] " alt="post pic" /></Link> : <Link href={`/users/${data.authorId}`}><FaUserCircle className="md:text-[30px] text-[20px] bg-slate-50 rounded-full shadow-2xl " /></Link>} <Link href={`/users/${data.authorId}`} className="md:text-[15px] text-[10px] ">@{data.authorName}</Link> </h1> <span className="text-slate-500 text-[8px] md:text-[12px] ">posted</span> <GoDotFill className="text-[10px] "/> <p className="text-slate-500 text-[8px] md:text-[12px]">{data.postsDate}</p>
              </div>
            <div className="">
            <p className="text-[10px] md:text-[15px] ">{data.postsContent}</p>
            
            </div>
            <Image src={data.postImg} height={400} width={500} className="w-full  " alt="post pic" />
            <div className="flex items-center border-t border-b bg-slate-50 py-[10px] justify-around">
              <div className=" flex items-center p-[5px] gap-x-[5px] rounded"><FaCommentAlt className="md:text-[20px] text-[12px] "/> <p className="text-slate-500 text-[10px] md:text-[15px]">{data.postComment.length} Comments</p></div>
              <div onClick={() => likePost(data)} className="cursor-pointer flex items-center p-[5px] gap-x-[5px] rounded"><SlLike className="md:text-[20px] text-[12px] "/> <p className="text-slate-500 text-[10px] md:text-[15px]">{data.postLike.length} Likes</p></div>
              <div className=" flex items-center p-[5px] gap-x-[5px] rounded"><BiRepost className="md:text-[20px] text-[12px]" /><p className="text-slate-500 text-[10px] md:text-[15px]">{data.postRepost.length} Repost</p></div>
                        </div>
                        {/* COMMENTS UNDER POST */}
                        <div className="flex flex-col gap-5">
                <h1 className="font-bold text-slate-700 md:text-[20px] text-[15px] md:text-[20px] border-b w-full text-center">Comments section</h1>
              {postComment.length == 0 ? <h1 className="capitalize text-slate-500 text-[15px] my-[20px] text-center ">There is no comment under this post. be the first person to comment</h1>: 
                  postComment?.map((comment, index) => {
                    const { commenterName, commentDate, commentContent, commenterPic, commenterId } = comment;
                    console.log("comments data", comment)
                    return  <div key={index} className="flex flex-start gap-1">
                   {commenterPic? <Link href={`/users/${commenterId}`}><Image src={commenterPic} height={50} width={50} className="rounded-full h-[30px] md:h-[50px] w-[30px] md:w-[50px] " alt="post pic" /></Link> : <Link href={`/users/${commenterId}`}>  <FaUserCircle className="md:text-[50px] text-[30px] bg-slate-50 rounded-full shadow-2xl " /></Link>}
                    <div className='flex flex-col gap-1 bg-slate-200 rounded-bl-[20px]  rounded-r-[20px] p-3'>
                <div className="flex gap-1 flex-row items-center">
                          <h1 className="font-bold text-[10px] md:text-[15px] flex items-center "> <Link href={`/users/${commenterId}`}> @{commenterName} </Link></h1>  <GoDotFill className="text-[10px]"/> <p className="text-slate-500 text-[8px] md:text-[10px]">{commentDate}</p>
    </div>
    <p className="text-[10px] md:text-[15px]">{commentContent}</p>
  </div>
                    </div>
                  })
                 
              }
       
                        </div>
                        {/* ADD YOUR COMMENTS */}
                        <div className="bg-slate-50 bottom-0 md:left-[25.9%] md:right-[25.9%] fixed left-0 right-0 border-t md:bottom-[20px] p-2">
                        <div className="py-[10px] w-full bg-white flex items-center justify-around px-[20px] gap-1">
                <input type="text" onChange={(e) => setCommentInput(e.target.value)} placeholder={loggedInUser? `Comment as ${loggedInUser?.displayName}` : " Kindly Login"} value={commentInput} className="w-full outline-none bg-transparent" />
                <button onClick={addComment} type="button" className="bg-sky-500 p-2 text-[12px] md:text-[15px] rounded text-slate-50">Comment</button>
                            </div>
                      </div>
                        </div>
                        </div>
</div>
      </div>
     
    )
}