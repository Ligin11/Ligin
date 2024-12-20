const nodemailer = require('nodemailer');
const dotenv= require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

exports.sendResetEmail = async (email, resetToken) =>{
    const resetLink = `https://netlify-passwordreset-guvitask/${resetToken}`;
    await transporter.sendMail({
        from: 'no-reply@gmail.com',
        to: email,
        subject: 'Password reset link',
        text: `Click the following to reset the password: ${resetLink}`,
    })
};