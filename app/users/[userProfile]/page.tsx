"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import CoverPics from '../../../public/cover pic.png'
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
import { doc, updateDoc, setDoc, collection, onSnapshot, getDoc } from "firebase/firestore";
//import { fullDate } from "../../components/publishAPost/publishAPost";
import { db } from "../../components/config/firebase";
import { v4 as uuid } from "uuid";

import 'react-toastify/ReactToastify.css';
import { PublishAPostSideBar } from "../../components/publishAPostSidebar/publishAPostSideBar";
import { ProfileSkeleton } from "../../components/SkeletonLoader/ProfileSkeleton";
import { SideBarSkeleton } from "../../components/SkeletonLoader/SidebarSkeleton";
import { PublishAPostSideBarSkeleton } from "../../components/SkeletonLoader/PublishApostSkeleton";

import { redirect, useRouter } from "next/navigation";
import { PostCard } from "@/app/components/postCard/postCard";
import { QuoteREpost } from "@/app/components/quoteRepost/quoteRepost";
import Login from "@/app/login/page";
 const currentDate = new Date();
 const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long', // 'short' for abbreviated name, 'long' for full name
  day: 'numeric',
  weekday: 'long', // 'short' for abbreviated name, 'long' for full name
};

     const fullDate = currentDate.toLocaleString(undefined, options);

interface personalInfo {
    userID: string,
    fullname: string,
    useremail: string,
    userPic: string,
    coverPic: string,
    username: string,
    bio: string,
    location: string,
    favorite: string,
    dateJoined: string
  }

export default function UserProfile({params}: {params: {userProfile: string}}) {
  const allUser = AllUser();
  const loggedInUser = userAuth();
  const allPost = AllThePost();
  const [showFullPost, setShowFullPost] = useState<boolean>(false)
  const [showPublishPost, setPublishPost] = useState<string>('hidden')

  const [showRepost, setShowRepost] = useState<boolean>(false);
  const [showQuoteRepost, setShowQuoteRepost] = useState<boolean>(false);
  const [myPost, setMyPost] = useState<any[]>([]);
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
  const [fullPostdata, setFullPostData] = useState<allPostInfo>({
    postImg: '',
    postsContent: '',
    postId:'',
    postsDate: '',
    authorId: '',
    authorName: '',
    authorPics: '',
    postComment: [],
    postLike: [],
    postRepost: [],
    id: ''
  })
 
  const showFullPostFn = () => {
setShowFullPost(true)
  }
  
  const getUserPost = () => {
    const filterPost = allPost.filter((post: any) => {
      return post.authorId === params.userProfile
    })
    setMyPost(filterPost);
  }

  const getUserProfile = () => {
    const findUser = allUser.find((profile: any) => {
      return profile.userID === params.userProfile
    })
    setUserPersonalInfo(findUser);
  }

  useEffect(() => {
    getUserProfile();
  }, [allPost, loggedInUser])

  useEffect(() => {
    getUserPost();
  }, [allPost, loggedInUser])



  // useEffect(() => {
  //  if (!loggedInUser) {
  //     const timeoutId = setTimeout(() => {
  //       redirect("/login");
  //     }, 5000);
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, []);

  const findLoggedInUser = allUser.find((me: personalInfo) => {
    return me.userID === loggedInUser?.uid
  });
const combinedId = findLoggedInUser?.userID > userPersonalInfo?.userID ?
  findLoggedInUser?.userID + userPersonalInfo?.userID :
  userPersonalInfo?.userID + findLoggedInUser?.userID;

  const startChat = async () => {
    try { 
      const findLoggedInUser = allUser.find((me: personalInfo) => {
        return me.userID === loggedInUser?.uid
      });
    const combinedId = findLoggedInUser.userID > userPersonalInfo.userID ?
      findLoggedInUser.userID + userPersonalInfo.userID :
      userPersonalInfo.userID + findLoggedInUser.userID;
    
    const docRef = doc(db, 'chats', combinedId);
    const res = await getDoc(docRef);
    if (!res.exists()) {
      await setDoc(docRef,
        {
          message: [],
          firstUser: findLoggedInUser,
          secondUser: userPersonalInfo,
          lastMessage: { message: "Start New Chat", messageDate: fullDate, messageId:uuid() }
        });
    }
    } catch (error) {
      alert(error)
    }
    
  }
  
  return (
    !loggedInUser? <Login/> :
    <main className="flex min-h-screen bg-slate-50 pt-[100px] md:pt-[140px] py-[20px] flex-col  items-center  ">
       {showQuoteRepost && <QuoteREpost data={fullPostdata} setShowQuoteRepost={setShowQuoteRepost} />}
      {!userPersonalInfo? <PublishAPostSideBarSkeleton/> :  <PublishAPostSideBar/>}
      {!userPersonalInfo? <SideBarSkeleton/> : <SideBar setPublishPost={setPublishPost}/>}
      <PublishAPost displayPro={showPublishPost} setPublishPost={setPublishPost} />
      {showFullPost && <FullPost postComment={fullPostdata.postComment} postRepost={fullPostdata.postRepost} data={fullPostdata} setFullPostData={setFullPostData} setShowFullPost={setShowFullPost} />}
        {!userPersonalInfo ? <ProfileSkeleton /> : <div className="relative md:max-w-[500px]">
        <div className="max-w-[500px]  self-center px-[20px]">
        <Image alt="cover pics" src={userPersonalInfo.coverPic? userPersonalInfo.coverPic : CoverPics} className="rounded h-[250px] w-full md:w-[400px]" width={500} height={200} />
     
        <div className="absolute top-[200px] ">
        <div className="items-center flex relative">
                              
            { userPersonalInfo.userPic? <Image src={userPersonalInfo.userPic} alt={`${userPersonalInfo.username} profile picture`} height={200} width={200}  className="rounded-full md:w-[200px] w-[100px]"/>  :  <FaUserCircle className=" md:text-[200px] text-[100px]  bg-slate-50 rounded-full shadow-2xl " />}
                                
                                 </div>
        </div>
        <Link onClick={startChat} href={`/chat/${combinedId}`} className="absolute top-[300px] right-[30px] active:bg-slate-200 shadow-2xl border p-2 rounded-[5px] text-slate-700 text-[20px] ">Send Message</Link>
        <div className="pt-[140px] flex flex-col gap-y-[20px]">
          <div className="mt-[10px]">
            <h1 className="font-bold text-[20px] text-slate-900 capitalize">{userPersonalInfo?.username}</h1>
            <p className="font-[500] capitalize text-slate-500">@{userPersonalInfo?.username.split(' ').slice(0, 1)}</p>
          </div>
          <div>
            <p className="text-[12px] ">{userPersonalInfo?.bio ? userPersonalInfo?.bio : "No Bio. Kindly UpdateYour Bio!" }</p>
          </div>
          <div className="flex items-center gap-x-[20px] ">
            <span className="flex items-center gap-1 text-slate-500"><FaHeart  className="text-[15px]"/> <p className="capitalize text-[10px]">{userPersonalInfo?.favorite === "" ? "No favorite" : userPersonalInfo?.favorite}</p></span>
            <span className="flex items-center gap-1 text-slate-500"><IoLocationSharp className="text-[15px]"/> <p className="capitalize text-[10px]">{userPersonalInfo?.location? userPersonalInfo?.location : "Unknown" }</p></span>
<span className="flex items-center gap-1 text-slate-500"><IoIosTime className="text-[15px]"/> <p className="capitalize text-[10px]">{userPersonalInfo?.dateJoined ? userPersonalInfo?.dateJoined : "Private"}</p></span>
          </div>
            </div>
            </div>
        <div className="flex flex-col py-[50px] self-center gap-y-5 ">
          {myPost.length == 0 && <p className="text-center">{userPersonalInfo.username} Has Not Posted Anything</p> }
        {myPost.map((myPost: allPostInfo) => {
            return <PostCard setShowQuoteRepost={setShowQuoteRepost} setFullPostData={setFullPostData} post={myPost} showFullPostFn={showFullPostFn} />
          })}
</div>
      </div>}
     
    </main>
  );
}
