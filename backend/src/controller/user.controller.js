const userService = require("../services/user.service");
const authServices = require("../services/auth.service");
const {compareSync} = require("bcrypt");

const getAllUsers = async (req, res) => {
    const { role } = req.query;
    try {
        const users = await userService.getAllUsers(role);
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json( error );
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        return res.status(400).json( error );
    }
}


const updateUser = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const user = req.user;
    try {
        const updatedUser = await userService.updateUser(id, payload, user);
        res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json( error);
    }
}

const changePassword = async (req, res) => {
    const {id} = req.params;
    const {oldPassword, newPassword} = req.body
    try {
        const user = await userService.getUserById(id)
        const passwordMatch = compareSync(oldPassword, user.password)
        if(!passwordMatch){
            throw new Error("Invalid Password")
        }
        if(oldPassword !== newPassword){
            throw new Error("Same password cannot used. Please enter a new password")
        }
        const hashedPassword = authServices.hashPassword(newPassword)
        await userService.changePassword(id, hashedPassword)
        console.log("Password changed successfully")
        return res.status(200).json({message:"Password changed successfully"})
    }catch(error){
        console.log(error)
        return res.status(400).json(error);
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await userService.deleteUser(id,user);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

const checkUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await userService.checkUser(id, role);
        res.status(200).json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = userController = {
    getAllUsers,
    getUserById,
    updateUser,
    changePassword,
    deleteUser,
    checkUser,
};