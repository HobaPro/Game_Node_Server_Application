const mongoose = require("mongoose");

let IsConnected = false;

async function Connect(){
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch(err){
        throw new Error(err);
    }
}

async function Disconnect(){
    try{
        await mongoose.disconnect();
    }catch(err){
        throw new Error(err);
    }
}

module.exports = {
    Connect,
    Disconnect,

    IsConnected,
}