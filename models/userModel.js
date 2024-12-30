import mongoose from "mongoose";
import {createHmac,randomBytes} from "crypto";
import exp from "constants";
import{ genearteToken } from "../extra/jwt.js"

const userSchema = new mongoose.Schema({
    name:{type:String, reuired: true},
    email:{type:String, required: true , unique:true},
    salt:{type:String},
    profileImgUrl:{type:"String", default : "/images/default.png"},
    password:{type:String, required: true, min:8},
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    }
},{timestamps: true})


userSchema.pre('save', function (next) {
    const user = this;
    if(!user.isModified('password')) return ;

    const salt = randomBytes(10).toString();
    const hashedPassword = createHmac('sha256',salt)
        .update(user.password)
        .digest('hex');
    user.password = hashedPassword;
    user.salt = salt;
    next()
})

userSchema.static('matchPassword', async function(email,password) {
    const user = await Users.findOne({email});
    if(!user) {
        return false
    }
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256',salt)
    .update(password)
    .digest('hex');

    if(hashedPassword !== userProvidedHash) {
      throw new Error("Invalid password!!")
    }
    const token = genearteToken(user)
    return token
})



const Users = mongoose.model("Users", userSchema);

export { Users };