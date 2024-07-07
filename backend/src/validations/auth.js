const Roles = require("../utils/constants").Roles; 
const e = require("express");
const {z} = require("zod")

const PASSWORD_REGEX =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&^()._*?]{8,30}$/;

const registrationSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dob: z.string(),
    gender: z.string().min(1),
    nicNo: z.string().min(1),
    mobileNo: z.string().min(10,{message: "Invalid mobile number"}),
    email: z.string().email(),
    password: z.string().refine((password)=>PASSWORD_REGEX.test(password),{
        message: "Password must contain atleast one uppercase, one lowercase, one digit and one special character and must be between 8 to 30 characters"
    }),
    role: z
    .string()
    .refine((role)=>
        role !== "ADMIN", {
            message: "You are not allowed to create an admin account"
        })
    .optional(),
})

const loginSchema = z.object({
    email: z.string().email().min(1,{message: "Invalid email"}),
    password: z.string().min(1,{message: "Invalid password"}),
})

module.exports = {
    registrationSchema,
    loginSchema
}