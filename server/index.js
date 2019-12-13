const express = require('express');
const app = express()
require('./mongoose/mongoose');
const loginUserRouter = require('./router/logreg');
const reportRouter = require('./router/reports');

const port = process.env.PORT

app.use(express.json())
app.use(loginUserRouter)
app.use(reportRouter)

app.listen(port,()=>{
    console.log("Server run in port ",port)
})
