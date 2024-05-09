"use client";
import Image from "next/image";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { userAuth } from "../components/auths/auth";
import { redirect } from "next/navigation";
import { auth } from "../components/config/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import { TbSocial } from "react-icons/tb";
export default function Login() {
  const user = userAuth();
  const [showPassword, setShowPassword] = useState('password')
  const router = useRouter();
  const [signInState, setSignInState] = useState<boolean>(true)
  const [userDetails, setUserDertails] = useState<any>({
    email: '',
    password: ''
  })
  const signInUser = async () => {
    setSignInState(false);
    
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!userDetails.email || !emailPattern.test(userDetails.email)) {
      toast.error("Please provide a valid email address", {
        hideProgressBar: true
      });
      setSignInState(true);
      return;
    }
    
    if (!userDetails.password) {
      toast.error("Please provide your password", {
        hideProgressBar: true
      });
      setSignInState(true);
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      setUserDertails({
        email: '',
        password: ''
      });
      setSignInState(true);
      //router.push("/");
      toast.success("Login Successful", {
        hideProgressBar: true
      });
    } catch (error) {
      setSignInState(true);
      toast.error("An Error Occurred. Please Try Again", {
        hideProgressBar: true,
        autoClose: 5000
      });
    }
  };
  
  return (
      <>{ user? redirect('/') :
      <div className="flex min-h-screen  flex-col items-center  justify-center py-[30px]">
        <div className="flex flex-col gap-[20px] items-center bg-slate-900 px-[20px] py-[20px] rounded">
        <div className="flex justify-center md:col-span-2 flex-row gap-0 items-center">
          <h1 className="text-slate-50 text-[20px] font-bold mr-[-30px]">MY</h1>
          <TbSocial className="text-slate-50 text-[100px]"/>
          <h1 className="text-slate-50 text-[20px] font-bold ml-[-30px]">Social</h1>
        </div>
    <form className="grid  gap-5 items-center justify-center rounded   py-[30px] " action="">
       
          <input value={userDetails.email} onChange={(e) => setUserDertails({...userDetails, email: e.target.value})} className=" text-center w-full p-2 rounded placeholder:text-[#555]  border outline-none" type="email" name="email" placeholder="Email"  id="email" />
        <div className="flex items-center p-2 rounded bg-slate-50">
            <input value={userDetails.password} onChange={(e) => setUserDertails({...userDetails, password: e.target.value})} className=" text-center rounded-l bg-white w-full   placeholder:text-[#555]  outline-none" type={showPassword} name="Password" placeholder="Password" id="password" />
            {showPassword === 'password'? <AiFillEye onClick={() => setShowPassword('text')} className="text-[30px] hover:text-slate-500 active:text-slate-900 "/> :
            <AiFillEyeInvisible onClick={() => setShowPassword('password')} className="text-[30px] hover:text-slate-500 active:text-slate-900"/>} 
        </div>
       
        {signInState ? <button onClick={signInUser} type="button" className="border   w-full rounded text-slate-50 p-2 font-semibold">Login</button> : <button  type="button" className="border   w-full rounded text-slate-50 p-2 font-semibold">Login In Progress...</button> }
       <p className="text-slate-400 text-center  ">Don't have an account yet? <Link className="text-slate-50" href='/signup'>Sign up</Link></p>
   </form>
        </div>
        </div>}
      </>
  );
}
