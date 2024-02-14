"use client";
import Image from "next/image";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {

  const [showPassword, setShowPassword] = useState('password')
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
    <form className="grid  gap-5 items-center justify-center rounded shadow-2xl bg-slate-900 py-[30px] px-[30px]" action="">
        <h1 className="font-bold uppercase text-white text-center  text-[40px] ">Myu Chat</h1>
          <input className=" text-center w-full p-2 rounded placeholder:text-[#555]  border outline-none" type="email" name="email" placeholder="Email"  id="" />
        <div className="flex items-center p-2 rounded bg-slate-50">
          <input className=" text-center rounded-l bg-transparent w-full   placeholder:text-[#555]  outline-none" type={showPassword} name="Password" placeholder="Password" id="" />
            {showPassword === 'password'? <AiFillEye onClick={() => setShowPassword('text')} className="text-[30px] hover:text-slate-500 active:text-slate-900 "/> :
            <AiFillEyeInvisible onClick={() => setShowPassword('password')} className="text-[30px] hover:text-slate-500 active:text-slate-900"/>}
        </div>
       
        <button type="button" className="border   w-full rounded text-slate-50 p-2 font-semibold">Login</button>
       <p className="text-slate-400 text-center  ">Don't have an account yet? <Link className="text-slate-50" href='/'>Sign up</Link></p>
   </form>
  </div>
  );
}
