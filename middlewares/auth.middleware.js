
const jwt = require("jsonwebtoken");
const auth = (req,res,next)=>{
    let token = req.headers.authorization?.split(" ")[1];
    try{
        if(token){
            let decoded = jwt.verify(token,"masai");
            if(decoded){
                console.log(decoded, decoded.role)
                req.userID = decoded.userID;
                req.role = decoded.role
                //console.log(req)
                next()
            }else{
                res.json({msg: "Not Authorized!!"})
            }
        }else{
            res.json({msg: "Please Login First"})
        }
    }catch(err){
        res.status(400).json({err: err.message});
        console.log(err.message)

    }
}
module.exports = {auth};

