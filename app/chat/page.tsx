"use client";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
const Chat = () => {

    

    return (
        <div className="py-[50px]">
            <div className="flex flex-col gap-5 items-center">
                <div className="flex items-center border px-5 border-[2px] bg-slate-100 gap-1 rounded-[20px] justify-center">
                    <input type="search" name="" className="outline-none bg-transparent p-2" placeholder="Serach for messages" id="" />
                    <IoMdSearch />
                </div>
                <Link href='' className="flex gap-2 items-center">
                <FaUserCircle className="text-[50px] "/>
                    <div>
                    <div className="flex items-center flex-row gap-2">
                    <h1 className="text-slate-900">Desmond Nzubechukwu</h1> <p className="text-slate-500">@NzubechukwuDev</p> <p className="text-slate-400">Feb 5</p>
                    </div>
                    <div>
                        <p className="text-slate-700 ">Hello, How are you doing?</p>
                    </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Chat;