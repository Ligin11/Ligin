const bcrypt = require('bcrypt');
const User = require('../models/userModel')

exports.registerUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, password:hashedPassword});
        await newUser.save();
        res.status(201).send('User registered successfully')
    }catch (error){
        res.status(500).send('Error registering user')
    }
};