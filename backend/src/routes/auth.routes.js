const express = require("express")
const auth = express.Router()
const authController = require("../controller/auth.controller")
const validateData = require("../middlewares/validate")
const {loginSchema, registrationSchema} = require("../validations/auth")

auth.post("/register", validateData(registrationSchema) ,authController.register)
auth.post("/login", validateData(loginSchema) ,authController.login)

module.exports = auth