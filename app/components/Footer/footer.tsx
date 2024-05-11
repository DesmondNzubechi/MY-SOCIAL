"use client"
import Image from "next/image"
import { MdOutlineMail } from "react-icons/md"
import { TbSocial } from "react-icons/tb";
export const Footer = () => {
    return (
        <div className="bg-slate-900">
        <div className="bg-slate-900 p-5 items-start justify-center  gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-row-reverse items-start gap-2 ">
                <div>
                <h1 className="uppercase text-white font-bold text-[15px] md:text-[20px] ">MYSocial</h1>
           <p className="text-slate-200 md:text-[15px] text-[12px] ">MYsocial is the result of my passion for creating a social space where people can connect, share experiences, and engage in meaningful conversations.</p>
                </div>
                <div className=" max-w-[100px] ">
             <TbSocial className="text-[50px] bg-slate-50 self-center justify-self-center rounded"/>
                </div>
            </div>
            <div className="flex flex-col md:justify-center md:items-center">
                <h1 className="uppercase text-white font-bold md:text-[20px] ">Important links</h1>
            <div className="flex flex-col gap-2">
            <li  className="text-slate-300 md:text-[15px] text-[15px]   ">About Us</li>
            <li  className="text-slate-300 md:text-[15px] text-[15px]   ">Terms</li>
           </div>
            </div>
            <div>
            <div className="flex flex-col gap-2">
    <h1 className="text-slate-100 font-bold uppercase text-[15px] md:text-[20px]">contact</h1>
    <p className="text-slate-500 text-[12px] md:text-[15px]  max-w-[400px]">Get notified whenever we post learning material and news. We will also notify
you from time to time when we make updates to serve you better.</p>
</div>
            </div>
            </div>
           </div>
    )
}