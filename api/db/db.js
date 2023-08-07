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

async function CreateConnection(){
    try{
        await mongoose.createConnection(process.env.DATABASE_URL, {
            reconnectInterval: 5000,
            reconnectTries: 60
        });
        /*await mongoose.createConnection(process.env.DATABASE_URL, {
            reconnectInterval: 5000,
            reconnectTries: 60
            // add more config if you need
          });*/
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
    CreateConnection,
    Disconnect,

    IsConnected,
}