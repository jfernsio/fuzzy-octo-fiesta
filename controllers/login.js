import {Users } from '../models/userModel.js'


const userLogin = async(req,res,next) =>{
    const {email,password} = req.body
    const name = email;
    console.log(req.body)
    try {
    const user = await Users.findOne({email})
    if(!user){
        return res.status(404).json({message:'User doesnt Exist, Please Register!'})
        }
    const token  =  await Users.matchPassword(email,password)
    console.log(`User token is ${token}`)
    
    return res.cookie('token',token).redirect("/postBlog")
    next()
    } catch (err) {
        console.log(`Error login user : ${err}`)
        return res.render("login",{
            err:"Invalid email or password!"
        })
    }
    
}

export default userLogin;