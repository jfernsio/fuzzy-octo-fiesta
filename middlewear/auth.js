import  {verifyToken } from  "../extra/jwt.js"

function checkForAuthCookie(cookiename) {
    return (req,res,next) =>{
        const cookieValue = req.cookies[cookiename];
        // if (!cookieValue) {
        //     const decoded =  verifyToken(cookieValue)
        //     req.user = decoded;
        //     next();
        //     } else {
        //         res.redirect('/auth/login');
        //       return next();
        //         }
        if(!cookieValue) {
            return next();
        }
        try {
            const decoded =  verifyToken(cookieValue)
            req.user = decoded;
           return next();
        } catch (error) {
            console.log(`error : ${error.message}`)
        }
    }
}

export default checkForAuthCookie;