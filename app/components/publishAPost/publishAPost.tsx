import { FcAddImage } from "react-icons/fc";

export const PublishAPost = () => {
    return  <div className="fixed flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 h-full w-full bg-Tp z-[1000]">
    <div className="bg-slate-50 overflow-y-auto md:w-[700px] w-full md:h-[90vh] h-full p-4 md:rounded-[10px]  ">
      <div className="flex justify-between items-center mb-[20px]">
        <h1 className="text-center font-bold capitalize  text-[20px]">Publish a post</h1>
        <h1 className="uppercase text-white bg-slate-900 focus:bg-slate-500 cursor-pointer text-[30px] px-[18px] rounded-full py-[5px] ">X</h1>
      </div>
      <form action="" className="flex flex-col gap-1">
        <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
          <label htmlFor="userName" className="font-bold">Post contents</label>
          <hr />
          <textarea  className="bg-transparent min-w-[300px] min-h-[200px] outline-none" placeholder="Type your post contents here"></textarea>
        </div>
                <div>
                <input type="file" onChange={(e) => {
                                     // setDp(e.target.files?.[0])
                                  }} name="image" className="hidden" id="image" />
                                  <label htmlFor="image" className=" bg-slate-50 rounded-full text-[50px]   " >
                                     <FcAddImage className="bg-slate-"/>
                                  </label>
       </div>
      </form>
      <button className="bg-slate-900  py-[15px]  w-[50%] text-[20px] text-slate-50 rounded ">Publish</button>
</div>
  </div>
}