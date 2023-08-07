const DB = require("../db/db");

const User = require("../models/auth.model");

async function GetPlayers(req, res){
    try{
        if(!DB.IsConnected){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Connection Error"});
            return;
        }

        const players = await User.find().sort({Score: -1});

        res.status(200).send({
            Success: true,
            StatusCode: 200,
            Data: players,
            Message: ""
        });
    }
    catch(error){
        res.status(200).send({Success: false, StatusCode: 400, Data: null, Message: "Server Error Please Try Again Later"});
        throw new Error(error);
    }
}

module.exports = {
    GetPlayers,
}