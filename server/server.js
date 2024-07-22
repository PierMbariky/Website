const express=require('express');
const mongoose=require('mongoose');
const dataHandler = require('./datahandler');
const app=express();
const uri = "mongodb+srv://PierMbariky:Lolo1322567@playwise.at3wwbu.mongodb.net/?retryWrites=true&w=majority&appName=PlayWise";
const port = process.env.PORT || 3000;
async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("connected successfully");
    }catch(error)
    {
        console.error(error);
    }
}
connect();
app.listen(5000,()=>{
    console.log("server started on port 8000")
})