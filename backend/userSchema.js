const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    item: {
        type:String,
        required:true
    } 
});

const userModel = mongoose.model('todoitems',userSchema);

module.exports = userModel;