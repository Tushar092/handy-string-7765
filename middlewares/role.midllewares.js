const jwt = require("jsonwebtoken");
const roleMiddleware = (requiredRole)=>{
    return (req,res,next)=>{
        try{
            let token = req.headers.authorization?.split(" ")[1];
            if(token){
                let decoded = jwt.verify(token,"masai");
                if(decoded){
                    if(requiredRole.includes(decoded.role)){
                        next()
                    }else{
                        res.status(200).json({msg: "Not Authorized!!"})
                        console.log(decoded.role)
                    }
                }else{
                    res.status(200).json({msg: "Invalid Token!!"})
                }
            }else{
                res.status(200).json({msg: "Please Login!!"})
            }
        }catch(err){
            res.status(400).json({err: err.message});
            console.log(err.message);
        }
    }
}
module.exports = {roleMiddleware}