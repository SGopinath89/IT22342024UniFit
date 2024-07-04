const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./config')

const generateToken = async(user)=>{
    const {_id,email} = user
    return jwt.sign({userId:_id, email},JWT_SECRET,{
        expiresIn:"1d"
    })
}
const decodeToken = (token)=>{
    return jwt.verify(token,JWT_SECRET)
}

module.exports ={
    generateToken,
    decodeToken
}