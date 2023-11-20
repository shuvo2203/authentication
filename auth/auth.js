const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.isAuthenticatedUser=async(req, res, next)=>{
    const { token } = req.cookies;
    if (!token) {
        res.status(400).json("Please Login to access this requst");
    }
    const decodedData = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(decodedData.id);
    next();

}



exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        res.status(400).json(`${req.user.role} is not allowed`);
      }
      next();
    }
  }