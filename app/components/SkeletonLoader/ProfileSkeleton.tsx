"use client";
import { FaUserCircle } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import 'react-toastify/ReactToastify.css';
import './PostSkeleton.css'; // Import CSS file for styling



export const ProfileSkeleton = () => {
    return  <div className="relative animate-skeleton-loading post-skeleton max-w-[500px] mb-[20px] px-[20px]">
      
        <div className="h-[200px]  bg-slate-200 rounded w-[400px]">

        </div>
                              <label className="absolute bg-slate-50  rounded-full text-[30px] p-1 top-[70px] right-[50px] " >
                                 <FaPlus className="text-slate-200"/>
                              </label>
    <div className="absolute top-[130px] ">
    <div className="items-center flex relative">
                          
                          <FaUserCircle className="text-[200px]  bg-slate-50 text-slate-200 rounded-full shadow-2xl " />
                             </div>
    </div>
    <button  className="absolute top-[300px] right-[30px] bg-slate-200  border p-2 rounded-[5px] h-[50px] w-[150px]  text-slate-700 text-[20px] "></button>
    <div className="pt-[180px] flex flex-col gap-y-[20px]">
      <div className="flex flex-col  gap-2">
        <h1 className="font-bold text-[20px] w-[250px] h-[40px] bg-slate-200 rounded text-slate-900 capitalize"></h1>
        <p className="font-[500] w-[200px] h-[40px] bg-slate-200 rounded text-slate-500"></p>
      </div>
      <div className="h-[100px]  w-full bg-slate-200 w-[450px] rounded">
      </div>
      <div className="h-[30px] w-full bg-slate-200 w-[250px] rounded">
      </div>
    </div>
  </div>
}