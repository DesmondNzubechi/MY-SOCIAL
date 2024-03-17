"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import CoverPics from '../public/codes.jpg'
import { userAuth } from "./components/auths/auth";
import { FaUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaCommentAlt } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { BiRepost } from "react-icons/bi";
import { FullPost } from "./components/full post/fullPost";
import { PublishAPost } from "./components/publishAPost/publishAPost";
import { IoMdPhotos } from "react-icons/io";
import { MdVideoLibrary } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { TbSocial } from "react-icons/tb";
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
//import { postCard } from "./components/postCard/postCard";
export default function Home() {
  //const loggedInUser = userAuth();
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
      
      // Check if post.postComment is an array
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
        {/* SIDE BAR */}
       <SideBar setPublishPost={setPublishPost}/>
     
        <div className="md:col-span-3 flex max-w-[500px] flex-col gap-5">
          <div onClick={() => setPublishPost('block')} className="flex flex-col cursor-pointer gap-y-2 bg-white p-4 rounded">
            <div className="flex flex-row gap-x-[20px] items-center">
              <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />
              <div className="text-slate-500 p-3 border w-full rounded-[10px]">Write a post here...</div>
            </div>
            <hr />
            <div className="flex flex-row gap-5  w-full justify-around">
              <div className="flex items-center gap-1 text-slate-700  bg-slate-50 p-2 rounded"><IoMdPhotos /><span>Photo</span></div>
              <div className="flex items-center gap-1 text-slate-700 bg-slate-50 p-2 rounded"><MdVideoLibrary /><span>Video</span></div>
              <button className="bg-sky-500 text-slate-50 p-2 rounded">Publish Post</button>
            </div>
            </div>
           
          {
              allPost.map((post) => {
                const postContents = post.postsContent.split(' ');
                const tobeDisplayed = postContents.slice(0, 20).join(' ');
                return <div key={post.id} className="shadow-xl border bg-white relative  gap-[20px] rounded-[10px] flex-col flex">
             {  post?.reposterName &&  <div className="bg-slate-100 p-2">
              <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex  capitalize items-center ">  {(post.reposterPics !== '' || post.reposterPics) ? <Image src={post.reposterPics} height={50} width={50} className="rounded-full " alt="post pic" /> :  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />}@{post.reposterName}</h1> <span className="text-slate-500 ">Reposted</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">{post.respotDate}</p>
              </div>
                    <p className="text-slate-700 text-[15px] mb-[10px]">{post.repostThought}</p>
              
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
                  className="font-bold">See More...
                </button>}
              </div>
              <Image src={post.postImg} width={500} height={300} className="rounded-[10px] " alt="post pic" />
              <div className="flex items-center border-t border-b py-[5px] justify-around">
                <div onClick={showFullPostFn} className=" border-r flex items-center cursor-pointer p-[5px] gap-x-[5px] "><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">{post.postComment.length} Comments</p></div>
                  <div onClick={() => likePost(post)} className={` flex items-center p-[5px] cursor-pointer gap-x-[5px] ${post.postLike.find((like: any) => like.likeId === loggedInUser?.uid) ? 'text-sky-700 ' : 'text-slate-500'}  `}><SlLike className="text-[20px] " /> <p
                    className={post.postLike.find((like: any) => like.likeId === loggedInUser?.uid) ? 'text-sky-700 ' : 'text-slate-500' }>{post.postLike.length} Likes</p></div>
                  <div onClick={() => showRepost? setShowRepost(false) : setShowRepost(true)} className=" flex items-center p-[5px] cursor-pointer gap-x-[5px] border-l "><BiRepost className="text-[20px] " /><p className="text-slate-500">{post?.postRepost?.length} Repost</p></div>
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
                  <button onClick={() => addCommentfn(post)} type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
                </div>
                </div>
            </div>
            })
          }
            <div className="shadow-xl border bg-white  gap-[20px] rounded-[10px] flex-col flex">
              <div className="bg-slate-100 p-2">
              <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex items-center ">  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />@Nzubechukwu(B2R)</h1> <span className="text-slate-500 ">Reposted</span>
              </div>
              {/* <p className="text-slate-700 text-[15px] mb-[10px]">Recursion and the Call Stack ✅What is Recursion? Recursion is a programming paradigm where a function solves a problem by breaking it</p>
              */}
              </div>
              <div className="flex flex-col p-2">
            <div className="flex gap-1  flex-row items-center">
              <h1 className="font-bold flex items-center ">  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />@Nzubechukwu(B2R)</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">2nd March 2024</p>
            </div>
            <div className="">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <button onClick={showFullPostFn} type="button" className="font-bold">See More...</button>
            </div>
            <Image src={CoverPics} className="rounded-[10px] " alt="post pic" />
            <div className="flex items-center border-t border-b py-[5px] justify-around">
              <div onClick={showFullPostFn} className=" border-r flex items-center cursor-pointer p-[5px] gap-x-[5px] "><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">20 Comments</p></div>
              <div className=" flex items-center p-[5px] cursor-pointer gap-x-[5px] "><SlLike className="text-[20px] "/> <p className="text-slate-500">50 Likes</p></div>
              <div className=" flex items-center p-[5px] cursor-pointer gap-x-[5px] border-l "><BiRepost className="text-[20px] " /><p className="text-slate-500">10 Repost</p></div>
            </div>
          </div>
              <div className="py-[10px] w-full bg-slate-50 flex items-center justify-around px-[20px] gap-1">
                <input type="text" placeholder="Input your comment" className="w-full outline-none bg-transparent" />
                <button  type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
              </div>
           
          </div>
        </div>
        </div>
        <ToastContainer autoClose={2000} />
      </main>
      </>
  );
}
