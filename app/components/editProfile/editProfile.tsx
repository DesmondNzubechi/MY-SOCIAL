import React, { useState } from "react"
import { personalInfo } from "@/app/my-profile/page"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
export const EditProfile = ({ setShowEditProfile, userInfo, setUserPersonalInfo }: { setShowEditProfile: React.Dispatch<React.SetStateAction<boolean>>, userInfo: personalInfo, setUserPersonalInfo: React.Dispatch<React.SetStateAction<personalInfo>> }) => {
  const [profileInfo, setProfileInfo] = useState<personalInfo>(userInfo);

  const updateProfile = async () => {
    
    try {
      const userRef = doc(db, "users", profileInfo.userID);
    await updateDoc(userRef, {
      ...profileInfo
    })
      toast.success("User profile successfully updated.Kindly refresh the page to see the new change.", {
        hideProgressBar: true,
        autoClose: 5000, 
        position: "top-center",
        pauseOnHover: true
      })
      setShowEditProfile(false)
    } catch (error) {
      toast.error("an error occured while trying to update your profile. Please try again", {
        hideProgressBar: true,
        autoClose: 5000, 
        position: "top-center",
        pauseOnHover: true
      })
    }
  }

    return ( 
        <div className="fixed  flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 h-full w-full bg-Tp z-[1000]">
        <div className="bg-slate-50 overflow-y-auto md:w-[700px] w-full md:h-[90vh] p-4 md:rounded-[10px]  ">
          <div className="flex justify-between items-center mb-[20px]">
            <h1 className="text-center font-bold capitalize  text-[20px]">Edit profile</h1>
            <h1 onClick={() => setShowEditProfile(false)} className="uppercase text-white bg-slate-900 focus:bg-slate-500 cursor-pointer text-[30px] px-[18px] rounded-full py-[5px] ">X</h1>
          </div>
          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="userName" className="font-bold">Username:</label>
              <hr />
              <input disabled type="text" onChange={(e) => {
                setProfileInfo({...profileInfo, username:e.target.value })
              }} value={profileInfo.username} className="bg-transparent outline-none" placeholder="Username..."/>
            </div>
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="userName" className="font-bold">Bio:</label>
              <hr />
              <textarea onChange={(e) => {
                setProfileInfo({...profileInfo, bio:e.target.value })
              }} className="bg-transparent min-w-[300px] min-h-[200px] outline-none" placeholder="Bio">{profileInfo.bio}</textarea>
            </div>
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="userName" className="font-bold">❤️Favorite:</label>
              <hr />
              <input type="text" onChange={(e) => {
                setProfileInfo({...profileInfo, favorite:e.target.value })
              }} value={profileInfo.favorite} className="bg-transparent outline-none" placeholder="Favorite"/>
            </div>
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="location" className="font-bold">Location:</label>
              <hr />
              <input type="text" onChange={(e) => {
                setProfileInfo({...profileInfo, location:e.target.value })
              }} value={profileInfo.location} className="bg-transparent outline-none" placeholder="Location"/>
            </div>
          </form>
          <button onClick={updateProfile} className="bg-slate-900 mt-[20px] py-[15px]  w-full text-slate-50 rounded ">Update Profile</button>
</div>
      </div>
    )
}