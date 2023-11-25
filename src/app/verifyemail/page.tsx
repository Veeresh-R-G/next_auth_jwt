"use client";
import React, { useState, useEffect } from "react"
import axios from "axios";
import toast from 'react-hot-toast'
import Link from "next/link";
export default function SignUp(){
    
    const [token, setToken] = useState<string>("")
    const [verified, setVerified] = useState<boolean>(false)
    const [err, setError] = useState<boolean>(false)
    
    const verifyUserEmail = async () => {
        console.log("Called ")
        try{

            const resp = await axios.post("/api/users/verifyemail",{token:token})
            console.log(resp);
            
            if(resp.data.message === "User not Found"){
                toast.error("User Not Found")
            }
            else if(resp.data.message ==="Email Verified Successfully"){
                setVerified(true)
                toast.success("Email Verified Successfully !!!")
            }
        }   
        catch(err: any){
            setError(true)
            toast.error("Error in Verifying Email")
            throw Error(err.message)

        }
    }

    useEffect(() => {
        setToken(window.location.search.split("=")[1])
    }, [])
    

    useEffect(() => {
        if(token){
            verifyUserEmail()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])
    return (
        
        <div className="min-h-screen text-white flex justify-center items-center">
            <h1>
                This is the Verfication Email Page
            </h1>
            <p>ola ola ola dalem dalem tudum</p>

            {verified ? <div className="">
                <p>Successfully Verified </p>
                <Link href={"/login"}>Head to Login</Link>
            </div> : "Not Verfified"}

        </div>
            
    )
}