"use client";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoIosChatbubbles } from "react-icons/io";
import { FcAddImage } from "react-icons/fc";
import { userAuth } from "../components/auths/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../components/config/firebase";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

const Chat = () => {
    const user = userAuth();
    const [dp, setDp] = useState<any>(null);
   console.log(user)
    const updateDp = async () => {
        const dpRef = ref(storage, 'dp');
        try {
            const dpName = ref(dpRef, dp.name)
            const uploadDp = await uploadBytes(dpName, dp);
            const dpUrl = await getDownloadURL(uploadDp.ref);
            await updateProfile(user, {
              photoURL: dpUrl
          })
        } catch (error) {
            
        }
    }

    return (
        <>
            {user ? (
                <div className="py-[20px] flex flex-row items-center gap-5  justify-evenly">
                    <div className="flex flex-col max-h-[100vh] md:overflow-y-auto gap-5 px-[20px] py-[20px] items-center ">
                        <h1 className="uppercase text-[30px] text-center font-bold">myu chat</h1>
                        <div className="flex items-center w-full self-start justify-between gap-5 ">
                            <div className="items-center flex relative">
                                <FaUserCircle className="text-[50px] " />
                                <input type="file" onChange={(e) => {
                                    setDp(e.target.files?.[0])
                                    updateDp();
                                }} name="image" className="hidden" id="image" />
                                <label htmlFor="image" className="absolute text-[20px] bottom-[-5px] " >
                                    <FcAddImage />
                                </label>
                                <h1 className="font-medium text-[20px] ">@{user?.displayName}</h1>
                            </div>
                            <button className="bg-red-500 p-1 text-slate-50 px-[20px] rounded text-[20px] font-medium">Logout</button>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center border px-5 border-[2px] bg-slate-100 gap-1 rounded-[20px] justify-center">
                                <input type="search" name="" className="outline-none bg-transparent p-2" placeholder="Serach for messages" id="" />
                                <IoMdSearch />
                            </div>
                            <div className="flex flex-col gap-5">
                                <Link href='' className="flex gap-2 items-center">
                                    <FaUserCircle className="text-[40px] " />
                                    <div className="flex flex-col gap-[5px]">
                                        <div className="flex items-center flex-row gap-2">
                                            <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]" /> <p className="text-slate-400 text-[12px]">Feb 5</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                                        </div>
                                    </div>
                                </Link>
                                <hr /> <Link href='' className="flex gap-2 items-center">
                                    <FaUserCircle className="text-[40px] " />
                                    <div className="flex flex-col gap-[5px]">
                                        <div className="flex items-center flex-row gap-2">
                                            <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]" /> <p className="text-slate-400 text-[12px]">Feb 5</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                                        </div>
                                    </div>
                                </Link>
                                <hr /> <Link href='' className="flex gap-2 items-center">
                                    <FaUserCircle className="text-[40px] " />
                                    <div className="flex flex-col gap-[5px]">
                                        <div className="flex items-center flex-row gap-2">
                                            <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]" /> <p className="text-slate-400 text-[12px]">Feb 5</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                                        </div>
                                    </div>
                                </Link>
                                <hr /> <Link href='' className="flex gap-2 items-center">
                                    <FaUserCircle className="text-[40px] " />
                                    <div className="flex flex-col gap-[5px]">
                                        <div className="flex items-center flex-row gap-2">
                                            <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]" /> <p className="text-slate-400 text-[12px]">Feb 5</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                                        </div>
                                    </div>
                                </Link>
                                <hr /> <Link href='' className="flex gap-2 items-center">
                                    <FaUserCircle className="text-[40px] " />
                                    <div className="flex flex-col gap-[5px]">
                                        <div className="flex items-center flex-row gap-2">
                                            <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]" /> <p className="text-slate-400 text-[12px]">Feb 5</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-[15px]">Hello, How are you doing?</p>
                                        </div>
                                    </div>
                                </Link>
                                <hr /> <Link href='' className="flex gap-2 items-center">
                                    <FaUserCircle className="text-[40px] " />
                                    <div className="flex flex-col gap-[5px]">
                                        <div className="flex items-center flex-row gap-2">
                                            <h1 className="text-slate-900 text-[15px] font-semibold">Desmond Nzubechukwu</h1> <p className="text-slate-500 text-[15px]">@NzubechukwuDev</p><GoDotFill className="text-[10px]" /> <p className="text-slate-400 text-[12px]">Feb 5</p>
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
                    <div className="hidden md:flex flex-col items-center justify-self-center">
                        <IoIosChatbubbles className="text-[100px]" />
                        <h1 className="uppercase font-bold  text-[30px]">Select a message</h1>
                        <p className="text-slate-500">Choose from your existing conversations, start a new one.</p>
                    </div>
                </div>) : (
                <p>Please login</p>
            )}
            </>
        )
}

export default Chat;