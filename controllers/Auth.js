const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

// Register a new user

exports.register = async (req, res) => {
    
    try {
        const { username, email, password, confirmPassword } = req.body;
          // Check if all fields are provided

        if (!username ||!email ||!password ||!confirmPassword) {
            return res.status(403).send({
              success: false,
              message: "All Fields are required",
            })
          }
          // Check if password and confirm password match
          if (password !== confirmPassword) {
            return res.status(400).json({
              success: false,
              message:
                "Password and Confirm Password do not match. Please try again.",
            })
          }
      
          // Check if user already exists
          const existingUser = await User.findOne({ email })
          if (existingUser) {
            return res.status(400).json({
              success: false,
              message: "User already exists. Please sign in to continue.",
            })
          }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(200).json({
            success: true,
            user: newUser,
            message: "User registered successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User registration failed",
            error: error.message,
        });
    }
}

// Login a user

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if all fields are provided
        if (!email || !password) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            })
        }
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist. Please register to continue.",
            })
        }
        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password. Please try again.",
            })
        }
        // Generate a JWT token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        // Send the token to the client
        res.status(200).json({
            success: true,
            token,
            message: "User logged in successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "User login failed",
            error: error.message,
        });
    }
}