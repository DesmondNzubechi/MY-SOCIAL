"use client";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoIosChatbubbles } from "react-icons/io";

const User = () => {

    let userChat = [
        {
            name: 'Nzube',
            message: "How are you doing",
            id: "jsdhh",
            userImg: ''
        },
        {
            name: 'og man',
            message: "How are you doing",
            id: "js",
            userImg: ''
        }
    ]

    return (
        <div className="py-[20px] fixed w-full flex flex-row items-start gap-5  justify-around">
            <div className=" hidden md:flex flex-col max-h-[100vh] overflow-y-auto gap-5 overflow-x-hidden px-[30px] py-[20px] items-center ">
                <h1 className="uppercase text-[30px] text-center font-bold">myu chat</h1>
                <div className="flex flex-col gap-5">
                <div className="flex items-center border px-5 border-[2px] bg-slate-100 gap-1 rounded-[20px] justify-center">
                    <input type="search" name="" className="outline-none bg-transparent p-2" placeholder="Serach for messages" id="" />
                    <IoMdSearch />
                </div>
                <div className="flex flex-col gap-5">
                <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr /> <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr /> <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr /> <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr /> <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr /> <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[40px] "/>
                    <div className="flex flex-col gap-[5px]">
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]"/> <p className="text-slate-400 text-[12px]">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                    </div>
                    </div>
                    </Link>
                    <hr />
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-x-none gap-y-[50px] px-[20px] relative  justify-around w-full ">
                <div className="flex items-center flex-col gap-y-[50px]">
                <div className="flex items-center  self-start  gap-2">
                    <FaUserCircle className="text-[40px]"/>
                    <p className="p-[10px] bg-sky-500 text-[20px] text-white rounded-tl-[10px] rounded-r-[15px] ">What's good?</p>
                </div>
                <div className="flex items-center self-end align-end gap-2">
                   
                    <p className="p-[10px] bg-sky-500 text-[20px] text-white rounded-tr-[10px] rounded-l-[15px] ">What's good?</p>
                    <FaUserCircle className="text-[40px]"/>
                </div>
                </div>
                <form action=""  className="left-0 md:left-[360px] flex right-0 items-center p-2 rounded fixed bg-slate-200 bottom-0">
                    <input type="text" name="" placeholder="Write you message here" className=" py-[10px] text-[20px] bg-transparent outline-none  w-full rounded " id="" />
                    <button className="bg-sky-500 py-[10px] shadow-2xl rounded-[7px] text-slate-50 text-[20px]  px-[20px]">Send</button>
           </form>
            </div>
        </div>
    )
}

export default User;