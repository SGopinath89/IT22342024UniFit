const userService = require("../services/user.service");

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
        return res.status(400).json( {error} );
    }
}


const updateUser = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const user = req.user;
    if(payload.password){
        return res.status(400).json({message:"Password cannot be updated here"})
    }
    try {
        const updatedUser = await userService.updateUser(id, payload, user);
        res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(400).json(error,res);
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params; 
    console.log(id)
    try {
        await userService.deleteUser(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: "User Not Found" });
    }
}


module.exports = userController = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};