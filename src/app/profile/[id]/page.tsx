"use client"

import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
export default function ProfilePage({params}: any){

    const router = useRouter()
    const handleLogout = () => {
        
        try{

            axios.get("/api/users/logout")
            .then(res => {
                console.log("Logout Successful")
                toast.success("Logout Successful")
                router.push("/login")
            
            })
        }
        catch(err: any){
            console.log(err)
            toast.error(err.message)
        }
    }
    return (
        <div className="flex justify-center items-center p-2 min-h-screen">
            <div>
                <p className="text-4xl ">This is the profile Page</p>
                
                <div className="bg-yellow-500 p-3 text-center rounded-2xl text-2xl"> {params.id}</div>
                <button onClick={handleLogout} className="bg-blue-400 text-center rounded-xl text-lg py-2 w-full mt-3">Logout</button>
            </div>
            
        </div>
    )
}