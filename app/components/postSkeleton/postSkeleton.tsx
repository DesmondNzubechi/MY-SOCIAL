import 
export const PostSkeleton = () => {
    return     <div className="py-[50px] ">
    <div className="shadow-xl border  p-2 gap-[20px] rounded-[10px] flex-col flex">
      <div className="flex gap-1 flex-row items-center">
        <h1 className="font-bold flex items-center ">  <FaUserCircle className="text-[30px] bg-slate-50 rounded-full shadow-2xl " />@Nzubechukwu(B2R)</h1> <span className="text-slate-500 ">posted this</span> <GoDotFill/> <p className="text-slate-500 text-[10px]">2nd March 2024</p>
      </div>
      <div className="">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <button type="button" className="font-bold">See More...</button>
      </div>
      <Image src={CoverPics} className="rounded-[10px] " alt="post pic" />
      <div className="flex items-center border-t border-b py-[5px] justify-around">
        <div className=" border-r flex items-center p-[5px] gap-x-[5px] "><FaCommentAlt className="text-[20px] "/> <p className="text-slate-500">20 Comments</p></div>
        <div className=" flex items-center p-[5px] gap-x-[5px] "><SlLike className="text-[20px] "/> <p className="text-slate-500">50 Likes</p></div>
        <div className=" flex items-center p-[5px] gap-x-[5px] border-l "><BiRepost className="text-[20px] " /><p className="text-slate-500">10 Repost</p></div>
      </div>
    
        <div className="py-[10px] w-full bg-slate-50 flex items-center justify-around px-[20px] gap-1">
          <input type="text" placeholder="Input your comment" className="w-full outline-none bg-transparent" />
          <button type="button" className="bg-sky-500 p-2 rounded text-slate-50">Comment</button>
        </div>
     
    </div>
  </div>
}