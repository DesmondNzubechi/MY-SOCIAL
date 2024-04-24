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
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import 'react-toastify/ReactToastify.css';
import { PublishAPostSideBar } from "../../components/publishAPostSidebar/publishAPostSideBar";
import { ProfileSkeleton } from "../../components/SkeletonLoader/ProfileSkeleton";
import { SideBarSkeleton } from "../../components/SkeletonLoader/SidebarSkeleton";
import { PublishAPostSideBarSkeleton } from "../../components/SkeletonLoader/PublishApostSkeleton";
import { PostSkeleton } from "../../components/SkeletonLoader/postSkeleton";
import { redirect, useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { PostCard } from "@/app/components/postCard/postCard";

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
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  
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
  
  const [commentInput, setCommentInput] = useState<string>('');

  const likePost = async (post: allPostInfo) => {
    if (!loggedInUser) {
      const notification = () => toast("Kindly login before you can like this post");
      notification();
      return;
    }
    const postRef = doc(db, 'posts', post.id)
    try {
      const likeStatus = post.postLike.find((like: any) => like.likeId === loggedInUser?.uid);
      const addLike = post.postLike.filter((like: any) => like.likeId !== loggedInUser?.uid)
     
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
  console.log("all post", allPost)


  useEffect(() => {
   if (!loggedInUser) {
      const timeoutId = setTimeout(() => {
        redirect("/login");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

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
    <main className="flex min-h-screen bg-slate-50 pt-[100px] md:pt-[140px] py-[20px] flex-col items-center  ">
      {!userPersonalInfo? <PublishAPostSideBarSkeleton/> :  <PublishAPostSideBar/>}
      {!userPersonalInfo? <SideBarSkeleton/> : <SideBar setPublishPost={setPublishPost}/>}
      <PublishAPost displayPro={showPublishPost} setPublishPost={setPublishPost} />
    {/* { showEditProfile && <EditProfile setShowEditProfile={setShowEditProfile} />} */}
      {showFullPost && <FullPost postComment={fullPostdata.postComment} data={fullPostdata} setFullPostData={setFullPostData} setShowFullPost={setShowFullPost} />}
     {!userPersonalInfo? <ProfileSkeleton/> : <div className="relative max-w-[500px] px-[20px]">
        <Image alt="cover pics" src={userPersonalInfo.coverPic? userPersonalInfo.coverPic : CoverPics} className="rounded h-[250px] w-full md:w-[400px]" width={500} height={200} />
       
        <div className="absolute top-[200px] ">
        <div className="items-center flex relative">
                              
            { userPersonalInfo.userPic? <Image src={userPersonalInfo.userPic} alt={`${userPersonalInfo.username} profile picture`} height={200} width={200}  className="rounded-full md:w-[200px] w-[100px]"/>  :  <FaUserCircle className=" md:text-[200px] text-[100px]  bg-slate-50 rounded-full shadow-2xl " />}
                                
                                 </div>
        </div>
        <Link onClick={startChat} href={`/chat/${combinedId}`} className="absolute top-[300px] right-[30px] active:bg-slate-200 shadow-2xl border p-2 rounded-[5px] text-slate-700 text-[20px] ">Send Message</Link>
        <div className="pt-[180px] flex flex-col gap-y-[20px]">
          <div>
            <h1 className="font-bold text-[20px] text-slate-900 capitalize">{userPersonalInfo.username}</h1>
            <p className="font-[500] text-slate-500">@{userPersonalInfo.username.split(" ").slice(0, 1)}</p>
          </div>
          <div> 
            <p>{userPersonalInfo.bio? userPersonalInfo.bio : "User Bio Not Updated" }</p>
          </div>
          <div className="flex items-center gap-x-[20px] ">
            <span className="flex items-center gap-1 text-slate-500"><FaHeart  className="text-[20px]"/> <p className="capitalize">Coding</p></span>
            <span className="flex items-center gap-1 text-slate-500"><IoLocationSharp /> <p className="capitalize">{userPersonalInfo.location? userPersonalInfo.location : "Unknown"}</p></span>
<span className="flex items-center gap-1 text-slate-500"><IoIosTime /> <p className="capitalize">{userPersonalInfo?.dateJoined? userPersonalInfo?.dateJoined : "Private" }</p></span>
          </div>
        </div>
        <div className="flex flex-col py-[50px] gap-5">
          {myPost.length == 0 && <p className="text-center">User Has Not Posted Anything</p> }
        {myPost.map((myPost: allPostInfo) => {
            return <PostCard setShowQuoteRepost={setShowQuoteRepost} setFullPostData={setFullPostData} post={myPost} showFullPostFn={showFullPostFn} />
          })}
        {/* {
              myPost.map((post) => {
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
                    setFullPostData({...post})
                  }}
                  type="button"
                  className="font-bold">See More...
                </button>}
              </div>
              <Image src={post.postImg} width={500} height={300} className="rounded-[10px] " alt="post pic" />
              <div className="flex items-center border-t border-b py-[5px] justify-around">
                <div  onClick={() => {
                    showFullPostFn();
                    setFullPostData({...post})
                  }} className=" border-r flex items-center cursor-pointer p-[5px] gap-x-[5px] "><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">{post.postComment.length} Comments</p></div>
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
                        setFullPostData({...post})
                      }} className="text-slate-700 text-[15px]  flex flex-row items-center gap-x-1"><FaEdit className="text-[20px] "/> Repost with you thought</button>
                  </div>}
              </div>
            
                <div className="py-[10px] w-full bg-slate-50 flex items-center justify-around px-[20px] gap-1">
                  <input onChange={(e) => setCommentInput(e.target.value)} type="text" placeholder="Input your comment" className="w-full outline-none bg-transparent" />
                      <button onClick={() => {
                        addCommentfn(post);
                          showFullPostFn();
                          setFullPostData({...post})
                      }} type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
                </div>
                </div>
            </div>
            })
          }    */}
</div>
      </div>}
     
    </main>
  );
}
