const crypto = require('crypto')
const bcrypt =require('bcrypt')
const User = require('../models/userModel')
const  { sendResetEmail } = require('../services/emailService')

exports.requestPasswordReset = async (req,res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(404).send('User not found');

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000;

        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;

        await user.save();

        await sendResetEmail(email, resetToken);
        res.send("Password email send")
    }catch (error) {
        res.status(500).send('Error Processing request')
    }
};

exports.resetPassword = async (req,res) =>{
    const { token, newPassword } = req.body;
    try{
        const user = await User.findOne({resetToken:token, resetTokenExpiry:{$gt: Date.now()}});
        console.log(user);
        if(!user){
             return res.status(400).send('Invalid or expired token')
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken =null;
        user.resetTokenExpiry = null;
        await user.save();
        res.send('Password updated successfully')
    }catch (error) {
        res.status(500).send('Error updating password')
    }

};