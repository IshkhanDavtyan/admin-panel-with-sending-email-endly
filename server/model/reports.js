const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    estimation:{
        type:Number,
        required:true
    },
    spent:{
        type:Number,
        required:true
    },
    isDone:{
        type:Boolean,
        default:undefined
    }
   
})

reportSchema.methods.changeIsDone = async function(bool){
    const report = this;
    report.isDone =bool
    await report.save()
    return report.isDone
}

const Reports = mongoose.model('Report',reportSchema)

module.exports = Reports