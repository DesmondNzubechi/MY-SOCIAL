"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import CoverPics from '../public/codes.jpg'
import { userAuth } from "./components/auths/auth";
import { FaUserCircle } from "react-icons/fa";
import { FullPost } from "./components/full post/fullPost";
import { PublishAPost } from "./components/publishAPost/publishAPost";
import { IoMdPhotos } from "react-icons/io";
import { MdVideoLibrary } from "react-icons/md";

import { AllThePost } from "./components/allPosts/allPost";
import { allPostInfo } from "./components/allPosts/allPost";
import { SideBar } from "./components/sidebar/sidebar";
import { fullDate } from "./components/publishAPost/publishAPost";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./components/config/firebase";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { QuoteREpost } from "./components/quoteRepost/quoteRepost";
import { FaEdit } from "react-icons/fa";
import { PublishAPostSideBar } from "./components/publishAPostSidebar/publishAPostSideBar";
import { PostSkeleton } from "./components/SkeletonLoader/postSkeleton";
import { SideBarSkeleton } from "./components/SkeletonLoader/SidebarSkeleton";
import { PublishAPostSideBarSkeleton } from "./components/SkeletonLoader/PublishApostSkeleton";
import { PostCard } from "./components/postCard/postCard";
//import { postCard } from "./components/postCard/postCard";
export default function Home() {
  //const loggedInUser = userAuth();
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
 
  console.log(fullPostdata)
  const showFullPostFn = () => {
setShowFullPost(true)
  }

   const loggedInUser = userAuth();
  const [commentInput, setCommentInput] = useState<string>('');
  console.log("comment", commentInput)
  console.log("post id", fullPostdata.id)

  console.log("Log in useer", loggedInUser)
  const [searchText, setSearchText] = useState<string>("");
  const [searchPostResult, setSearchPostResult] = useState<allPostInfo[]>([]);

  const searchForAPostFn = () => {
    const filterSearch = allPost.filter((post: allPostInfo) => {
      return post.authorName.toLowerCase().includes(searchText.toLowerCase()) ||
        post.postsDate.toLowerCase().includes(searchText.toLowerCase()) ||
      post.postsContent.toLowerCase().includes(searchText.toLowerCase())
    })
    setSearchPostResult(filterSearch)
  }

  useEffect(() => {
    searchForAPostFn()
  }, [searchText])

  
  
  return (
    <>
      
      <main className="flex min-h-screen overflow-x-hidden pt-[100px] py-[20px] bg-slate-50 justify-center flex-col items-center  ">
        {showQuoteRepost && <QuoteREpost data={fullPostdata} setShowQuoteRepost={setShowQuoteRepost} />}
   { showFullPost &&  <FullPost postComment={fullPostdata.postComment} postRepost={fullPostdata.postRepost} data={fullPostdata} setFullPostData={setFullPostData} setShowFullPost={setShowFullPost} />}
     <PublishAPost displayPro={showPublishPost} setPublishPost={setPublishPost} />
     
      <div className="grid lg:grid-cols-6  relative">
          <div></div>
          <div></div>
          {/* SIDE BAR */}
        {allPost.length == 0? <PublishAPostSideBarSkeleton/> :  <PublishAPostSideBar/>}
      {allPost.length == 0? <SideBarSkeleton/> : <SideBar setPublishPost={setPublishPost}/>}
    
          <div className="lg:col-span-2 flex  flex-col gap-5"> 
          <div className="px-[20px] ">
          <div onClick={() => setPublishPost('block')} className="lg:hidden flex flex-col cursor-pointer gap-y-2 bg-white p-4 rounded">
            <div className="flex flex-row gap-x-[20px] items-center">
              <FaUserCircle className="md:text-[30px] text-[20px] bg-slate-50 rounded-full shadow-2xl " />
              <div className="text-slate-500 text-[12px] md:text-[15px]  p-3 border w-full rounded-[10px]">Write a post here...</div>
            </div>
            <hr />
            <div className="flex flex-row gap-5  w-full justify-around">
              <div className="flex items-center gap-1 text-slate-700  bg-slate-50 p-2 rounded"><IoMdPhotos /><span className="text-[12px] md:text-[15px]">Photo</span></div>
              <div className="flex items-center gap-1 text-slate-700 bg-slate-50 p-2 rounded"><MdVideoLibrary /><span className="text-[12px] md:text-[15px]">Video</span></div>
              <button className="bg-sky-500 text-[12px] md:text-[15px] text-slate-50 p-2 rounded">Publish Post</button>
            </div>
              </div>
              </div>
<div className="px-[20px] ">
            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="bg-white rounded block shadow capitalize outline-none py-[18px] w-full   text-center text-[15px]" placeholder="search for a post here" name="" id="" />
            </div>
            {allPost.length === 0 && skeletonLoader.map(skel => <PostSkeleton />)}
            {searchText && <h1 className="text-center font-bold">Your Search Result    "<span className="font-bold uppercase">{ searchText}</span>"</h1>}
            {searchText && searchPostResult.map((myPost: allPostInfo) => {
            return <PostCard setShowQuoteRepost={setShowQuoteRepost} setFullPostData={setFullPostData} post={myPost} showFullPostFn={showFullPostFn} />
          })}
            {!searchText && allPost.map((myPost: allPostInfo) => {
            return <PostCard  setShowQuoteRepost={setShowQuoteRepost}  setFullPostData={setFullPostData} post={myPost} showFullPostFn={showFullPostFn} />
          })} 
          {} 
           
        </div>
        </div>
        <ToastContainer autoClose={2000} />
      </main>
      </>
  );
}
