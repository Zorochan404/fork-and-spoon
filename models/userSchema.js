import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true, 
        unique: true
    },
    phonenumber:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type:String,
        default:"customer"
    },
    resetpasswordtoken:{
        type:String,
    },
    resetpasswordexipre:{
        type:Date
    }


})


const user = mongoose.model("user", userSchema)


export default user