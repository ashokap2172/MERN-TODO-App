const mongoose = require('mongoose');

const DB = //your_database string
mongoose.connect(DB).then(()=>{
    console.log(`connection successful`);
}).catch((err)=>{
    console.log(err);
    console.log(`no connection to database !!!`);
})