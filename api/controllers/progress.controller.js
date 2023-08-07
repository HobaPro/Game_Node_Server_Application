const DB = require("../db/db");

const User = require("../models/auth.model");

async function IWonRated(req, res){
    try{
        if(!DB.IsConnected){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Connection Error"});
            return;
        }

        const user = await User.findById(req.body.ID);

        if(!user){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "User Error"});

            return;
        }

        /*const newLevel = {
            Number: req.body.LevelNumber,
            Xp: req.body.Xp,
        };*/

        const newProgress = LevelUp(user.Level, 3);

        user.Level = newProgress;

        user.Score = (((user.Level.Number - 1) * 10) + user.Level.Xp);

        user.Diamonds += 3;

        await user.save();

        res.status(200).send({
            Success: true,
            StatusCode: 200,
            Data: {
                Level: user.Level,
                Diamonds: user.Diamonds,
            },
            Message: ""
        });
    }
    catch(error){
        res.status(200).send({Success: false, StatusCode: 400, Data: null, Message: "Server Error Please Try Again Later"});
        throw new Error(error);
    }
}

async function IWonUnrated(req, res){
    try{
        if(!DB.IsConnected){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Connection Error"});
            return;
        }

        const user = await User.findById(req.body.ID);

        if(!user){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "User Error"});

            return;
        }

        /*const newLevel = {
            Number: req.body.LevelNumber,
            Xp: req.body.Xp,
        };*/

        const newProgress = LevelUp(user.Level, 3);

        user.Level = newProgress;

        user.Score = (((user.Level.Number - 1) * 10) + user.Level.Xp);

        await user.save();

        res.status(200).send({
            Success: true,
            StatusCode: 200,
            Data: {
                Level: user.Level,
            },
            Message: ""
        });
    }
    catch(error){
        res.status(200).send({Success: false, StatusCode: 400, Data: null, Message: "Server Error Please Try Again Later"});
        throw new Error(error);
    }
}

async function ILostRated(req, res){
    try{
        if(!DB.IsConnected){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Connection Error"});
            return;
        }

        const user = await User.findById(req.body.ID);

        if(!user){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "User Error"});

            return;
        }

        /*const newLevel = {
            Number: req.body.LevelNumber,
            Xp: req.body.Xp,
        };*/

        const newProgress = LevelUp(user.Level, 1);

        user.Level = newProgress;

        user.Score = (((user.Level.Number - 1) * 10) + user.Level.Xp);

        if (user.Diamonds > 0) user.Diamonds -= 1;

        await user.save();

        res.status(200).send({
            Success: true,
            StatusCode: 200,
            Data: {
                Level: user.Level,
                Diamonds: user.Diamonds,
            },
            Message: ""
        });
    }
    catch(error){
        res.status(200).send({Success: false, StatusCode: 400, Data: null, Message: "Server Error Please Try Again Later"});
        throw new Error(error);
    }
}

async function ILostUnrated(req, res){
    try{
        if(!DB.IsConnected){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Connection Error"});
            return;
        }

        const user = await User.findById(req.body.ID);

        if(!user){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "User Error"});

            return;
        }

        /*const newLevel = {
            Number: req.body.LevelNumber,
            Xp: req.body.Xp,
        };*/

        const newProgress = LevelUp(user.Level, 1);

        user.Level = newProgress;

        user.Score = (((user.Level.Number - 1) * 10) + user.Level.Xp);

        await user.save();

        res.status(200).send({
            Success: true,
            StatusCode: 200,
            Data: {
                Level: user.Level,
            },
            Message: ""
        });
    }
    catch(error){
        res.status(200).send({Success: false, StatusCode: 400, Data: null, Message: "Server Error Please Try Again Later"});
        throw new Error(error);
    }
}

function LevelUp(level, xp){

    const newLevel = {
        Number: level.Number,
        Xp: level.Xp,
    }

    let nXp = newLevel.Number * 10;

    newLevel.Xp += xp;

    while(newLevel.Xp >= nXp){
        newLevel.Number++;

        newLevel.Xp -= nXp;

        nXp = newLevel.Number * 10; 
    }

    return newLevel;
}

function LevelDown(level, xp){
    if(level.LevelNumber == 1 && xp > level.Xp){
        level.Xp = 0;
        return;
    }

    let nXp = level.LevelNumber * 10;

    level.Xp -= xp;

    while(level.Xp < 0){
        level.LevelNumber--;

        nXp = level.LevelNumber * 10;

        level.Xp += nXp;
    }

    return level;
}

module.exports = {
    IWonRated,
    IWonUnrated,
    ILostRated,
    ILostUnrated,
}