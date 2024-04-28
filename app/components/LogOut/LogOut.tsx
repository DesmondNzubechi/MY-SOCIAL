import React, { useState } from "react";

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export const LogOut = ({logOut, setLogOut} : {logOut: boolean, setLogOut: React.Dispatch<React.SetStateAction<boolean>>}) => {
    //const [logOut, setLogOut] = useState<boolean>(false);
  const router = useRouter();
    const signOutUser = async () => {
        try {
         // setMainUser(0)
          await signOut(auth);
            setLogOut(false)
          router.push('/');
          toast.success("Logout successful", {
            hideProgressBar: true,
          })
        } catch (error) {
          toast.error("An error occured, Try again.", {
            hideProgressBar: true,
          })
        }
      }
    return(
     logOut &&
        <span onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
            if (e.target instanceof HTMLElement && e.target.classList.contains("logout-dialog")) {
              setLogOut(false);
            }
          }} className="py-[100px] z-[2000] bg-Tp h-full fixed flex justify-center items-center top-0 w-full px-[40px] ">
          
                  <div className="flex flex-col items-center justify-center  bg-white font-poppins rounded p-[50px] relative gap-5">
                  <h1 className="text-[20px] text-center capitalize font-semibold">Are you sure <br />  you want to logout?</h1>
                  <div className="flex flex-row gap-[30px]">
                    <button onClick={signOutUser} className="bg-green-500 hover:bg-green-700 px-[20px] py-[5px] rounded shadow-2xl text-slate-50 font-bold uppercase ">Yes</button>
                    <button onClick={() => setLogOut(false)} className="bg-red-500 hover:bg-red-700 px-[20px] py-[5px] rounded shadow-2xl text-slate-50 font-bold uppercase ">No</button>
                  </div>
                </div>
        </span>
    )
}