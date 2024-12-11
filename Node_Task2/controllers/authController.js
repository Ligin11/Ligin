const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require('dotenv').config();

exports.register = async (req,res) => {
    try{
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message:"User already exists"})
        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(201).json({message:"User registered successfully"})
    } catch (error){
        res.status(500).json({message:"Server error", error})
    }
}

exports.login = async (req,res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(400).json({error: "Invalid user id"})

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) return res.status(400).json({error:"Invalid password"})
        
        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET_KEY, {
            expiresIn:'1h'})
        
        
        res.status(200).json({ token })
    }catch (error){
        res.status(500).json({message: "Server error", error})
    }
}

exports.getUser = (req, res) =>{
    res.status(200).json({user: req.user})
}