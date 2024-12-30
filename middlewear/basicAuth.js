import {Users } from '../models/userModel.js'


const basicAuth = (req,res,next) =>{
    const {name, password, email, } = req.body;
    if(!name || !password || !email){
        return res.status(400).json({message: "Please fill in all fields"});
        } 
    next()    
}

export default basicAuth;