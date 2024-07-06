const User = require("../model/user.model")
const authService = require("../services/auth.service")

const getAllUsers = async (role) =>{
    let users = []
    if(role){
        users = await User.find({role})
    }
    else{
        users = await User.find()
    }

    users.map(user =>{
        user.password = undefined
    })
    return users
}

const getUserById = async (id) =>{
    const user = await User.findById(id)
    if(user){
        user.password = undefined
    }
    else{
        throw new Error("User not found")
    }
    return user
}
const updateUser = async (id, payload,user) =>{
    if(payload.role ==="ADMIN" && user.role !== "ADMIN"){
        throw new Error("Forbidden Access")
    }

    if(payload.password ==="TRAINER" && user.role !== "TRAINER"){
        throw new Error("Forbidden Access")
    }

    if(payload.password){
        const {password} = payload
        const hash = hashPassword(password)
        payload.password = hash
    }
    return await User.findByIdAndUpdate(id,payload,{new:true})
}

const changePassword = async (id, password) =>{ 
    const hash = userService.hashPassword(password)
    return await User.findByIdAndUpdate(id,{password:hash},{new:true})
 }

 const deleteUser = async (id,user) =>{
    if(user.role !== "ADMIN"){
        throw new Error("Forbidden Access")
    }
    else{
        return await User.findByIdAndDelete(id)
    }
 }
 const checkUser = async(id,role)=>{
    const user = await getUserById(id)

    if (!user){
        throw new Error("User not found")
    }

    return user.role === role
 }

 module.exports = userService = {
        getAllUsers,
        getUserById,
        updateUser,
        changePassword,
        deleteUser,
        checkUser
 }