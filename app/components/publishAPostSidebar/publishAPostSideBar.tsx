import { FcAddImage } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/firebase";
import Image from "next/image";
import { v4 as uuid } from 'uuid';
import { doc, setDoc } from "firebase/firestore";
import { userAuth } from "../auths/auth";
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import { personalInfo } from "@/app/my-profile/page";
import { AllUser } from "../allUser/allUser";
const currentDate: Date = new Date();
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric', 
  weekday: 'long', // or 'short', 'narrow', or undefined
};


export const fullDate: string = currentDate.toLocaleString(undefined, options);

export const PublishAPostSideBar = () => {
  const loggedInUser = userAuth();
  const allUser = AllUser()
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

    interface PostInfo {
        theImgInfo: any,
        postContent: string,
        postId: string,
        postDate: string,
        authorName: string,
        authorId: string,
    } 

    const [thePostImg, setThePostImg] = useState<any>(null);

    const [thePost, setThePost] = useState<PostInfo>({
        theImgInfo:'',
        postContent: "",
        postId: "",
        postDate: fullDate,
        authorName: "",
        authorId: "",
    })


  const publishPostFn = async () => {
    if (!loggedInUser) {
      alert('Kindly login before you make any post');
      return;
    }
    if (thePost.postContent === '') {
      alert('Please input post content');
      return;
    }
    const postRef = doc(db, 'posts', uuid())
    try { 
      await setDoc(postRef, {
        postImg: thePost.theImgInfo,
        postsContent: thePost.postContent,
        postId: uuid(),
        postsDate: fullDate,
        authorId: userPersonalInfo.userID,
        authorName: userPersonalInfo.username,
        authorPics: userPersonalInfo.userPic,
        postComment: [],
        postLike: [],
        postRepost: []
      })
        const notification = () => toast('Post succesfully published');
        notification();
        setThePost({  theImgInfo:'',
        postContent: "",
        postId: "",
        postDate: fullDate,
        authorName: "",
        authorId: "",})
    } catch (error) {
      toast.error("An Error Occur. Please Try Again",
      {
        hideProgressBar: true,
        autoClose: 500
      }
    )
    }
  }

    const uploadPostImg = async () => {
        const imgRef = ref(storage, 'PostImgs');
        try {
            const imgName = ref(imgRef, thePostImg.name);
            const uploadPhoto = await uploadBytes(imgName, thePostImg);
            const downloadURL = await getDownloadURL(uploadPhoto.ref);
            setThePost({...thePost, theImgInfo: downloadURL})
            toast.success("Image Uploaded", {
              hideProgressBar: true,
              closeOnClick: true,
              autoClose: 500,
              pauseOnHover: true
  })
          } catch (error) {
            toast.error("An error occured. Please Try Again", {
              hideProgressBar: true,
              closeOnClick: true,
              autoClose: 500,
              pauseOnHover: true
  })
        }
    }

    useEffect(() => {
        if (thePostImg !== null) {
            uploadPostImg();
}
    }, [thePostImg])
  
  
    const getUserProfile = () => {
      const findUser = allUser.find((profile: any) => {
        return profile.userID === loggedInUser?.uid
      })
      setUserPersonalInfo(findUser); 
  }
  
  
  useEffect(() => {
    getUserProfile();
  }, [allUser, loggedInUser])
    
    return <div className="bg-white shadow fixed justify-center  hidden lg:flex flex-col left-[50px] overflow-y-auto w-fit top-[100px]  md:h-[70vh] h-full p-4 md:rounded-[10px]  ">
      <div className="flex justify-between items-center mb-[20px]">
        <h1 className="text-center font-bold uppercase text-center text-[20px]">Publish a post</h1>
      </div> 
      <form action="" className="flex flex-col gap-1">
        <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
          <textarea onChange={(e) => setThePost({...thePost, postContent: e.target.value})}  className="bg-transparent w-[300px] h-[200px] outline-none" placeholder="Write your post contents here..."/>
        </div>
                <div className="flex items-center">
                   {thePost.theImgInfo && <Image width={50} height={50} src={thePost.theImgInfo} className="w-[50px] h-[50px] rounded-[20px]" alt="post image" />}
                <input accept="image" type="file" onChange={(e) => {
                                    setThePostImg(e.target.files?.[0])
                                  }} name="image" className="hidden" id="image" />
                                  <label htmlFor="image" className=" bg-slate-50 rounded-full text-[50px]   " >
                                     <FcAddImage className="bg-slate-"/>
                </label>
            </div>
            <button type="button" onClick={publishPostFn} className="bg-sky-500  py-[5px]  w-[50%] text-[20px] text-slate-50 rounded ">Publish</button>
      </form>
</div>
 
} 