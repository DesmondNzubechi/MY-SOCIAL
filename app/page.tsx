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
import { doc, setDoc, updateDoc } from "firebase/firestore";
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
   { showFullPost &&  <FullPost postComment={fullPostdata.postComment} data={fullPostdata} setFullPostData={setFullPostData} setShowFullPost={setShowFullPost} />}
     <PublishAPost displayPro={showPublishPost} setPublishPost={setPublishPost} />
      {/* <div className="bg-white flex items-center justify-between gap-2 fixed px-[20px] py-[10px] z-[100] right-0 left-0 top-0 shadow border-b">
        // {/* <div className="flex items-center bg-blue-500 text-white py-[5px] px-[10px] rounded">
        //   <TbSocial className="text-[50px]"/>
        //   <h1 className="text-[15px] ">MYsocial</h1>
        // </div> 
       
          <input type="text" className="bg-slate-50 capitalize outline-none py-[18px] w-full  text-center text-[15px]" placeholder="search for a post here" name="" id="" />
      
      </div> */}
      <div className="grid md:grid-cols-6 px-[30px] relative">
          <div></div>
          <div></div>
          {/* SIDE BAR */}
        {allPost.length == 0? <PublishAPostSideBarSkeleton/> :  <PublishAPostSideBar/>}
      {allPost.length == 0? <SideBarSkeleton/> : <SideBar setPublishPost={setPublishPost}/>}
    
          <div className="md:col-span-2 flex max-w-[500px] flex-col gap-5">
    
          <div onClick={() => setPublishPost('block')} className="md:hidden flex flex-col cursor-pointer gap-y-2 bg-white p-4 rounded">
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

            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} className="bg-white rounded block md:hidden shadow capitalize outline-none py-[18px] w-full min-w-[400px]  text-center text-[15px]" placeholder="search for a post here" name="" id="" />
       
            {allPost.length === 0 && skeletonLoader.map(skel => <PostSkeleton />)}
            {searchText && <h1 className="text-center font-bold">Your Search Result    "<span className="font-bold uppercase">{ searchText}</span>"</h1>}
            {searchText && searchPostResult.map((myPost: allPostInfo) => {
            return <PostCard setShowQuoteRepost={setShowQuoteRepost} setFullPostData={setFullPostData} post={myPost} showFullPostFn={showFullPostFn} />
          })}
            {!searchText && allPost.map((myPost: allPostInfo) => {
            return <PostCard setShowQuoteRepost={setShowQuoteRepost} setFullPostData={setFullPostData} post={myPost} showFullPostFn={showFullPostFn} />
          })}
          {/* {
             allPost.map((post) => {
                const postContents = post.postsContent.split(' ');
                const tobeDisplayed = postContents.slice(0, 20).join(' ');
                return <div key={post.id} className="shadow-xl border bg-white relative  gap-[20px] rounded-[10px] flex-col flex">
             {  post?.reposterName &&  <div className="bg-slate-100 p-2">
              <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex  capitalize items-center ">  {(post?.reposterPics !== '' || post?.reposterPics) ? <Image src={post?.reposterPics} height={50} width={50} className="rounded-full " alt="post pic" /> :  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />}@{post.reposterName}</h1> <span className="text-slate-500 ">Reposted</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">{post.respotDate}</p>
              </div>
                    <p className="text-slate-700 text-[15px] mb-[10px]">{post?.repostThought}</p>
              
                  </div>}
                  <div className="flex flex-col gap-[20px] p-2">
              <div className="flex gap-1  flex-row items-center">
                  <h1 className="font-bold flex  capitalize items-center ">  {post.authorPics !== '' ? <Image src={post.authorPics} height={50} width={50} className="rounded-full " alt="post pic" /> :  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />}@{post.authorName}</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">{post.postsDate}</p>
              </div>
              <div className="">
                  <p>{ tobeDisplayed }</p>
                {postContents.length > 20 && <button
                  onClick={() => {
                    showFullPostFn();
                    setFullPostData({...post})
                  }}
                  type="button"
                  className="font-bold">See More...
                </button>}
              </div>
              <Image src={post?.postImg} width={500} height={300} className="rounded-[10px] " alt="post pic" />
              <div className="flex items-center border-t border-b py-[5px] justify-around">
                <div  onClick={() => {
                    showFullPostFn();
                    setFullPostData({...post})
                  }} className="  flex items-center cursor-pointer p-[5px] gap-x-[5px] "><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">{post.postComment.length} Comments</p></div>
                  <div onClick={() => likePost(post)} className={` flex items-center p-[5px] cursor-pointer gap-x-[5px] ${post.postLike.find((like: any) => like.likeId === loggedInUser?.uid) ? 'text-sky-700 ' : 'text-slate-500'}  `}><SlLike className="text-[20px] " /> <p
                    className={post.postLike.find((like: any) => like.likeId === loggedInUser?.uid) ? 'text-sky-700 ' : 'text-slate-500' }>{post?.postLike.length} Likes</p></div>
                  <div onClick={() => showRepost? setShowRepost(false) : setShowRepost(true)} className=" flex items-center p-[5px] cursor-pointer gap-x-[5px]  "><BiRepost className="text-[20px] " /><p className="text-slate-500">{post?.postRepost?.length} Repost</p></div>
                  {showRepost && <div className="absolute flex flex-col bg-slate-50 gap-2 p-2 items-start rounded border  bottom-[135px]  right-0 ">
                    <button
                      onClick={() => { 
                       Repost(post)
                      }}
                      className=" text-slate-700 text-[15px] flex flex-row items-center gap-x-1"><BiRepost className="text-[20px] "/> Instant Repost
                    </button>
                    <button  onClick={() => {
                        setShowQuoteRepost(true);
                        setFullPostData({...post})
                      }} className="text-slate-700 text-[15px]  flex flex-row items-center gap-x-1"><FaEdit className="text-[20px] "/> Repost with you thought</button>
                  </div>}
              </div>
            
                <div className="py-[10px] w-full bg-slate-50 flex items-center justify-around px-[20px] gap-1">
                  <input onChange={(e) => setCommentInput(e.target.value)} type="text" placeholder="Input your comment" className="w-full outline-none bg-transparent" />
                      <button onClick={() => {
                        addCommentfn(post);
                         // showFullPostFn();
                          setFullPostData({...post})
                      }} type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
                </div>
                </div>
            </div>
            })
          } */} 
           
        </div>
        </div>
        <ToastContainer autoClose={2000} />
      </main>
      </>
  );
}
