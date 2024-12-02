import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";


const connectDb = async ()=>{
    try{
        const connection = await mongoose.connect(`${process.env.MONGO_URI}${DB_NAME}`)
    }catch(error){
        console.error("Failed to connect to MongoDB", error)
        process.exit(1)
    }
}

export default connectDb;