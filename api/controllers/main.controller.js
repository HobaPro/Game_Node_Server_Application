const DB = require("../db/db");

const User = require("../models/auth.model");

async function GetPlayers(req, res){
    try{
        if(!DB.IsConnected){
            res.status(500).send({
                Success: false,
                Data: null,
                Message: "Connection Error",
            });
            return;
        }

        const players = await User.find().sort({Score: -1});

        res.status(200).send({
            Success: true,
            Data: players,
            Message: ""
        });
    }
    catch(error){

        res.status(500).send({
            Success: false,
            Data: null,
            Message: "Server Error Please Try Again Later",
        });

        console.log(error);
    }
}

module.exports = {
    GetPlayers,
}