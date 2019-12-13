const express = require('express');
const router = new express.Router();

const auth = require('../middleware/auth')
const Report = require('../model/reports')

//create notifications
router.post('/reports', auth, async (req, res) => {
    if (req.user.rank !== 'PM') {
        const report = new Report(req.body)
        console.log(req.body)
        try {
            await report.save()
            res.send({report,message:"Your report sending successfuly"})

        } catch (e) {
            res.status(500).send(e)
        }
    }
    else {
        res.send("You cant create report")
    }
})

router.get('/allReports', async (req, res) => {
    try {
        const reports = await Report.find({})
        res.send(reports)
    } catch (e) {
        res.status(404).send(e)
    }
})

router.patch('/allReports',auth ,async (req, res) => {
    // const report =await Report.findByIdAndUpdate(req.body._id,{isDone:!isDone})
    res.header("Access-Control-Allow-Origin", "*");
    if(req.user.rank !== 'developer'){
    try {
        const report = await Report.findById(req.body._id)
        const endlyReport = await report.changeIsDone(req.body.bool);
        res.send({ report, endlyReport })
    } catch (e) {
        res.status(404).send(e)
    }}
    else{
        res.send("You cant create or reject report")
    }
})

module.exports = router