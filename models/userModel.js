const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"User"
    }
});
  
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET, {
      expiresIn: "5d"
    });
  };

module.exports = mongoose.model('user', userSchema);