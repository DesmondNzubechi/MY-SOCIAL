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
import { getDoc, setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { AllUser } from "../components/allUser/allUser";
//import { fullDate } from "../components/publishAPost/publishAPost";
import 'react-toastify/ReactToastify.css';
import { toast } from "react-toastify";
import { TbSocial } from "react-icons/tb";
const currentDate: Date = new Date();
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  //weekday: 'long', // or 'short', 'narrow', or undefined
};


const fullDate: string = currentDate.toLocaleString(undefined, options);

export default function SignUp() {
  const allUser = AllUser();
  const [showPassword, setShowPassword] = useState('password')
  const [signUpState, setSignUpState] = useState<boolean>(true)
  const [userDetails, setUserDetails] = useState({
    username: '',
    userEmail: '',
    userPassword: '',
    userConfirmPassword : ''
  })
  const router = useRouter();

  const registerUser = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userDetails.username === '') {
      toast.info('Please insert username', {
        hideProgressBar: true,
        autoClose: 5000
      })
      return;
    } else if (userDetails.userEmail === '') {
      toast.info('please insert email', {
        hideProgressBar: true,
        autoClose: 5000
      })
      return;
    }  else if (!emailPattern.test(userDetails.userEmail)) {
      toast.info('please input a valid email', {
        hideProgressBar: true,
        autoClose: 5000
      })
      return;
    }  else if (userDetails.userPassword === '') {
      toast.info('please input password', {
        hideProgressBar: true,
        autoClose: 5000
      })
      return;
    } else if (userDetails.userConfirmPassword === '') {
      toast.info('please confirm password', {
        hideProgressBar: true,
        autoClose: 5000
      })
      return;
    } else if (userDetails.userPassword !== userDetails.userConfirmPassword) {
      toast.info('password doe not match', {
        hideProgressBar: true,
        autoClose: 5000
      })
      return;
    } else if (userDetails.userConfirmPassword === '' &&
      userDetails.userPassword === '' &&
      userDetails.userEmail === '' &&
      userDetails.username === ''
    ) {
      toast.info('Please fill in your details', {
        hideProgressBar: true,
        autoClose: 5000
      })
      return;
    }
    setSignUpState(false)
    try { 
      const res = await createUserWithEmailAndPassword(auth, userDetails.userEmail, userDetails.userPassword);
      await updateProfile(res.user, {
        displayName: userDetails.username ,
     photoURL: ''   
      })
      const userRef = doc(db, "users", res.user.uid);
      const resHere = await getDoc(userRef);
      if (!resHere.exists()) {
        await setDoc(userRef, {
          userID: res.user.uid,
          fullname: userDetails.username,
          useremail: userDetails.userEmail,
          userPic: '',
          coverPic: '',
          username: userDetails.username,
          bio: '',
          location: '',
          favorite: '',
          dateJoined: fullDate
        });
      }
     setSignUpState(true)
router.push('/')
    } catch (error) { 
      setSignUpState(true)
      toast.error("An error occured, Please try again.", {
        hideProgressBar: true,
        autoClose: 5000
    })
    }
  }
  const user = userAuth();

  console.log(userDetails);
  return (
      user ? redirect('/') :
    <main className="flex min-h-screen flex-col items-center justify-center py-24">
      <form className="grid md:grid-cols-2 gap-5 min-w-[350px] items-center justify-center rounded  bg-slate-900 py-[30px] px-[30px]" action="">
      <div className="flex justify-center md:col-span-2 flex-row gap-0 items-center">
          <h1 className="text-slate-50 text-[20px] font-bold mr-[-30px]">MY</h1>
          <TbSocial className="text-slate-50 text-[100px]"/>
          <h1 className="text-slate-50 text-[20px] font-bold ml-[-30px]">Social</h1>
        </div>
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
      { signUpState? <button onClick={registerUser} type="button" className="border md:col-span-2  w-full rounded text-slate-50 p-2 font-semibold">Sign Up</button> :   <button type="button" className="border md:col-span-2  w-full rounded text-slate-50 p-2 font-semibold">Sign Up In Progress...</button>}
       <p className="text-slate-400 text-center md:col-span-2 ">Already have an account? <Link className="text-slate-50" href='/login'>Login</Link></p>
   </form>
    </main> 
  );
}
