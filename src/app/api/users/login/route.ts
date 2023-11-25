import {connect} from '@/dbconfig/dbconfig'
import User from '@/models/userModels'
import bcryptjs from "bcryptjs"
import { NextResponse, NextRequest } from 'next/server';
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){

    try{

        const reqBody =  await request.json()
        const {email ,password} = reqBody;
        
        
        const userFound = await User.findOne({email})
        
        
        if(!userFound){
            return NextResponse.json({message : "User Not Found"},{status : 400})
        }

        const validate_password = bcryptjs.compare(password , userFound.password)
        if(!validate_password){
            return NextResponse.json({error : "Invalid Credentials"},{status : 401})
        }

        //create token data
        const token_data = {
            id: userFound._id,
            username : userFound.username,
            email : userFound.email
        }

        const token = await jwt.sign(token_data , process.env.TOKEN_SECRET! , {expiresIn : "1d"})

        const response = NextResponse.json({message : "Login Successfull" , token} , {status : 200})

        //set cookie
        response.cookies.set("token",token , {
            httpOnly : true,
            secure : true })
        
        return response

        // return NextResponse.json({message: "Route is working fine"} , {status: 200})
        


    }
    catch(e: any){
        console.log(e);
        
        return NextResponse.json({error: e.message}, {status: 500})
    }
}