
import {Users } from '../models/userModel.js'

const userRegister = async (req,res) =>{
    const {name,email,password,profileImgUrl} = req.body;
    console.log(req.body)
    console.log(name,email,password,profileImgUrl)
    
    try {
        const existingUser = await Users.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists Login!"});
            }
        const user = new Users({
            name,
            email,
            password,
            profileImgUrl
        })
        await user.save()
        return res.status(201).json({message:"User created successfully"});
    }
    catch (err) {
        console.log(`Error registering user : ${err}`)
        return res.status(500).json({message: 'Error registering user'})
    }
}

export default userRegister;