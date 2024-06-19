const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database")
const router = require("./routes/userRoute");
const fileupload = require("express-fileupload");
const cloudinaryConnect = require("./config/cloudinary");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// connecting to database
connectDB()

// connecting to cloudinary
cloudinaryConnect();

// mount path
app.use("/", router);

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
});