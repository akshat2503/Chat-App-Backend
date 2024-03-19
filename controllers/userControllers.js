const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

// Endpoint to register user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    // Reporting incomplete details
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all the fields!");
    }

    // Checking if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists!");
    }

    // Generating user token and returning user data
    const user = await User.create({
        name, email, password, pic
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found!");
    };
});

// Endpoint to authenticate user
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Checking if the entered user details match to the database entry
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json("Invalid Email or Password");
    }
})

// Endpoint to search user   /api/user?search=akshat
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]
    } : {};

    // Returns all users after searching the provided key and removing the password
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }).select('-password');
    res.send(users);
})

module.exports = { registerUser, authUser, allUsers };