const fs=require("fs")

const tracker=(req,res,next)=>{
    fs.appendFileSync("./logs.txt",`Route: ${req.url}, Method: ${req.method}, Time: ${Date()}\n`)
    next()
}

module.exports={
    tracker
}