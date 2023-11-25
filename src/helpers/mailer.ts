
import User from '@/models/userModels';
import bcryptjs from 'bcryptjs'
const nodemailer = require('nodemailer')

export const sendEmail = async ({email, emailType, userId}:any) => {
    try{

        const hash = await bcryptjs.hash(userId.toString(),11)
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.MAIL_SERVICE_USER,
              pass: process.env.MAIL_SERVICE_PASS
            }
          });

          const mailOptions = {
            from: 'cheeks@gmail.com',
            to: email,
            subject: emailType,
            html:`<p>Click 
            <a href="${process.env.DOMAIN}/verifyemail?token=${hash}">HERE</a> 
            to ${emailType==="RESET" ? "Reset Password" : "Verify your Email"}
            </p>`

          }
        //two types of Email
        // 1. Verify Token
        // 2. Forgot Password 

        if(emailType=="VERIFY"){
            const user = await User.findByIdAndUpdate({_id: userId},
                {
                    verifyToken: hash,
                    verifyTokenExpiry: Date.now() + 3600000,
                },{
                    new: true,
                    runValidators: true
                })
        }
        else if(emailType == "RESET"){
            const user = await User.findByIdAndUpdate({_id: userId},
                {
                    forgotPasswordToken: hash,
                    forgotPasswordTokenExpiry: Date.now() + 3600000,
                },{
                    new: true,
                    runValidators: true
                })
        }

        const mailResponse = await transport.sendMail(mailOptions)

        console.log(mailResponse);
        
        return mailResponse
        

    }
    catch(err:any){
        throw new Error(err.message)
    }
}

