import { connect } from "@/dbconfig/dbconfig";  
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModels";


connect()

export async function POST(req: NextRequest){

    try{
        const reqBody = await req.json()
        const {token} = reqBody
        console.log(token);


        //Finding token which is not expired
        const user = await User.findOne({verifyToken: token, 
            verifyTokenExpiry:{$gt:Date.now()}})
        
        if(!user){
            return NextResponse.json({message: "User not Found"})
        }
        
        console.log("USER FOUND");
        
        user.isVerified = true;
        user.verifyToken = undefined 
        user.verifyTokenExpiry = undefined
        await user.save()
        console.log("USER UPDATED")
        return NextResponse.json({"message" : "Email Verified Successfully"})
    }
    catch(err:any){
        return NextResponse.json({error:err.message},{status: 500})
    }
}