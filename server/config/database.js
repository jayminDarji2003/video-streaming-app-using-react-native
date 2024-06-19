// importing mongoose
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.log(error);
        console.log("ERROR OCCURED WHILE CONNECTING TO DATABASE");
        process.exit(1);
    }
}

module.exports = connectDB;