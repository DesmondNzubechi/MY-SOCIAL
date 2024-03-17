import { FcAddImage } from "react-icons/fc";
import "./PostSkeleton.css";

export const PublishAPostSideBarSkeleton = () => {
 
    return <div className="bg-white animate-skeleton-loading shadow fixed justify-center  hidden md:flex flex-col left-[50px] overflow-y-auto w-fit top-[120px]  md:h-[70vh] h-full p-4 md:rounded-[10px]  ">
      <div className="flex justify-between items-center mb-[20px]">
        <h1 className="text-center h-[30px] rounded bg-slate-200 w-full font-bold uppercase text-center text-[20px]"></h1>
      </div>
      <form action="" aria-disabled className="flex flex-col gap-1">
        <div className="flex flex-col  rounded  p-1 gap-1 ">
          <textarea  disabled  className="bg-slate-200 w-[300px] rounded h-[200px] outline-none" placeholder=""/>
        </div>
                <div className="flex items-center">
                  
                <input accept="image" type="file" disabled  name="image" className="hidden" id="image" />
                                  <label  className=" bg-slate-200 h-[50px] rounded w-[70px]   " >
                                    
                </label>
            </div>
            <button type="button"  className="bg-slate-200 h-[30px] rounded  w-[50%]  "></button>
      </form>
</div>
 
}