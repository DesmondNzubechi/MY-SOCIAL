import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CoverPics from '../../public/cover pic.png'
import { userAuth } from "../../components/auths/auth";
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
import { FullPost } from "../../components/full post/fullPost";
import { SideBar } from "../../components/sidebar/sidebar";
import { EditProfile } from "../../components/editProfile/editProfile";
import { PublishAPost } from "../../components/publishAPost/publishAPost";
import { AllUser } from "../../components/allUser/allUser";
import { AllThePost } from "../../components/allPosts/allPost";
import { allPostInfo } from "../../components/allPosts/allPost";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { fullDate } from "../../components/publishAPost/publishAPost";
import { db, storage } from "../../components/config/firebase";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import 'react-toastify/ReactToastify.css';
//import { QuoteREpost } from "../quoteRepost/quoteRepost";
import { personalInfo } from "@/app/my-profile/page";
interface props {
    showFullPostFn: () => void,
} 
export const PostCard = ({post, setShowQuoteRepost, showFullPostFn, setFullPostData} : {post: allPostInfo | any, setShowQuoteRepost:React.Dispatch<React.SetStateAction<boolean>>, showFullPostFn: any, setFullPostData: React.Dispatch<React.SetStateAction<allPostInfo>>}) => {

    const allUser = AllUser();
  const loggedInUser = userAuth();
  const allPost = AllThePost();
  const [showFullPost, setShowFullPost] = useState<boolean>(false)
  const [showPublishPost, setPublishPost] = useState<string>('hidden')
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [userPost, setUserPost] = useState<any[]>([]);
  const [showRepost, setShowRepost] = useState<boolean>(false);
  //const [showQuoteRepost, setShowQuoteRepost] = useState<boolean>(false);
  const [myPost, setMyPost] = useState<any[]>([]);
  const [dp, setDp] = useState<File | any>(null);
  const [userCoverPics, setUserCoverPics] = useState<File | any>(null);
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
  
    const [commentInput, setCommentInput] = useState<string>('');
    
  const likePost = async (post: allPostInfo) => {
    if (!loggedInUser) {
      const notification = () => toast("Kindly login before you can like this post");
      notification();
      return;
    }
    const postRef = doc(db, 'posts', post.id)
    try {
      const likeStatus = post.postLike.find(like => like.likeId === loggedInUser?.uid);
      const addLike = post.postLike.filter(like => like.likeId !== loggedInUser?.uid)
     
        if (likeStatus) {
          await updateDoc(postRef, {
            postLike: [...addLike]
          })
          const notification = () => toast("You unliked this post");
          notification();
        } else {
          await updateDoc(postRef, {
            postLike: [...post.postLike, {likeId: loggedInUser?.uid, likeName: loggedInUser?.displayName}]
          })
          const notification = () => toast("You liked this post");
          notification();
        }
} catch (error) {
  console.log(error)
}
  }

  const Repost = async (post: allPostInfo) => {
    if (!loggedInUser) {
      const notification = () => toast('Kindly login before you can repost');
      notification();
      return;
    } 
    const postRef = doc(db, 'posts', uuid())
try {
  await setDoc(postRef, {
    postImg: post.postImg,
    postsContent:post.postsContent,
    postId: uuid(),
    postsDate: post.postsDate,
    authorId: post.authorId,
    authorName: post.authorName,
    authorPics: post.authorPics,
    postComment: [],
    postLike: [],
    postRepost: post.postRepost,
    reposterName: loggedInUser?.displayName,
    reposterPics: loggedInUser?.photoURL,
    respotDate: fullDate,
    reposterId: loggedInUser?.uid
  })
  const notification = () => toast('succesfully reposted');
  notification();
  setShowRepost(false);
} catch (error) {
  alert("an error occured")
}
  }


  
  const addCommentfn = async (post: allPostInfo) => {
    if (!loggedInUser) {
      const notification = () => toast("Kindly login before you can comment on this post");
          notification();
      return;
    }
    if (commentInput === '') {
      const notification = () => toast('Kindly input your comment');
      notification();
      return;
    }
  
    try {
      const commentRef = doc(db, 'posts', post?.id);
      
     
      const updatedComments = Array.isArray(post.postComment) 
        ? [{ commentDate: fullDate, commenterName: loggedInUser?.displayName, commenterPic: loggedInUser?.photoURL, commentContent: commentInput }, ...post.postComment]
        : [{ commentDate: fullDate, commenterName: loggedInUser?.displayName, commenterPic: loggedInUser?.photoURL, commentContent: commentInput }];
  
      await updateDoc(commentRef, {
        postComment: updatedComments
      });
      const notification = () => toast("You commented to this post")
      notification();
    } catch (error) {
      const notification = () => toast("An error occured")
      notification();
    }
    }
    
    const postContents = post.postsContent.split(' ');
    const tobeDisplayed = postContents.slice(0, 20).join(' ');

    return <div key={post.postId} className="shadow-xl border bg-white relative  p-2 gap-[20px] rounded-[10px] flex-col flex">
    {  post?.reposterName &&  <div className="bg-slate-100 p-2">
              <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex  capitalize items-center ">  {(post?.reposterPics !== '' || post?.reposterPics) ? <Image src={post?.reposterPics} height={50} width={50} className="rounded-full md:w-[50px] w-[30px] " alt="post pic" /> :  <FaUserCircle className="md:text-[30px] text-[15px] bg-slate-50 rounded-full shadow-2xl " />} <span className="text-[10px] md:text-[20px]"> @{post.reposterName} </span> </h1> <span className="text-slate-500 md:text-[20px] text-[10px] ">Reposted</span> <GoDotFill/> <p className="text-slate-500 text-[7px] md:text-[10px]">{post.respotDate}</p>
              </div>
                    <p className="text-slate-700 text-[12px] md:text-[15px] mb-[10px]">{post?.repostThought}</p>
              
                  </div>}
   <div className="flex gap-1 flex-row items-center">
       <h1 className="font-bold flex  capitalize items-center ">  {post.authorPics !== '' ? <Image src={post.authorPics} height={50} width={50} className="rounded-full md:w-[50px] w-[30px]" alt="post pic" /> :  <FaUserCircle className="md:text-[30px] text-[15px] bg-slate-50 rounded-full shadow-2xl " />} <span className="md:text-[20px] text-[10px]">@{post.authorName}</span> </h1> <span className="text-slate-500 md:text-[15px] text-[12px] ">posted</span> <GoDotFill/> <p className="text-slate-500 md:text-[12px] text-[7px]">{post.postsDate}</p>
   </div>
   <div className="">
       <p className="text-[10px] md:text-[15px]">{ tobeDisplayed }</p>
     {postContents.length > 20 && <button
       onClick={() => {
         showFullPostFn();
         setFullPostData({
           postImg: post.postImg,
           postsContent: post.postsContent,
           postId:post.postId,
           postsDate: post.postsDate,
           authorId: post.authorId,
           authorName: post.authorName,
           authorPics: post.authorPics,
           postComment: [...post.postComment],
           postLike: post.postLike,
           postRepost:post.postRepost,
           id:post.id,
         })
       }}
       type="button"
       className="font-bold text-[12px] md:text-[15px]">See More...
     </button>}
   </div>
   <Image src={post.postImg} width={300} height={300} className="rounded-[10px] w-full " alt="post pic" />
   <div className="flex items-center border-t border-b py-[5px] justify-around">
        <div onClick={() => {
            showFullPostFn();
            setFullPostData({
              postImg: post.postImg,
              postsContent: post.postsContent,
              postId:post.postId,
              postsDate: post.postsDate,
              authorId: post.authorId,
              authorName: post.authorName,
              authorPics: post.authorPics,
              postComment: [...post.postComment],
              postLike: post.postLike,
              postRepost:post.postRepost,
              id:post.id,
            })
     }} className=" border-r flex items-center cursor-pointer p-[5px] gap-x-[5px] "><FaCommentAlt className="md:text-[20px] text-[15px] "/> <p className="text-slate-500 md:text-[15px] text-[12px]">{post.postComment.length} Comments</p></div>
       <div onClick={() => likePost(post)} className={` flex items-center p-[5px] cursor-pointer gap-x-[5px] ${post.postLike.find((like:any) => like.likeId === loggedInUser?.uid) ? 'text-sky-700 ' : 'text-slate-500'}  `}><SlLike className="md:text-[20px] text-[15px]" /> <p
         className={post.postLike.find((like: any) => like.likeId === loggedInUser?.uid) ? 'text-sky-700 md:text-[15px] text-[12px] ' : 'text-slate-500 md:text-[15px] text-[12px]'  }>{post.postLike.length} Likes</p></div>
       <div onClick={() => showRepost? setShowRepost(false) : setShowRepost(true)} className=" flex items-center p-[5px] cursor-pointer gap-x-[5px] border-l "><BiRepost className="md:text-[20px] text-[15px] " /><p className="text-slate-500 md:text-[15px] text-[12px]">{post?.postRepost?.length} Repost</p></div>
       {showRepost && <div className="absolute flex flex-col bg-slate-50 gap-2 p-2 items-start rounded border  bottom-[135px]  right-0 ">
         <button
           onClick={() => {
            Repost(post)
           }}
           className=" text-slate-700 text-[15px] flex flex-row items-center gap-x-1"><BiRepost className="text-[20px] "/> Instant Repost
         </button>
         <button  onClick={() => {
             setShowQuoteRepost(true);
             setFullPostData({
               postImg: post.postImg,
               postsContent: post.postsContent,
               postId:post.postId,
               postsDate: post.postsDate,
               authorId: post.authorId,
               authorName: post.authorName,
               authorPics: post.authorPics,
               postComment: [...post.postComment],
               postLike: post.postLike,
               postRepost:post.postRepost,
               id:post.id,
             })
           }} className="text-slate-700 text-[15px]  flex flex-row items-center gap-x-1"><FaEdit className="text-[20px] "/> Repost with you thought</button>
       </div>}
   </div>
 
     <div className="py-[10px] w-full bg-slate-50 flex items-center justify-around px-[20px] gap-1">
       <input onChange={(e) => setCommentInput(e.target.value)} type="text" placeholder="Input your comment" className="w-full outline-none bg-transparent" />
       <button onClick={() => addCommentfn(post)} type="button" className="bg-sky-500 p-2 rounded md:text-[15px] text-[12px] text-slate-50">Comment</button>
     </div>
  
 </div>
}