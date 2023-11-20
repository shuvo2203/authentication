const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register a user
exports.createUser=async(req, res)=>{
    const{name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password:await bcrypt.hash(password,10)
    });
    const token = user.getJWTToken();
    res.cookie("token", token);
    res.status(200).json({
        success:true,
        user,
        token
    });
}

//login user
exports.loginUser=async(req, res)=>{
    const{email,password} = req.body;
    const userEmail = await User.findOne({email}).select('+password');
    if(!userEmail){
        res.status(400).json('user not registered');
    }
    const isMatch = await bcrypt.compare(password, userEmail.password);
    if(!isMatch){
        res.status(400).json('wrong password');
    }
    const token = userEmail.getJWTToken();
    res.cookie("token", token);
    res.status(200).json({
        success:true,
        message:'login successfull.....!!!',
        token
    });
}


//get all user
exports.getAllUser=async(req, res)=>{
    const users = await User.find();
    if(!users){
        res.status(400).json('user nor found');
    }
    res.status(200).json({
        success:true,
        users
    })
}

//update a user
exports.updateUser=async(req, res)=>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!user){
        res.status(400).json('user not found');
    }
    res.status(200).json({
        success:true,
        user
    });
}

//delete a user
exports.deleteUser=async(req, res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        res.status(400).json('user not found');
    }
    res.status(200).json({
        success:true,
        message:"user delete successfully"
    });
}



//logout a user
exports.logout=async(req, res)=>{
    res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
    res.status(200).json({
        success:true,
        message:"logged out successfully"
    });
}