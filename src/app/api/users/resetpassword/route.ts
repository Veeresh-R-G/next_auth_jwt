import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { sendEmail } from "@/helpers/mailer";


export async function POST(request: NextRequest) {
    
    console.log("HOLLLLLLA")
    const reqBody = await request.json()
    const {email} = reqBody;

    const user = await User.findOne({email:email})

    //User not found
    if(!user){
        return NextResponse.json({message:"User Not Found"},{status:404})
    }

    sendEmail({email:email, emailType: process.env.MAIL_RESET, userId: user._id})

    return NextResponse.json({message:"Reset Password Link is sent Successfully"},{status:201})   

}