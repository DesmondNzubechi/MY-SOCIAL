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
import { AllUser } from "../../components/allUser/allUser";
import { AllThePost } from "../../components/allPosts/allPost";
import { allPostInfo } from "../../components/allPosts/allPost";
import { doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { fullDate } from "../../components/publishAPost/publishAPost";
import { db, storage } from "../../components/config/firebase";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import 'react-toastify/ReactToastify.css';
import { HiDotsHorizontal } from "react-icons/hi";
//import { QuoteREpost } from "../quoteRepost/quoteRepost";
import { personalInfo } from "@/app/my-profile/page";
interface props {
    showFullPostFn: () => void,
} 
export const PostCard = ({post, setShowQuoteRepost, showFullPostFn, setFullPostData} : {post: allPostInfo | any, setShowQuoteRepost:React.Dispatch<React.SetStateAction<boolean>>, showFullPostFn: any, setFullPostData: React.Dispatch<React.SetStateAction<allPostInfo>>}) => {

    const allUser = AllUser();
  const loggedInUser = userAuth();
  const allPost = AllThePost();
  const [showRepost, setShowRepost] = useState<boolean>(false);
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

  
  const getUserProfile = () => {
    const findUser = allUser.find((profile: any) => {
      return profile.userID === loggedInUser?.uid
    })
    setUserPersonalInfo(findUser);
  }

  useEffect(() => {
    getUserProfile();
  }, [allPost, loggedInUser, showRepost])
  
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
       
        } else {
          await updateDoc(postRef, {
            postLike: [...post.postLike, {likeId: loggedInUser?.uid, likeName: loggedInUser?.displayName}]
          })
        
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
const originalPostRef = doc(db, "posts", post.id)
    try {
      await updateDoc(originalPostRef, {
        postRepost: [...post.postRepost, {
          reposterName: userPersonalInfo?.username,
          reposterPics: userPersonalInfo?.userPic,
          respotDate: fullDate,
          reposterId: loggedInUser?.uid
    }]
  })
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
    reposterName: userPersonalInfo?.username,
    reposterPics: userPersonalInfo?.userPic,
    respotDate: fullDate,
    reposterId: loggedInUser.uid
  })
  const notification = () => toast('succesfully reposted');
  notification();
  setShowRepost(false);
} catch (error) {
  toast.error("An error occured, Try again.", {
    hideProgressBar: true,
    closeOnClick: true,
    autoClose: 5000,
    pauseOnHover: true
  })
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
    
    } catch (error) {
      const notification = () => toast("An error occured")
      notification();
    }
    }
    
    const postContents = post.postsContent.split(' ');
    const tobeDisplayed = postContents.slice(0, 20).join(' ');
  const [deletePostState, setDeletePostState] = useState<boolean>(false);

  const deletePostFn = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post")
    if (!confirmDelete) {
      return;
    }
    const postRef = doc(db, 'posts' , post.id)
    try {

      await deleteDoc(postRef);
      setDeletePostState(false);
      toast.success("Post Deleted Successfully", {
        autoClose: 500,
        position: "top-center",
      })
    } catch (error) {
      toast.error("An error occured, please try again", {
        autoClose: 500,
        position: "top-center",
      })
    }
  }

    return <div key={post.postId} className="border bg-white relative  py-[20px] px-[15px] gap-[20px] md:rounded-[10px] w-full flex-col flex">
    {  post?.reposterName && <div> <div className="bg-white p-2">
              <div className="flex gap-1 relative flex-row items-center">
          <h1 className="font-bold flex  capitalize items-center ">  {(post?.reposterPics !== '' || post?.reposterPics) ? <Link href={`/users/${post.reposterId}`}><Image src={post?.reposterPics} height={50} width={50} className="rounded-full h-[30px] w-[30px] " alt="post pic" /></Link> : <Link href={`/users/${post.reposterId}`}><FaUserCircle className="text-[15px] bg-slate-50 rounded-full shadow-2xl " /></Link>} <Link href={`/users/${post.reposterId}`}><span className="text-[10px] "> @{post.reposterName} </span></Link> </h1> <span className="text-slate-500  text-[10px] ">reposted</span> <GoDotFill className="text-[10px]" /> <p className="text-slate-500 text-[7px]">{post.respotDate}</p>
          {(loggedInUser?.uid === post.reposterId) && <HiDotsHorizontal
          onClick={() => {
deletePostState? setDeletePostState(false) :setDeletePostState(true)
          }}
          className="border text-[30px] focus:text-slate-500 absolute right-0 cursor-pointer justify-self-end border-slate-900 p-1  rounded-full "
        />}
       {(deletePostState && loggedInUser?.uid === post.reposterId) &&  <div className="absolute p-[10px] hover:bg-red-900 text-slate-50 right-[35px] rounded shadow top-[-5px]  bg-red-500">
          <button onClick={() => deletePostFn(post?.postId)}>Delete Post</button>
        </div>}
              </div>
                    <p className="text-slate-700 text-[12px] md:text-[15px] mb-[10px]">{post?.repostThought}</p>
              
      </div> <hr /></div>} 
      <div className="flex justify-between items-center relative">
      <div className="flex gap-1 flex-row items-center">
       <h1 className="font-bold flex justify-center capitalize items-center ">  {post.authorPics !== '' ? <Link href={`/users/${post?.authorId}`}><Image src={post.authorPics} height={50} width={50} className="rounded-full  w-[30px]" alt="post pic" /></Link> : <Link href={`/users/${post.authorId}`}><FaUserCircle className=" text-[15px] bg-slate-50 rounded-full shadow-2xl " /></Link>} <Link href={`/users/${post.authorId}`}><span className=" text-[10px]">@{post.authorName}</span></Link> </h1>  <GoDotFill className="text-[10px] self-center "/> <p className="text-slate-500 self-center text-[7px]">{post.postsDate}</p>
        </div>
       {(loggedInUser?.uid === post.authorId ) && <HiDotsHorizontal
          onClick={() => {
deletePostState? setDeletePostState(false) :setDeletePostState(true)
          }}
          className="border text-[30px] focus:text-slate-500 cursor-pointer justify-self-end border-slate-900 p-1  rounded-full "
        />}
       {(deletePostState && loggedInUser?.uid === post.authorId) &&  <div className="absolute p-[10px] hover:bg-red-900 text-slate-50 right-[35px] rounded shadow top-[-5px]  bg-red-500">
          <button onClick={() => deletePostFn(post?.postId)}>Delete Post</button>
        </div>}
      </div>
   
   <div className="">
       <p className="text-[10px] ">{ tobeDisplayed }</p>
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
     }} className="flex items-center cursor-pointer p-[5px] gap-x-[5px] "><FaCommentAlt className="md:text-[20px] text-[15px] "/> <p className="text-slate-500 md:text-[15px] text-[12px]">{post.postComment.length} Comments</p></div>
       <div onClick={() => likePost(post)} className={` flex items-center p-[5px] cursor-pointer gap-x-[5px] ${post.postLike.find((like:any) => like.likeId === loggedInUser?.uid) ? 'text-sky-700 ' : 'text-slate-500'}  `}><SlLike className="md:text-[20px] text-[15px]" /> <p
         className={post.postLike.find((like: any) => like.likeId === loggedInUser?.uid) ? 'text-sky-700 md:text-[15px] text-[12px] ' : 'text-slate-500 md:text-[15px] text-[12px]'  }>{post.postLike.length} Likes</p></div>
       <div onClick={() => showRepost? setShowRepost(false) : setShowRepost(true)} className=" flex items-center p-[5px] cursor-pointer gap-x-[5px]  "><BiRepost className="md:text-[20px] text-[15px] " /><p className="text-slate-500 md:text-[15px] text-[12px]">{post?.postRepost?.length} Repost</p></div>
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
 
     <div className="py-[10px] w-full bg-white border rounded-[10px] flex items-center justify-around px-[20px] gap-1">
       <input onChange={(e) => setCommentInput(e.target.value)} type="text" placeholder={loggedInUser? `Comment as ${loggedInUser?.displayName}` : " Kindly Login"} className="w-full text-[10px] outline-none bg-transparent" />
       <button onClick={() => addCommentfn(post)} type="button" className="bg-sky-500 p-2 rounded md:text-[15px] text-[10px] text-slate-50">Comment</button>
     </div>
  
 </div>
}