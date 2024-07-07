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

    if(payload.role ==="TRAINER" && user.role !== "TRAINER"){
        throw new Error("Forbidden Access")
    }

    return await User.findByIdAndUpdate(id,payload,{new:true})
}

 const deleteUser = async (id) =>{
    if(!id){
        throw new Error("User not found")
    
    }
        return await User.findByIdAndDelete(id)
    
 }

 module.exports = userService = {
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser,
 }