"use client";
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoIosChatbubbles } from "react-icons/io";
import { useState, useEffect } from 'react';
import './PostSkeleton.css'; // Import CSS file for styling




const StartChatSkeletonLoader = () => {
   
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(true); // Simulating data loading completion after 2 seconds
      }, 2000);
  
      return () => clearTimeout(timer); 
    }, []);
    const chatLoader = [0, 0, 0, 0 ,0, 0]
    return (
    
                   <div className="flex flex-col h-[100vh] w-[100%]  overflow-y-scroll gap-5 px-[10px] py-[20px] pt-[100px]  bg-slate-100 items-center ">
                        <h1 className="uppercase   text-[30px] text-center font-bold">ALL THE CHATs</h1>
                       
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center  border px-5 border-[2px] bg-slate-100 gap-1 rounded-[10px] justify-center">
                                <input type="search" name="" disabled className="outline-none w-full bg-transparent p-2" placeholder="Serach for messages" id="" />
                                <IoMdSearch />
                            </div>
                            <div className="flex w-full flex-col gap-5">
                              
                             
                   
                    {
                chatLoader.map((chat: number) => {
                 return   <div className="flex w-[100%] md:w-[50%] gap-2 items-center">
                 <FaUserCircle className="text-[40px] text-slate-200 " />
                  <div className="flex flex-col gap-[5px]">
                      <div className="flex items-center flex-row gap-2">
                              <h1 className="text-slate-900 text-[15px] uppercase bg-slate-200 h-[30px] w-[150px] font-bold font-semibold"></h1> <p className="text-slate-500 italic bg-slate-200 h-[30px] w-[150px] text-[15px]"></p>
                          </div>  
                     <div>
                              <p className="text-slate-500 bg-slate-200 h-[30px] w-[150px] text-[15px]"></p>
                      </div>
                      </div>
                  </div>
                })
            }
                                           
                            </div>
                        </div>
                    </div>
                    )
}

export default StartChatSkeletonLoader;