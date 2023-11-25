import User from "@/models/userModels";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
export async function POST(req: NextRequest) {
    
    const reqBody = await req.json();
    const {token, newPassword} = reqBody
    const salt = await bcryptjs.genSalt(15)
    const hashedPass = await bcryptjs.hash(newPassword , salt)
    
    console.log("yooooo");

    

    const response = await User.findOneAndUpdate({forgotPasswordToken:token,
        forgotPasswordTokenExpiry: {$gt : Date.now()} 
    },{password:hashedPass})

    if(!response){
        return NextResponse.json({message:"Password Not Changed Successfully"},{status: 401})
    }

    return NextResponse.json({message:"Password Changed Successfully"},{status: 201})

}