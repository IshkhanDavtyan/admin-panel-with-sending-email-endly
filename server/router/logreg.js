const express = require('express')
const router = new express.Router();

const { sendEmail } = require('../emails/accounts')
const User = require('../model/users');
const auth = require('../middleware/auth')

//registration user
router.post('/registration', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const user = new User(req.body);
    console.log(user.name, user.email)
    try {
        console.log(req.body)
        await user.save();
        console.log(user);
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

//all users
router.get('/allUsers', auth, async (req, res) => {
    try {
        if (req.user.rank === 'Admin') {
            const users = await User.find({})
            console.log(req.user)

            res.send(users)
        }
    } catch (e) {
        res.status(404).send(e)
    }
})

//user login
router.post('/login', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
        const user = await User.userLogin(req.body.email, req.body.password);
        const token = await user.addToken();
        console.log(user);

        res.send({ user, token })
    } catch (e) {
        res.status(404).send(e)
    }
});

//send email

router.post('/sendEmail', async (req, res) => {
    
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        sendEmail(user.email, user.name,user._id)
        
        res.send(user)

    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/changePassword',async (req,res)=>{
    
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.connection.remoteAddress)
    
    try{
        const user =await User.findById(req.query.id)

        const updateUser = await user.updatePassword(req.body.password)
        console.log('user')
        res.send({user,updateUser})
    }catch(e){
        res.status(500).send(e)
    }
})

//update rank
router.patch('/users', auth, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
        if (req.user.rank === 'Admin') {
            const endUser = req.user.changeRank(req.body.rank)
            console.log(endUser)
            res.send(endUser)
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

//logout
router.post('/logout', auth, async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            token.token !== req.token
        })
        await req.user.save()
        console.log(req.user)
        res.send()
    }
    catch (e) {
        res.status(405).send(e)
    }
})

module.exports = router