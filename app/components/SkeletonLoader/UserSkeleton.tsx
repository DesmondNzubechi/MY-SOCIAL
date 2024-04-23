import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

import './PostSkeleton.css'; // Import CSS file for styling


export const UserSkeletonLoader = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(true); // Simulating data loading completion after 2 seconds
      }, 2000);
  
      return () => clearTimeout(timer); 
    }, []);

    return <div  className=" animate-skeleton-loading hover:bg-white w-[300px] md:-[350px] l:w-[400px] rounded p-2">
    <div>
    <div className="flex gap-1 w-full flex-row items-start">
            <FaUserCircle className="text-[50px] text-slate-200 bg-slate-50 rounded-full shadow-2xl " />
            <div className="flex w-full flex-col gap-2">
                <div className="flex flex-row items-start gap-x-[50px] w-full justify-between ">
                    <div className="flex flex-col gap-1 w-full">
                        <h1 className="font-medium text-slate-900 bg-slate-200 h-[30px] w-full capitalize"></h1>
                        <h2 className="text-slate-500 font-[500] bg-slate-200 h-[30px] w-[50%] text-[15px] capitalize "></h2>
                    </div>
                   <button className="bg-sky-500 rounded-[5px]  hover:bg-sky-600 text-slate-50 px-2 bg-slate-200 h-[30px] w-[100px] py-1 text-[15px]"></button>
                </div>
                <p className="text-[15px] font-[400] w-full bg-slate-200 h-[50px] text-slate-900"></p>
            </div>
</div>
    </div>

</div>
}