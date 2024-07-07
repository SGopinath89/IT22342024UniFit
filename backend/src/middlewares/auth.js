const User = require("../model/user.model")
const {JWT_SECRET} = require("../utils/config")
const jwt = require("jsonwebtoken")

const extractToken = (req) => {
    return req.headers.authorization
      ? req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization
            .split(" ")[1]
            ?.replace("null", "")
            ?.replace("undefined", "")
        : null
      : null;
  };

const authenticate = async(req,res,next) => {
    const token = extractToken(req)
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decodedToken = jwt.verify(token,JWT_SECRET)
        const user = await User.findById(decodedToken.userId)
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        req.user = user
        next()
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized"})
    }
}

const adminSecure = async(req,res,next) => {
    if(req.user.role == "" ||req.user.role !== "ADMIN"){
        return res.status(403).json({
            user:{
                firstName:req.user.firstName,
                email:req.user.email,
                role:req.user.role
            },
            message:"Forbidden access, Admin only"
        })
    }
    next()
}

const trainerSecure = async(req,res,next) => {
    if(req.user.role == "" ||req.user.role !== "TRAINER"){
        return res.status(403).json({
            user:{
                firstName:req.user.firstName,
                email:req.user.email,
                role:req.user.role
            },
            message:"Forbidden access, Trainer only"
        })
    }
    next()
}
const adminTrainerSecure = async(req,res,next) => {
   
    if(req.user.role == "ADMIN" || req.user.role == "TRAINER"){
       next()
    }
    else{
        return res.status(403).json({
            user:{
                firstName:req.user.firstName,
                email:req.user.email,
                role:req.user.role
            },
            message:"Forbidden access, Admin or Trainer only"
        })
    
    }
}

module.exports = {
    authenticate,
    adminSecure,
    trainerSecure,
    adminTrainerSecure
}