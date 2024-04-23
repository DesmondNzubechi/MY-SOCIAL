import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { BiImage } from 'react-icons/bi';
import './PostSkeleton.css'; // Import CSS file for styling

export const PostSkeleton = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const timer = setTimeout(() => { 
      setIsLoading(true); // Simulating data loading completion after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="post-skeleton overflow-x-hidden shadow-xl border bg-white p-2 gap-[20px] rounded-[10px] flex-col flex">
      {isLoading ? (
        <>
          <div className="animate-skeleton-loading flex gap-1 flex-row items-center">
            <h1 className="font-bold flex items-center gap-1 ">
              <FaUserCircle className="text-[30px] text-slate-200 rounded-full shadow-2xl" />
              <p className="skeleton-block bg-slate-200 h-[30px] rounded w-[120px]"></p>
            </h1>
            <span className="skeleton-block bg-slate-200 h-[30px] rounded w-[100px]"></span>
            <GoDotFill className="text-slate-100" />
            <p className="skeleton-block bg-slate-200 h-[30px] rounded w-full"></p>
          </div>
          <div className="flex animate-skeleton-loading flex-col gap-1">
            <p className="skeleton-block bg-slate-200  h-[70px] rounded"></p>
            <button
              type="button"
              className="font-bold h-[30px] w-[40%] bg-slate-200 rounded"
            ></button>
          </div>
          <div className="bg-slate-200 animate-skeleton-loading rounded  h-[100px]">
            <BiImage className="text-[100px] text-white" />
          </div>
          <div className="flex items-center animate-skeleton-loading gap-1 border-t border-b py-[5px] justify-around">
            <div className="bg-slate-200 h-[30px] rounded w-[70px]">
              <p className="text-slate-500"></p>
            </div>
            <div className="bg-slate-200 h-[30px] rounded w-[70px]">
              {' '}
              <p className="text-slate-500"></p>
            </div>
            <div className="bg-slate-200 h-[30px] rounded w-[70px]">
              <p className="text-slate-500"></p>
            </div>
          </div>
          <div className="py-[10px] animate-skeleton-loading w-full bg-slate-50 flex items-center justify-around px-[20px] gap-1">
            <input
              type="text"
              placeholder=""
              disabled={true}
              className="w-full outline-none bg-transparent"
            />
            <button
              disabled
              type="button"
              className="bg-slate-200 p-2 rounded w-[120px] h-[30px] text-slate-50"
            ></button>
          </div>
        </>
      ) : null}
    </div>
  );
};
