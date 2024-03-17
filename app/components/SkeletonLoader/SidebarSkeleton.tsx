"use client";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import './PostSkeleton.css'; // Import CSS file for styling

export const SideBarSkeleton = () => {
  
    return     <div className="md:col-span-2  bg-white shadow-2xl fixed z-[100] gap-2 top-[120px] w-[300px]  w-[30%]  md:right-[50px] right-[20px] rounded-[20px] p-2 py-[20px] hidden md:flex flex-col justify-center">
  <ul className="flex flex-col gap-3 animate-skeleton-loading items-center ">
      <div className="flex flex-col gap-1 border  rounded-[10px] py-[10px] px-[20px] items-center">
        <FaUserCircle className="text-[100px] text-slate-200 rounded-full  " />
        <h1 className="bg-slate-200 h-[30px] rounded w-[200px]"></h1>
        <button className="bg-slate-200 h-[30px] rounded w-[200px]"></button>
      </div>
    <button className="bg-slate-200 h-[30px] rounded w-full"></button>
      <button className="bg-slate-200 h-[30px] rounded w-full"></button>
      <button className="bg-slate-200 h-[30px] rounded w-full"></button>
      <button type="button" className="bg-slate-200 h-[30px] rounded w-full"></button>
      <button className="bg-slate-200 h-[30px] rounded w-full"></button>
    </ul> 
  </div>
}