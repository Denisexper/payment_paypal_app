import { Schema, model } from "mongoose";


const usersShema = new Schema ({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
    
})

export const usersModel = model("usersModel", usersShema)