// cloudinary integration
const cloudinary = require("cloudinary").v2;
require("dotenv").config()

const cloudinaryConnect = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })

        console.log("connected to cloudinary")
    } catch (e) {
        console.log("Error occured while connecting to cloudinary");
        console.log(e);
    }
}

module.exports = cloudinaryConnect;
