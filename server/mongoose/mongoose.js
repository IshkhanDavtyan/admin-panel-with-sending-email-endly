const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/admin-panel', {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
})