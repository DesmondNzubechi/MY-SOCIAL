"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import CoverPics from '../../public/cover pic.png'
import { userAuth } from "../components/auths/auth";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosTime } from "react-icons/io";
import { FullPost } from "../components/full post/fullPost";
import { SideBar } from "../components/sidebar/sidebar";
import { EditProfile } from "../components/editProfile/editProfile";
import { PublishAPost } from "../components/publishAPost/publishAPost";
import { AllUser } from "../components/allUser/allUser";
import { AllThePost } from "../components/allPosts/allPost";
import { allPostInfo } from "../components/allPosts/allPost";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../components/config/firebase";
import { v4 as uuid } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { PublishAPostSideBar } from "../components/publishAPostSidebar/publishAPostSideBar";
import { ProfileSkeleton } from "../components/SkeletonLoader/ProfileSkeleton";
import { SideBarSkeleton } from "../components/SkeletonLoader/SidebarSkeleton";
import { PublishAPostSideBarSkeleton } from "../components/SkeletonLoader/PublishApostSkeleton";
import { PostSkeleton } from "../components/SkeletonLoader/postSkeleton";
import { redirect, useRouter } from "next/navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PostCard } from "../components/postCard/postCard";
import { QuoteREpost } from "../components/quoteRepost/quoteRepost";
export interface personalInfo {
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

export default function MyProfile() {
  const allUser = AllUser();
  const loggedInUser = userAuth();
  const allPost = AllThePost();
  const [showFullPost, setShowFullPost] = useState<boolean>(false)
  const [showPublishPost, setPublishPost] = useState<string>('hidden')
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const [userPost, setUserPost] = useState<any[]>([]);
  const [showRepost, setShowRepost] = useState<boolean>(false);
  const [showQuoteRepost, setShowQuoteRepost] = useState<boolean>(false);
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

  // const fetchUserPost = () => {
   
  //   const userPost = allPost.filter((post: any) => {
  //     return post.authorId == loggedInUser?.uid
  //     || post.reposterId == loggedInUser?.uid
  //   })
  
  //   setUserPost(userPost)
  // }


  const getUserProfile = () => {
    const findUser = allUser.find((profile: any) => {
      return profile.userID === loggedInUser?.uid
    })
    setUserPersonalInfo(findUser); 
  }

  useEffect(() => {
    getUserProfile();
  }, [allPost, loggedInUser])


  console.log("user post", userPost)
  const showFullPostFn = () => {
setShowFullPost(true)
  }
  
  const [commentInput, setCommentInput] = useState<string>('');
  console.log("comment", commentInput)
  console.log("post id", fullPostdata.id)


  
  const getMyPost = () => {
    const filterPost = allPost.filter(post => {
      return post.authorId === loggedInUser?.uid ||
      post.reposterId === loggedInUser?.uid
    })
    setMyPost(filterPost);
  } 

  useEffect(() => {
    getMyPost();
  }, [allPost, loggedInUser])



  useEffect(() => {
   if (!loggedInUser) {
      const timeoutId = setTimeout(() => {
        redirect("/login");
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  console.log("looooogggg", loggedInUser)

  const updateDp = async () => {
    const dpRef = ref(storage, 'dp');
    try {
        const dpName = ref(dpRef, userPersonalInfo.username)
        const uploadDp = await uploadBytes(dpName, dp);
        const dpUrl = await getDownloadURL(uploadDp.ref);
       

        await updateDoc(doc(db, 'users', userPersonalInfo.userID), {
         userPic: dpUrl   
        })
      setUserPersonalInfo({...userPersonalInfo, userPic: dpUrl})
      toast.success("Profile Picture successfully updated", {
        hideProgressBar: true,
            closeOnClick: true,
            autoClose: 5000,
            pauseOnHover: true
      })
    } catch (error) {
      toast.error("An error occured, please try again.", {
        hideProgressBar: true,
            closeOnClick: true,
            autoClose: 5000,
            pauseOnHover: true
     })
    }
  }
  
  const updateCoverPics = async () => {
    const dpRef = ref(storage, 'user cover pictures');
    try {
        const dpName = ref(dpRef, `${userPersonalInfo.username} cover pics`)
        const uploadDp = await uploadBytes(dpName, userCoverPics);
        const dpUrl = await getDownloadURL(uploadDp.ref);

        await updateDoc(doc(db, 'users', userPersonalInfo.userID), {
         coverPic: dpUrl   
        })
      setUserPersonalInfo({...userPersonalInfo,  coverPic: dpUrl})
      toast.success("Cover Picture successfully updated", {
        hideProgressBar: true,
        closeOnClick: true,
        autoClose: 5000,
        pauseOnHover: true
      })
    } catch (error) {
      toast.error("An error occured, please try again.", {
        hideProgressBar: true,
            closeOnClick: true,
            autoClose: 5000,
            pauseOnHover: true
     })
    }
}

useEffect(() => {
  if (userCoverPics !== null) {
      updateCoverPics()
  }

}, [userCoverPics])
  
useEffect(() => {
    if (dp !== null) {
        updateDp()
    }

}, [dp])
  
  
 
  return (
    <main className="flex min-h-screen justify-center overflow-x-hidden bg-slate-50 pt-[100px] md:pt-[140px]  py-[20px] flex-col items-center  ">
        {showQuoteRepost && <QuoteREpost data={fullPostdata} setShowQuoteRepost={setShowQuoteRepost} />}
      {allUser.length == 0? <PublishAPostSideBarSkeleton/> :  <PublishAPostSideBar/>}
      {allUser.length == 0? <SideBarSkeleton/> : <SideBar setPublishPost={setPublishPost}/>}
       <PublishAPost displayPro={showPublishPost} setPublishPost={setPublishPost} />
    { showEditProfile && <EditProfile setUserPersonalInfo={setUserPersonalInfo} userInfo={userPersonalInfo} setShowEditProfile={setShowEditProfile} />}
      {showFullPost && <FullPost postRepost={fullPostdata.postRepost} postComment={fullPostdata.postComment} data={fullPostdata} setFullPostData={setFullPostData} setShowFullPost={setShowFullPost} />}
      {allUser.length == 0 ? <ProfileSkeleton /> : <div className="relative lg:max-w-[500px]">
      <div className="max-w-[500px] px-[20px]">
     <Image alt="cover pics" src={userPersonalInfo?.coverPic ? userPersonalInfo?.coverPic : CoverPics} className="rounded h-[250px] w-full md:w-[400px]" width={400} height={100} />
        
        <input type="file" onChange={(e) => {
                                     setUserCoverPics(e.target.files?.[0])
                                }} name="user cover pic" className="hidden" id="user cover pic" />
                                  <label htmlFor="user cover pic" className="absolute bg-slate-50 rounded-full text-[30px] p-1 top-[70px] right-[50px] " >
                                     <FaPlus className="bg-slate-"/>
                                  </label>
        <div className="absolute top-[200px] ">
        <div className="items-center flex relative">
                              
        { userPersonalInfo?.userPic? <Image src={userPersonalInfo?.userPic} alt={`${userPersonalInfo?.username}  profile picture`} height={200} width={200}  className="rounded-full md:w-[200px] md:h-[200px] h-[100px] w-[100px] "/>  :  <FaUserCircle className="md:text-[200px] text-[100px] bg-slate-50 rounded-full shadow-2xl " />}
             
                                  <input type="file" onChange={(e) => {
                                     setDp(e.target.files?.[0])
                                  }} name="user profile pic" className="hidden" id="user profile pic" />
                                  <label htmlFor="user profile pic" className="absolute text-[50px] bottom-0 md:bottom-[10px] md:left-[150px] left-[70px] " >
                                      <FcAddImage className="bg-slate-"/>
                                  </label>
                                 </div> 
        </div>
          <button onClick={() => showEditProfile ? setShowEditProfile(false) : setShowEditProfile(true)} className="absolute top-[350px] right-[30px] active:bg-slate-200 shadow-2xl border p-2 rounded-[5px] text-slate-700 bg-white text-[13px] ">Edit Profile</button>
          <button onClick={() => setPublishPost('block')} className="absolute top-[350px] lg:hidden right-[120px] active:bg-slate-200 shadow-2xl border bg-slate-900 p-2 rounded-[5px] text-slate-50 text-[13px] ">Create Post</button>
        <div className="pt-[140px] flex flex-col gap-y-[20px]">
          <div>
            <h1 className="font-bold text-[20px] lg:mt-[40px] text-slate-900 capitalize">{userPersonalInfo?.username}</h1>
            <p className="font-[500] capitalize text-slate-500">@{userPersonalInfo?.username.split(' ').slice(0, 1)}</p>
          </div> 
          <div>
            <p className="text-[12px] ">{userPersonalInfo?.bio ? userPersonalInfo?.bio : "No Bio. Kindly UpdateYour Bio!" }</p>
          </div>
          <div className="flex items-center gap-x-[20px] ">
            <span className="flex items-center gap-1 text-slate-500"><FaHeart  className="text-[15px]"/> <p className="capitalize text-[10px]">{userPersonalInfo?.favorite === "" ? "No favorite Yet! " : userPersonalInfo?.favorite}</p></span>
            <span className="flex items-center gap-1 text-slate-500"><IoLocationSharp className="text-[15px]"/> <p className="capitalize text-[10px]">{userPersonalInfo?.location? userPersonalInfo?.location : "Unknown" }</p></span>
<span className="flex items-center gap-1 text-slate-500"><IoIosTime className="text-[15px]"/> <p className="capitalize text-[10px]">{userPersonalInfo?.dateJoined ? userPersonalInfo?.dateJoined : "Private"}</p></span>
          </div>

       </div>
        </div>
        <div className="flex flex-col py-[50px] gap-5">
        {myPost.length == 0 && <p className="text-center">You Have Not Posted Anything</p> }
          {myPost.map((myPost: allPostInfo) => {
            return <PostCard setShowQuoteRepost={setShowQuoteRepost} setFullPostData={setFullPostData} post={myPost} showFullPostFn={showFullPostFn} />
          })}
</div>
      </div>}
     
    </main>
  );
}
