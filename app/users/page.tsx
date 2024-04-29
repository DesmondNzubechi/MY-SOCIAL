"use client";
import Image from "next/image";
import { useState } from "react";
import { FullPost } from "../components/full post/fullPost";
import { PublishAPost } from "../components/publishAPost/publishAPost";
import { TbSocial } from "react-icons/tb";
import { AllThePost } from "../components/allPosts/allPost";
import { allPostInfo } from "../components/allPosts/allPost";
import { SideBar } from "../components/sidebar/sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { QuoteREpost } from "../components/quoteRepost/quoteRepost";
import { PublishAPostSideBar } from "../components/publishAPostSidebar/publishAPostSideBar";
import { PostSkeleton } from "../components/SkeletonLoader/postSkeleton";
import { SideBarSkeleton } from "../components/SkeletonLoader/SidebarSkeleton";
import { PublishAPostSideBarSkeleton } from "../components/SkeletonLoader/PublishApostSkeleton";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { AllUser } from "../components/allUser/allUser";
import { Allan } from "next/font/google";
import { db } from "../components/config/firebase";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { userAuth } from "../components/auths/auth";
import { UserSkeletonLoader } from "../components/SkeletonLoader/UserSkeleton";
import { personalInfo } from "../my-profile/page";
//import { postCard } from "./components/postCard/postCard";
 
export default function Home() {
 const loggedInUser = userAuth();
  const skeletonLoader = [1, 2, 3, 4, 5]
  const allPost = AllThePost();
  const [showFullPost, setShowFullPost] = useState<boolean>(false)
  const [showPublishPost, setPublishPost] = useState<string>('hidden')
  const [showRepost, setShowRepost] = useState<boolean>(false);
  const [showQuoteRepost, setShowQuoteRepost] = useState<boolean>(false);
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

    const allTheUsers = AllUser();
  const [filterAllUser, setFilterAllUser] = useState<any>([])
  useEffect(() => {
    const filterUsers = () => {
      const filteredUsers = allTheUsers.filter((users: any) => {
       return users?.userID !== loggedInUser?.uid
      })
      setFilterAllUser(filteredUsers)
    }
    filterUsers();
 }, [allTheUsers])

  const [searchInput, setSearchInput] = useState<string>('')
  const [searchUserResult, setSearchUserResult] = useState<personalInfo[]>([])
  const searchUserFn = () => {
    const searchUser = filterAllUser.filter((users: any) => {
    return users.username.includes(searchInput)
    })
    setSearchUserResult(searchUser);
  }

  useEffect(() => {
    searchUserFn();
  }, [searchInput])
  
  return (
    <>
      
      <main className="flex min-h-screen pt-[100px] py-[20px] bg-slate-50 flex-col items-center  ">
        {showQuoteRepost && <QuoteREpost data={fullPostdata} setShowQuoteRepost={setShowQuoteRepost} />}
   { showFullPost &&  <FullPost postComment={fullPostdata.postComment} data={fullPostdata} setFullPostData={setFullPostData} setShowFullPost={setShowFullPost} />}
     <PublishAPost displayPro={showPublishPost} setPublishPost={setPublishPost} />
      {/* <div className="bg-white flex items-center justify-between gap-2 fixed px-[20px] py-[10px] z-[100] right-0 left-0 top-0 shadow border-b">
        <div className="flex items-center bg-blue-500 text-white py-[5px] px-[10px] rounded">
          <TbSocial className="text-[50px]"/>
          <h1 className="text-[15px] ">MYsocial</h1>
        </div>
       
          <input type="text" className="bg-slate-50 capitalize outline-none py-[18px] w-full  text-center text-[15px]" placeholder="search for a post here" name="" id="" />
      
      </div> */}
      <div className="grid md:grid-cols-6 px-[30px] relative">
          <div></div>
          <div></div>
          {/* SIDE BAR */}
        {allPost.length == 0? <PublishAPostSideBarSkeleton/> :  <PublishAPostSideBar/>}
      {allPost.length == 0? <SideBarSkeleton/> : <SideBar setPublishPost={setPublishPost}/>}
    
        <div className="md:col-span-2 flex max-w-[500px] flex-col gap-5">
        
            
           
            <div className="flex flex-col w-full gap-y-[20px]">
            {allPost.length === 0 && skeletonLoader.map(skel => <UserSkeletonLoader />)}
              <input type="text" value={searchInput} onChange={(e) => {
                setSearchInput(e.target.value)
            }} className="bg-white rounded block  mb-[40px] capitalize outline-none py-[18px] w-full  text-center text-[15px]" placeholder="search for a user here" name="" id="" />
       
       {
                  searchInput &&  searchUserResult.map((users: any) => {
                                  return <Link href={`users/${users?.userID}`} className="shadow border hover:bg-white w-full rounded p-2">
                                      <div>
                                      <div className="flex gap-1 w-full flex-row items-start">
                                              {users?.userPic !== '' ? <Image src={users?.userPic} height={50} width={50} className="rounded-full h-[50px] w-[50px] " alt="post pic" /> : <FaUserCircle className="text-[50px] bg-slate-50 rounded-full shadow-2xl " />}
                                              <div className="flex w-full flex-col gap-2">
                                                  <div className="flex flex-row items-center w-full justify-between ">
                                                      <div className="">
                                                          <h1 className="font-medium text-slate-900 text-[12px] md:text-[15px] capitalize">{users?.username}</h1>
                                                          <h2 className="text-slate-500 font-[500] text-[12px] md:text-[15px] capitalize ">@{users?.username.split(" ").slice(0, 1).join(" ")}</h2>
                                                      </div>
                                                     <button className="bg-sky-500 text-[10px] md:text-[15px] rounded-[5px]  hover:bg-sky-600 text-slate-50 px-2  py-1 text-[15px]">View Profile</button>
                                                  </div>
                                                  <p className="text-[10px] font-[400] w-full text-slate-900">{users?.bio.split(" ").slice(0, 11).join(' ')}...</p>
                                              </div>
              </div>
                                      </div>
                                  
                                  </Link>
                              })
                          }
                          {
                    filterAllUser.map((users: any) => {
                                  return <Link href={`users/${users?.userID}`} className="shadow border hover:bg-white w-full rounded p-2">
                                      <div>
                                      <div className="flex gap-1 w-full flex-row items-start">
                                              {users?.userPic !== '' ? <Image src={users?.userPic} height={50} width={50} className="rounded-full  h-[50px] w-[50px] " alt="post pic" /> : <FaUserCircle className="text-[50px] bg-slate-50 rounded-full shadow-2xl " />}
                                              <div className="flex w-full flex-col gap-2">
                                                  <div className="flex flex-row items-center w-full justify-between ">
                                                  <div className="">
                                                          <h1 className="font-medium text-slate-900 text-[12px] md:text-[15px] capitalize">{users?.username}</h1>
                                                          <h2 className="text-slate-500 font-[500] text-[12px] md:text-[15px] capitalize ">@{users?.username.split(" ").slice(0, 1).join(" ")}</h2>
                                                      </div>
                                                     <button className="bg-sky-500 text-[10px] md:text-[15px] rounded-[5px]  hover:bg-sky-600 text-slate-50 px-2  py-1 text-[15px]">View Profile</button>
                                                  </div>
                                                  <p className="text-[10px] font-[400] w-full text-slate-900">{users?.bio.split(" ").slice(0, 11).join(' ')}...</p>
                                              </div>
              </div>
                                      </div>
                                  
                                  </Link>
                              })
                          }
                          
                      </div>
           
        </div>
        </div>
        <ToastContainer autoClose={2000} />
      </main>
      </>
  );
}
