import { getDatafromToken } from "@/helpers/userData";

import {NextRequest, NextResponse} from "next/server"
import User from "@/models/userModels";
import { connect } from "@/dbconfig/dbconfig";  

connect()

export async function GET(request: NextRequest){
    try{
        const decryptedToken = await getDatafromToken(request)
        const userID:string = decryptedToken.id
        
        const user:any = await User.findOne({_id:userID}).select("-password -isAdmin -isVerified")

        const resp:NextResponse = NextResponse.json({
            message: "User Found",
            user: user
        })
        return resp;
        
    }
    catch(err:any){
        console.log("Error -> " , err);
        
    }
}