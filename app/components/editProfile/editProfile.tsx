
export const EditProfile = () => {
    return (
        <div className="fixed hidden flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 h-full w-full bg-Tp z-[1000]">
        <div className="bg-slate-50 overflow-y-auto md:w-[700px] w-full md:h-[90vh] p-4 md:rounded-[10px]  ">
          <div className="flex justify-between items-center mb-[20px]">
            <h1 className="text-center font-bold capitalize  text-[20px]">Edit profile</h1>
            <h1 className="uppercase text-white bg-slate-900 focus:bg-slate-500 cursor-pointer text-[30px] px-[18px] rounded-full py-[5px] ">X</h1>
          </div>
          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="userName" className="font-bold">Useranme:</label>
              <hr />
              <input type="text" value='Nzubechukwu(B2R)' className="bg-transparent outline-none" placeholder="Username..."/>
            </div>
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="userName" className="font-bold">Bio:</label>
              <hr />
              <textarea  className="bg-transparent min-w-[300px] min-h-[200px] outline-none" placeholder="Bio">Frontend Software Developer | reactJs | NextJs | JavaScript | Typescript | Firebase | Tailwindcss | Crafting Value & Solutions | Sharing Insights in Software Development</textarea>
            </div>
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="userName" className="font-bold">❤️Favorite:</label>
              <hr />
              <input type="text" value='Coding' className="bg-transparent outline-none" placeholder="Favorite"/>
            </div>
            <div className="flex flex-col bg-white rounded shadow-xl border p-1 gap-1 ">
              <label htmlFor="location" className="font-bold">Location:</label>
              <hr />
              <input type="text" value='Nigeria' className="bg-transparent outline-none" placeholder="Location"/>
            </div>
          </form>
          <button className="bg-slate-900 mt-[20px] py-[15px]  w-full text-slate-50 rounded ">Update Profile</button>
</div>
      </div>
    )
}