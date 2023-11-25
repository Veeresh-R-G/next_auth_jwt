"use client";

import React,{useState,useEffect} from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function Page() {

    const router = useRouter();
    const [token, setToken] = useState<string>("")
    const [pass, setPass] = useState<string>("")
    const [repass, setRePass] = useState<string>("")

    const handleChangePass = (e:any) => {
        setPass(e.target.value)
    }

    const handleChangeRePass = (e:any) => {
        setRePass(e.target.value)
    }

    const handleSubmit = async () => {

        if(pass === repass && token){

            try{
                const response = await axios.post("/api/users/updatepassword",{token:token, newPassword: pass})
                if(response.status === 201){
                    toast.success(response.data.message)
                    router.push("/login")
                }
                return;
            }
            catch(err:any){
                console.log("heere");
                
                toast.error(err.message)
                return;
            }
            
        }

        toast.error("The Passwords Entered do not match")
    }

    useEffect(() => {
      setToken(window.location.search.split("=")[1])
    }, [])
    
    
    
  return (
    <div className='min-h-screen text-black flex gap-4 flex-col justify-center items-center'>

        <h2>Welcome to Reset Password</h2>
        <input className='' id='password' value={pass} onChange={handleChangePass} placeholder='Enter New Password'></input>
        <input id='re-enter' value={repass} onChange={handleChangeRePass} placeholder='Re-enter Password'></input>
        <button className='text-white px-2 py-1 bg-green-500 rounded-xl' onClick={handleSubmit}>Submit</button>
    </div>
  )
}