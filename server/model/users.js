const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    rank:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String
        }
    }]
});



userSchema.methods.addToken = async function(){
    const user = this
    const token =await jwt.sign({_id:user._id.toString()},'Ishkhan')
    user.tokens = user.tokens.concat({token})
    await user.save();
    return token
}

userSchema.methods.changeRank = async function(rank){
    console.log(rank)
    const user = this;
    user.rank = rank;
    await user.save();
    return user
};

userSchema.methods.updatePassword = async function(password){
    console.log(password)
    const user = this;
    user.password = password;
    await user.save();
    return user.password
}

// userSchema.methods.updatePassword = async function(email){

// }

userSchema.statics.userLogin =async (email,password)=>{
    const user =await User.findOne({email})
    if(!user){
        throw new Error({error:"incorrect email"})
    }
    console.log(password)
    const verify =await bcrypt.compare(password,user.password)
    console.log(verify)
    if(!verify){
        throw new Error({error:"incorrect password"})
    }
    console.log(user)
    return user
}

userSchema.pre('save',async function(next){
    const user = this;
    user.password =await bcrypt.hash(user.password,8)
    next()
})

const User = mongoose.model('User',userSchema);

module.exports = User