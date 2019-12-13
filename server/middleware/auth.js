const jwt = require('jsonwebtoken');
const User = require('../model/users');

const auth =async (req,res,next)=>{
    const token = req.headers.authorization.replace('Bearer ','')
    const verify = jwt.verify(token,'Ishkhan');
    console.log(verify)
    const user =await User.findById(verify._id)
console.log(user)
    req.user = user;
    req.token = token;
    next()
}

module.exports = auth