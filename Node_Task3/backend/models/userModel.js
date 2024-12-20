const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    email:{
        type: String,
        unique: true
    },
    password:{
        type:String
    },
    resetToken:{
        type:String
    },
    resetTokenExpiry:{
        type:String
    }
})

module.exports = mongoose.model('User', userSchema);