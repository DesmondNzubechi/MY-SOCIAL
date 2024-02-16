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
export default function Login() {
  const user = userAuth();
  const [showPassword, setShowPassword] = useState('password')
  
  const [userDetails, setUserDertails] = useState<any>({
    email: '',
    password: ''
  })

  const signInUser = async () => {
    if (userDetails.email === '') {
      alert("please input your email");
      return;
    } else if (userDetails.password === '') {
      alert("please input password")
      return;
    } else if (userDetails.email === '' && userDetails.password === '') {
      alert("fill in the field please");
      return;
}
    try {
      await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      setUserDertails({
        email: '',
        password: ''
      })
    } catch (error: any) {
      alert(error.message)
    }
  }
  return (
      <>{ user? redirect('/chat') :
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
    <form className="grid  gap-5 items-center justify-center rounded shadow-2xl bg-slate-900 py-[30px] px-[30px]" action="">
        <h1 className="font-bold uppercase text-white text-center  text-[40px] ">Myu Chat</h1>
          <input value={userDetails.email} onChange={(e) => setUserDertails({...userDetails, email: e.target.value})} className=" text-center w-full p-2 rounded placeholder:text-[#555]  border outline-none" type="email" name="email" placeholder="Email"  id="email" />
        <div className="flex items-center p-2 rounded bg-slate-50">
            <input value={userDetails.password} onChange={(e) => setUserDertails({...userDetails, password: e.target.value})} className=" text-center rounded-l bg-transparent w-full   placeholder:text-[#555]  outline-none" type={showPassword} name="Password" placeholder="Password" id="password" />
            {showPassword === 'password'? <AiFillEye onClick={() => setShowPassword('text')} className="text-[30px] hover:text-slate-500 active:text-slate-900 "/> :
            <AiFillEyeInvisible onClick={() => setShowPassword('password')} className="text-[30px] hover:text-slate-500 active:text-slate-900"/>} 
        </div>
       
        <button onClick={signInUser} type="button" className="border   w-full rounded text-slate-50 p-2 font-semibold">Login</button>
       <p className="text-slate-400 text-center  ">Don't have an account yet? <Link className="text-slate-50" href='/'>Sign up</Link></p>
   </form>
      </div>}
      </>
  );
}
