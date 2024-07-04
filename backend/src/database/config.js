const mongoose = require("mongoose")
const {MONGODB_URI} = require("../utils/config.js")

const connectDB = () =>{
    mongoose
        .connect(MONGODB_URI,{
            connectTimeoutMS : 5000,
        })
        .catch((error) => console.log(`Error connecting to DB :${error}`))

        mongoose.connection.on("connected",()=>{
            console.log("Database Connected")
        })
}
module.exports = connectDB