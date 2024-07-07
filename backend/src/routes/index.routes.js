const express = require("express")
const router = express.Router()
const userRouter = require("./user.routes")
const authRouter = require("./auth.routes")
const sessionRouter = require("./session.routes")

router.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    })
})

router.use("/user", userRouter)
router.use("/auth", authRouter)
router.use("/session", sessionRouter)

module.exports = router