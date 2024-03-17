import { FcAddImage } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/firebase";
import Image from "next/image";
import { v4 as uuid } from 'uuid';
import { doc, setDoc } from "firebase/firestore";
import { userAuth } from "../auths/auth";
import { toast } from "react-toastify";

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
//   const currentDate: Date = new Date();
//   const options: Intl.DateTimeFormatOptions = {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     weekday: 'long', // or 'short', 'narrow', or undefined
// };

//   const loggedInUser = userAuth();
// const fullDate: string = currentDate.toLocaleString(undefined, options);


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
  
  console.log(thePost)

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
        authorId: loggedInUser.uid,
        authorName: loggedInUser.displayName,
        authorPics: loggedInUser.photoURL,
        postComment: [],
        postLike: [],
        postRepost: []
      })
        const notification = () => toast('Post succesfully published');
        notification();
        setThePost({  imageInfo:'',
        postContent: "",
        postId: "",
        postDate: fullDate,
        authorName: "",
        authorId: "",})
    } catch (error) {
      alert(error)
    }
  }

    const uploadPostImg = async () => {
        const imgRef = ref(storage, 'PostImgs');
        try {
            const imgName = ref(imgRef, postImg.name);
            const uploadPhoto = await uploadBytes(imgName, postImg);
            const downloadURL = await getDownloadURL(uploadPhoto.ref);
            setThePost({...thePost, imageInfo: downloadURL})
alert("success")
        } catch (error) {
           alert(error) 
        }
    }

    useEffect(() => {
        if (postImg !== null) {
            uploadPostImg();
}
    }, [postImg])
    
    return <div className="bg-slate-50 fixed justify-center  hidden md:flex flex-col left-[50px] overflow-y-auto w-fit top-[100px]  md:h-[70vh] h-full p-4 md:rounded-[10px]  ">
      <div className="flex justify-between items-center mb-[20px]">
        <h1 className="text-center font-bold uppercase text-center text-[20px]">Publish a post</h1>
      </div>
      <form action="" className="flex flex-col gap-1">
        <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
          <textarea onChange={(e) => setThePost({...thePost, postContent: e.target.value})}  className="bg-transparent w-[300px] h-[200px] outline-none" placeholder="Write your post contents here..."/>
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
            <button type="button" onClick={publishPostFn} className="bg-sky-500  py-[5px]  w-[50%] text-[20px] text-slate-50 rounded ">Publish</button>
      </form>
</div>
 
}