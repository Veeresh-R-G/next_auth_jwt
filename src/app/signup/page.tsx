"use client";
import Link from "next/link";
import React, { useState } from "react"
import {useRouter} from 'next/navigation'
import axios from "axios";
import toast from 'react-hot-toast'
export default function SignUp(){

    const router = useRouter()
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

   
    const onSignUp = () => {
        
        const helper = async () => {
            try{
                const resp = await axios.post('/api/users/signup' , user)
                console.log(resp);
                router.push('/login')
            }
            catch(e:any){
                toast.error("There was an Error")
                console.log("Error on the SignUp Page");
            }
        }
        
        toast.promise(helper() , {
            loading: 'Please Wait',
            success: 'Successful Registration, Please finish the Verification',
            error: 'There was an Error in Signup',
        })

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl p-2">Sign Up</h1>
           
            <label className="p-2">Username</label>
            <input className="text-black" value={user.name} onChange={(e) => {
                setUser({...user , name : e.target.value})
            }} />


            <label className="p-2">Email</label>
            <input className="text-black" value={user.email} onChange={(e) => {
                setUser({...user , email : e.target.value})
            }} />

            <label className="p-2">Password</label>
            <input type="password" className="text-black" value={user.password} onChange={(e) => {
                setUser({...user , password : e.target.value})
            }} />
            
            <button
            onClick={onSignUp}
            className="bg-white p-1 px-3 text-black rounded-lg m-2 font-semibold"
            >Sign Up</button>
            <Link href="/login">Visit Login Page</Link>
        </div> 
    )
}