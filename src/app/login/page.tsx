"use client";
import Link from "next/link";
import React, { useState } from "react"
import {useRouter} from 'next/navigation'
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp(){

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    
    const onLogin = () => {

        const helper = async () => {
            toast(
                "Loading ...",
                {
                  duration: 2000,
                }
              );
            try{
                const resp = await axios.post('/api/users/login' , user)
                if(resp.status === 200){
                    toast.success("Logged In Successfully")
                    router.push('/profile')
                }
                
            }
            catch(e:any){
                let statusCode:number = (e.response.status);
                if(statusCode === 400){
                    toast.error(e.response.data.message)
                }
                if(statusCode === 401){
                    toast.error(e.response.data.message)
                }
            }
        }

        helper()   
    }

    const handleForgotPassword = () => {

        
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl p-2">Login Up</h1>
           
          

            <label className="p-2">Email</label>
            <input className="text-black" value={user.email} onChange={(e) => {
                setUser({...user , email : e.target.value})
            }} />

            <label className="p-2">Password</label>
            <input type="password" className="text-black" value={user.password} onChange={(e) => {
                setUser({...user , password : e.target.value})
            }} />
            
            <button
            onClick={onLogin}
            className="bg-white p-1 px-3 text-black rounded-lg m-2 font-semibold"
            >Login</button>

            <button
            onClick={handleForgotPassword}
            className="bg-white p-1 px-3 text-black rounded-lg m-2 font-semibold"
            >Forgot Password</button>
        <Link className="text-center" href="/signup">Dont have an Account ? <br/> Visit SignUp Page</Link>
        </div> 
    )
}