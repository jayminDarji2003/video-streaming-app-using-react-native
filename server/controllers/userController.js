// to convert the password in Hash we use bcrypt
const bcrypt = require('bcrypt');
const User = require("../models/user");
// const { response } = require('express');
require("dotenv").config();

// signup route handler
exports.signup = async (req, res) => {
    try {
        // get the data
        const { username, email, password } = req.body;

        // Check if all required fields are provided
        if (!username || !email || !password) {
            console.log('all fields are required')
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if user already exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {  // if user already exists
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error hashing password"
            })
        }

        // create entry to database
        const user = await User.create({
            username, email, password: hashedPassword

        })

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered! please try again later"
        })
    }
}


// login route handler
exports.login = async (req, res) => {
    try {
        // data fetch
        const { email, password } = req.body;

        // validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter details carefully."
            });
        }

        // check user avalilable or not
        let user = await User.findOne({ email });

        // if not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Please register before login."
            });
        }

        // verify email and password
        if (await bcrypt.compare(password, user.password)) {
            // password matched
            return res.status(200).json({
                success: true,
                user,
                message: "User logged in successfully"
            });

        } else {
            // password not matched
            return res.status(403).json({
                success: false,
                message: "Password incorrect."
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Couldn't login"
        })
    }
}