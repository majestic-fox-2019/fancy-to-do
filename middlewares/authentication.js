if(process.env.NODE_ENV==="development"){
    require("dotenv").config()
}
const jwt = require("jsonwebtoken")
module.exports=(req,res,next)=>{
    try {
        const token = req.headers.token;
        console.log(token)
        const user = jwt.verify(token, process.env.secretCode);
        req.user = user;
        next();
    } catch (error) {
        res.status(404).json({message:"token is invalid"})
    }
}