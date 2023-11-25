"use client"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
export default function Profile() {
    
    const router = useRouter()
    const [user, setUser] = useState(null)
    const handleLogout = () => {
        
        try{

            axios.get("api/users/logout")
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

    useEffect(() => {
     
        axios.get("/api/users/userinfo")
        .then((res) => {
            toast.success("User Details fetched !!")
            router.push(`/profile/${res.data.user._id}`)
        })

    
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div>
            Profile Page
            <button onClick={handleLogout} className="bg-white text-black rounded-lg px-2 py-1 block">Logout</button>       

            {user && JSON.stringify(user)}
        </div>
    )
}