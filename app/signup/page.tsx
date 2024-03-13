"use client";
import Image from "next/image";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../components/config/firebase";
import { useRouter } from "next/navigation";
import { userAuth } from "../components/auths/auth";
import { redirect } from "next/navigation";
import { setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { AllUser } from "../components/allUser/allUser";
export default function Home() {
  const allUser = AllUser();
  const [showPassword, setShowPassword] = useState('password')
  const [userDetails, setUserDetails] = useState({
    username: '',
    userEmail: '',
    userPassword: '',
    userConfirmPassword : ''
  })
  const router = useRouter();

  const registerUser = async () => {
    if (userDetails.username === '') {
      alert('Please insert username')
      return;
    } else if (userDetails.userEmail === '') {
      alert("please insert email")
      return;
    } else if (userDetails.userPassword === '') {
      alert("please input password")
      return;
    } else if (userDetails.userConfirmPassword === '') {
      alert("please confirm password")
      return;
    } else if (userDetails.userPassword !== userDetails.userConfirmPassword) {
      alert("password doe not match")
      return;
    } else if (userDetails.userConfirmPassword === '' &&
      userDetails.userPassword === '' &&
      userDetails.userEmail === '' &&
      userDetails.username === ''
      ) {
      alert("Please fill in your details")
      return;
}
    try {
      const res = await createUserWithEmailAndPassword(auth, userDetails.userEmail, userDetails.userPassword);
      await updateProfile(res.user, {
     displayName: userDetails.username  
      })
      await setDoc(doc(db, "users", res.user.uid), {
        userID: res.user.uid,
        username: res.user.displayName,
        useremail: res.user.email,
        userPic: res.user.photoURL
      });

      await setDoc(doc(db, "UserChats", res.user.uid), {})
router.push('/')
    } catch (error) { 
      alert(error)
    }
  }
  const user = userAuth();

//   const startChat = async (theUserID: string) => {
//     try {
//         // Iterate through all users
//         for (const user of allTheUsers) {
//             // Skip the current user
//             if (user.userID === currentUser.userID) {
//                 continue;
//             }

//             // Combine user IDs
//             const combinedId =
//                 currentUser.userID > user.userID
//                     ? currentUser.userID + user.userID
//                     : user.userID + currentUser.userID;

//             // Assuming 'db' is your Firestore database reference
//             const docRef = doc(db, "chats", combinedId);
//             const res = await getDoc(docRef);

//             // Check if the document exists, and create if not
//             if (!res.exists()) {
//                 await setDoc(docRef, { message: [] });
//             }

//             // Update UserChats for the current user
//             await updateDoc(doc(db, 'UserChats', currentUser.userID), {
//                 [combinedId + ".userInfo"]: {
//                     userID: user.userID,
//                     username: user.username,
//                     userPic: user.userPic,
//                 },
//                 lastMessage: '',
//                 [combinedId + ".date"]: serverTimestamp(),
//             });

//             // Update UserChats for the other user
//             await updateDoc(doc(db, 'UserChats', user.userID), {
//                 [combinedId + ".userInfo"]: {
//                     userID: currentUser.userID,
//                     username: currentUser.username,
//                     userPic: currentUser.userPic,
//                 },
//                 lastMessage: '',
//                 [combinedId + ".date"]: serverTimestamp(),
//             });
//         }
//     } catch (error) {
//         alert(error);
//     }
// };


  console.log(userDetails);
  return (
      user ? redirect('/') :
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form className="grid md:grid-cols-2 gap-5 items-center justify-center rounded shadow-2xl bg-slate-900 py-[30px] px-[30px]" action="">
        <h1 className="font-bold uppercase text-white text-center md:col-span-2 text-[40px] ">Myu Chat</h1>
        <input value={userDetails.username} onChange={(e) => {
          let value = e.target.value;
          setUserDetails({...userDetails, username:value })
          }} className=" text-center w-full p-2 rounded placeholder:text-[#555]  border outline-none" type="text" name="Username" placeholder="Username"  id="" />
      
        <input onChange={(e) => {
          let value = e.target.value;
          setUserDetails({...userDetails, userEmail: value})
          }} className=" text-center w-full p-2 rounded placeholder:text-[#555]  border outline-none" type="email" name="email" placeholder="Email"  id="email" />
        <div className="flex items-center p-2 rounded bg-slate-50">
          <input onChange={(e) => {
            let value = e.target.value;
            setUserDetails({...userDetails, userPassword: value})
          }} className=" text-center rounded-l bg-transparent w-full   placeholder:text-[#555]  outline-none" type={showPassword} name="Password" placeholder="Password" id="password" />
            {showPassword === 'password'? <AiFillEye onClick={() => setShowPassword('text')} className="text-[30px] hover:text-slate-500 active:text-slate-900 "/> :
            <AiFillEyeInvisible onClick={() => setShowPassword('password')} className="text-[30px] hover:text-slate-500 active:text-slate-900"/>}
        </div>
        <div className="flex items-center p-2 rounded bg-slate-50">
          <input onChange={(e) => {
            let value = e.target.value;
            setUserDetails({...userDetails, userConfirmPassword: value})
        }} className=" text-center rounded-l bg-transparent w-full   placeholder:text-[#555]  outline-none" type={showPassword} name="Password" placeholder="Confirm Password" id="confirm password" />
            {showPassword === 'password'? <AiFillEye onClick={() => setShowPassword('text')} className="text-[30px] hover:text-slate-500 active:text-slate-900 "/> :
            <AiFillEyeInvisible onClick={() => setShowPassword('password')} className="text-[30px] hover:text-slate-500 active:text-slate-900"/>}
        </div>
        <button onClick={registerUser} type="button" className="border md:col-span-2  w-full rounded text-slate-50 p-2 font-semibold">Sign Up</button>
       <p className="text-slate-400 text-center md:col-span-2 ">Already have an account? <Link className="text-slate-50" href='/login'>Login</Link></p>
   </form>
    </main>
  );
}
