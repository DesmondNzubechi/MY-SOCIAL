"use client"
import { FaUserCircle } from "react-icons/fa";
import CoverPics from '../../../public/codes.jpg';
import { FaCommentAlt } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { BiRepost } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
export const FullPost = () => {
    return (
        <div>
              <div className="fixed hidden flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 h-full w-full bg-Tp z-[1000]">
        <div className="bg-slate-50 relative overflow-y-auto md:w-[700px] w-full md:h-[90vh] p-4   ">
       
          <div className=" p-2 gap-[20px] relative pb-[70px] flex-col flex">
            <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex items-center ">  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />@Nzubechukwu(B2R)</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">2nd March 2024</p>
            </div>
            <div className="">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            
            </div>
            <Image src={CoverPics} className=" " alt="post pic" />
            <div className="flex items-center border-t border-b bg-slate-50 py-[10px] justify-around">
              <div className=" flex items-center p-[5px] gap-x-[5px] rounded"><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">20 Comments</p></div>
              <div className=" flex items-center p-[5px] gap-x-[5px] rounded"><SlLike className="text-[20px] "/> <p className="text-slate-500">50 Likes</p></div>
              <div className=" flex items-center p-[5px] gap-x-[5px] rounded"><BiRepost className="text-[20px] " /><p className="text-slate-500">10 Repost</p></div>
                        </div>
                        {/* COMMENTS UNDER POST */}
                        <div className="flex flex-col gap-5">
                            <h1 className="font-bold text-slate-700 text-[30px] my-[20px] border-b w-fit">Comments section</h1>
                        <div className="flex flex-start gap-1">
                            <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />
                            <div className="flex flex-col gap-1 bg-slate-200 rounded-bl-[20px]  rounded-r-[20px] p-3">
                        <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex items-center "> @Nzubechukwu</h1> <span className="text-slate-500 text-[10px] ">Commented</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">2nd March 2024</p>
            </div>
            <p>What are you talking about exactly?</p>
          </div>
                            </div>
                            <div className="flex flex-start gap-1">
                            <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />
                            <div className="flex flex-col gap-1 bg-slate-200 rounded-bl-[20px]  rounded-r-[20px] p-3">
                        <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex items-center "> @Nzubechukwu</h1> <span className="text-slate-500 text-[10px] ">Commented</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">2nd March 2024</p>
            </div>
            <p>What are you talking about exactly?</p>
          </div>
                            </div>
                            <div className="flex flex-start gap-1">
                            <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />
                            <div className="flex flex-col gap-1 bg-slate-200 rounded-bl-[20px]  rounded-r-[20px] p-3">
                        <div className="flex gap-1 flex-row items-center">
              <h1 className="font-bold flex items-center "> @Nzubechukwu</h1> <span className="text-slate-500 text-[10px] ">Commented</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">2nd March 2024</p>
            </div>
            <p>What are you talking about exactly?</p>
          </div>
                        </div>
                        </div>
                      
                        {/* ADD YOUR COMMENTS */}
                        <div className="bg-slate-50 bottom-0 md:left-[24%] md:right-[24%] fixed left-0 right-0 border-t md:bottom-[20px] p-2">
                        <div className="py-[10px] w-full bg-white flex items-center justify-around px-[20px] gap-1">
                <input type="text" placeholder="Input your comment" className="w-full outline-none bg-transparent" />
                <button type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
                            </div>
                      </div>
                        </div>
                        </div>
</div>
      </div>
     
    )
}