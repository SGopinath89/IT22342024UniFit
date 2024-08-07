const {configDotenv} = require("dotenv"); 
configDotenv("index")
const PORT = process.env.PORT || 4000 
const MONGODB_URI = process.env.MONGODB_URI 
const JWT_SECRET = process.env.JWT_SECRET

if(!MONGODB_URI){
    console.log("No MONGODB_URI provided")
    process.exit(1)
}
module.exports = {
    PORT,
    MONGODB_URI,
    JWT_SECRET
}