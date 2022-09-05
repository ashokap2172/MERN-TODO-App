const express = require('express');
const router = express.Router();
const userModel = require('./userSchema');
require('./conn');

router.get('/',(req,res) =>{
    res.send("hello from server router");
});

router.get('/fetch',async(req,res) =>{
    const items = await userModel.find();
    // console.log(items);
    res.json(items);
});

router.post('/insert', async(req,res)=>{
    try {  
            const dbitem = new userModel(req.body);
            await dbitem.save();
            return res.json({message:"inserted successfully"});   
        } 
    catch (error) {
        console.log(error);
    }
});

router.delete('/delete', async(req,res)=>{
    try {  
            console.log((req.body));
            await userModel.deleteOne({_id:req.body.id});
            return res.json({message:"deleted successfully"});   
        } 
    catch (error) {
        console.log(error);
    }
});

router.put('/update', async(req,res)=>{
    try {  
            console.log((req.body));  
            await userModel.updateOne({"_id":req.body.id},{$set: {item:req.body.item} });
            return res.json({message:"Edited successfully"});   
        } 
    catch (error) {
        console.log(error);
    }
});



module.exports = router;