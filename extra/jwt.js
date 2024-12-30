import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const jwtkey = process.env.JWT_SECRET;

const genearteToken = (user) =>{
    const payload = {
        _id : user._id,
        name : user.name,
        email : user.email,
        profileImgUrl : user.profileImgUrl,
        role : user.role
    }
    const token = jwt.sign(payload,jwtkey)
    return token
}

const verifyToken = (token) =>{
    const decoded = jwt.verify(token,jwtkey)
    return decoded;
}

export { genearteToken,verifyToken }