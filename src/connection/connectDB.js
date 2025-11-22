import mongoose from "mongoose";

const url = process.env.MONGOURL

export const connectM = async () => {

    await mongoose.connect(url)

    console.log("connected to db")
    
}