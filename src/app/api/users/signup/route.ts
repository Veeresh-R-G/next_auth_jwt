import {connect} from '@/dbconfig/dbconfig'
import { sendEmail } from '@/helpers/mailer';
import User from '@/models/userModels'
import bcryptjs from "bcryptjs"
import { NextResponse, NextRequest } from 'next/server';


connect()


export async function POST(request: NextRequest) {
    
    try{
        const reqBody = await request.json();
        const {name , email , password} = reqBody;

       

        const user = await User.findOne({email})
        
        if(user){
            return NextResponse.json({error: "User Already Exists"} ,{status: 400})
        }
        
        const salt = await bcryptjs.genSalt(15)
        const hashedPass = await bcryptjs.hash(password , salt)

        const newUser = new User({
            username:name,
            email,
            password : hashedPass
        })
      
        
        //save the new user
        const savedUser = await newUser.save()
        
        //send verification email
        await sendEmail({email,emailType:process.env.MAIL_VERIFY!,userId: savedUser._id})
        

        return NextResponse.json({message: "User created"} , {status: 201})

    }
    catch(e:any){
        console.log(e)
        return NextResponse.json({error: e.message }, {status: 500})
    }
}