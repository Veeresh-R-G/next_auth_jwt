import mongoose from "mongoose";

export async function connect() {
    
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected' , () => {
            console.log('Successfull connection with mongoDB');            
        })

        connection.on('error', () => {
            console.log("SomeError in the connection, check the connection string !!!");
            process.exit()
        })
    }
    catch(error){
        console.log("Something wrong in Connection")
        console.log(error);
        
    }
}