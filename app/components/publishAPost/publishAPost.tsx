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
import { AllUser } from "../allUser/allUser";
import { personalInfo } from "@/app/my-profile/page";
const currentDate: Date = new Date();
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long', // or 'short', 'narrow', or undefined
};


export const fullDate: string = currentDate.toLocaleString(undefined, options);

export const PublishAPost = ({ displayPro, setPublishPost }: { displayPro: string; setPublishPost: React.Dispatch<React.SetStateAction<string>> }) => {
  const loggedInUser = userAuth();
  const allUser = AllUser();
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
        imageInfo: any,
        postContent: string,
        postId: string,
        postDate: string,
        authorName: string,
        authorId: string,
    }

    const [postImg, setPostImg] = useState<any>(null);

    const [thePost, setThePost] = useState<PostInfo>({
        imageInfo:'',
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
        postImg: thePost.imageInfo,
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
      setPublishPost("hidden");
      const notification = () => toast("Successfully Posted")
      notification();
    } catch (error) {
      toast.error("An Error Occur. Please Try Again",
        {
          
          autoClose: 5000
        }
      )
    }
  }

    const uploadPostImg = async () => {
        const imgRef = ref(storage, 'PostImgs');
        try {
            const imgName = ref(imgRef, postImg.name);
            const uploadPhoto = await uploadBytes(imgName, postImg);
            const downloadURL = await getDownloadURL(uploadPhoto.ref);
            setThePost({...thePost, imageInfo: downloadURL})
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
        if (postImg !== null) {
            uploadPostImg();
}
    }, [postImg])
  
  
    const getUserProfile = () => {
      const findUser = allUser.find((profile: any) => {
        return profile.userID === loggedInUser?.uid
      })
      setUserPersonalInfo(findUser); 
  }
  
  
  useEffect(() => {
    getUserProfile();
  }, [allUser, loggedInUser])
    
    return <div className={` ${displayPro} fixed flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 h-full w-full bg-Tp z-[1000]`}>
    <div className="bg-slate-50 overflow-y-auto md:w-[700px] w-full md:h-[90vh] h-full p-4 md:rounded-[10px]  ">
      <div className="flex justify-between items-center mb-[20px]">
        <h1 className="text-center font-bold capitalize  text-[20px]">Publish a post</h1>
        <h1 onClick={() => setPublishPost("hidden")} className="uppercase text-white bg-slate-900 focus:bg-slate-500 cursor-pointer text-[30px] px-[18px] rounded-full py-[5px] ">X</h1>
      </div>
      <form action="" className="flex flex-col gap-1">
        <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
          <label htmlFor="userName" className="font-bold">Post contents</label>
          <hr />
          <textarea onChange={(e) => setThePost({...thePost, postContent: e.target.value})}  className="bg-transparent min-w-[300px] min-h-[200px] outline-none" placeholder="Type your post contents here"></textarea>
        </div>
                <div className="flex items-center">
                   {thePost.imageInfo && <Image width={50} height={50} src={thePost.imageInfo} className="w-[50px] h-[50px] rounded-[20px]" alt="post image" />}
                <input accept="image" type="file" onChange={(e) => {
                                    setPostImg(e.target.files?.[0])
                                  }} name="image" className="hidden" id="image" />
                                  <label htmlFor="image" className=" bg-slate-50 rounded-full text-[50px]   " >
                                     <FcAddImage className="bg-slate-"/>
                                  </label>
       </div>
      </form>
      <button onClick={publishPostFn} className="bg-slate-900  py-[15px]  w-[50%] text-[20px] text-slate-50 rounded ">Publish</button>
</div>
  </div>
}