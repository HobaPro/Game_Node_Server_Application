const DB = require("../db/db");

const User = require("../models/auth.model");

async function Leaderboard(req, res){
    try{
        if(!DB.IsConnected){
            res.status(500).send({
                Success: false,
                Data: null,
                Message: "Connection Error",
            });
            return;
        }

        const { PaginateParameter } = req.query;

        const players = await User.find({}, "Username Level Score Diamonds -_id").sort({Score: -1}).skip( ((PaginateParameter * 10) - 10) ).limit(10);

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
    Leaderboard,
}