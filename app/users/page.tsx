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
 

 


  
  

  return (
    <>
      
      <main className="flex min-h-screen pt-[100px] py-[20px] bg-slate-50 flex-col items-center  ">
        {showQuoteRepost && <QuoteREpost data={fullPostdata} setShowQuoteRepost={setShowQuoteRepost} />}
   { showFullPost &&  <FullPost postComment={fullPostdata.postComment} data={fullPostdata} setFullPostData={setFullPostData} setShowFullPost={setShowFullPost} />}
     <PublishAPost displayPro={showPublishPost} setPublishPost={setPublishPost} />
      <div className="bg-white flex items-center justify-between gap-2 fixed px-[20px] py-[10px] z-[100] right-0 left-0 top-0 shadow border-b">
        <div className="flex items-center bg-blue-500 text-white py-[5px] px-[10px] rounded">
          <TbSocial className="text-[50px]"/>
          <h1 className="text-[15px] ">MYsocial</h1>
        </div>
       
          <input type="text" className="bg-slate-50 capitalize outline-none py-[18px] w-full  text-center text-[15px]" placeholder="search for a post here" name="" id="" />
      
      </div>
      <div className="grid md:grid-cols-6 px-[30px] relative">
          <div></div>
          <div></div>
          {/* SIDE BAR */}
        {allPost.length == 0? <PublishAPostSideBarSkeleton/> :  <PublishAPostSideBar/>}
      {allPost.length == 0? <SideBarSkeleton/> : <SideBar setPublishPost={setPublishPost}/>}
    
        <div className="md:col-span-2 flex max-w-[500px] flex-col gap-5">
        
            
            {allPost.length === 0 && skeletonLoader.map(skel => <PostSkeleton />)}
        
           
        </div>
        </div>
        <ToastContainer autoClose={2000} />
      </main>
      </>
  );
}
