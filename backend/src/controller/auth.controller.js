const { compareSync, compare } = require("bcrypt");
const User = require("../model/user.model");
const authServices = require("../services/auth.service");
const { generateToken } = require("../utils/token");

const register = async (req, res) => {
  const payload = req.body;
  let user = await User.findOne({ email: payload.email });

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  try {
    user = await authServices.register(payload);
    return res.status(200).json({ message: "User Created Successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

const login = async(req, res) =>{
    const payload = req.body
    try{
        const user = await authServices.login(payload)
        if(!user){
            return res.status(400).json({
                message : "Invalid email"
            })
        }
        const passwordMatch = compareSync(payload.password, user.password)
        if(!passwordMatch){
            return res.status(400).json({
                message : "Invalid password"
            })
        }
        const token = generateToken(user)
        return res.status(200).json({
            message : "Login Successful"
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).json({error})
    }
}
module.exports = authController = {
  register,
  login,
};
