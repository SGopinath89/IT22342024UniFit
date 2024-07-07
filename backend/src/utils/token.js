const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./config')

const generateToken = async(user)=>{
    const {_id,email} = user
    const token =  jwt.sign({userId:_id, email},JWT_SECRET,{
        expiresIn:"1d"
    })
    return token
}
const decodeToken = (token)=>{
    return jwt.verify(token,JWT_SECRET)
}

module.exports ={
    generateToken,
    decodeToken
}