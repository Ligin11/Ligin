const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.verifyToken = (req,res,next) =>{
    const token = req.header("Authorization");

    if(!token) return res.status(401).json({message:"Please provide token"})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message:"Invalid Token"})
    }
}