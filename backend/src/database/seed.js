const { SALT_ROUNDS } = require("../utils/config");
const { genSaltSync, hashSync } = require("bcrypt");

const User  = require("../model/user.model");

const seedDB = async () => {
  const adminAcc = await User.findOne({ email: "admin@unifithub.lk" });

  const salt = genSaltSync(SALT_ROUNDS);
  const hash = hashSync("admin123", salt);

  if (!adminAcc) {
    try {
      await User.create({
        firstName: "Admin",
        lastName: "Admin",
        dob: "2024-06-14",
        gender:"Male",
        nicNo:"123456789V",
        mobileNo:"0712345678",
        email: "admin@unifithub.lk",
        password: hash,
        role: "ADMIN",
      });
      console.log("Admin Created");
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = seedDB;
