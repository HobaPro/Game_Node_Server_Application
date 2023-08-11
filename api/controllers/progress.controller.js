const DB = require("../db/db");

const User = require("../models/auth.model");

/* This Controller Start After End the Game to Handle Players (Winners, and Losers) Progressions in Rated Mode */
async function FinishGameRatedMode(req, res){
    try{

        if(!DB.IsConnected){
            res.status(500).send({
                Success: false,
                Data: null,
                Message: "Connection Error",
            });

            return;
        }

        const { WinnerTeam, LosersTeam } = req.body;

        const all = WinnerTeam.players.concat(LosersTeam.players);

        const players = await User.find({ Username: { $in: all } }, "Username Level Score Diamonds");

        if(players.length <= 0){

            res.status(404).send({
                Success: false,
                Data: null,
                Message: "Faild to Get Players to Up their Score, Players not Found.",
            });

            return;
        }

        for(let i = 0; i < players.length; i++){

            const newProgress = LevelUp(players[i].Level, 3);

            players[i].Level = newProgress;

            players[i].Score = (((players[i].Level.Number - 1) * 10) + players[i].Level.Xp);

            players[i].Diamonds = i < WinnerTeam.players.length ? players[i].Diamonds + 3 : (players[i].Diamonds >= 1 ? players[i].Diamonds - 1 : 0);

            await players[i].save();
        }

        res.status(200).send({
            Success: true,
            Data: {
                players,
            },
            Message: "Congratulations, Winner's XP, and Score is Up, and you have +3 Diamonds :)"
        });
    }
    catch(error){
        res.status(200).send({
            Success: false,
            Data: null,
            Message: "Server Error Please Try Again Later",
        });

        console.log(error);
    }
}
/* ----------------------- */

/* This Controller Start After End the Game to Handle Players (Winners, and Losers) Progressions in Unrated Mode */
async function FinishGameUnRatedMode(req, res){
    try{
        if(!DB.IsConnected){

            res.status(500).send({
                Success: false,
                Data: null,
                Message: "Connection Error",
            });

            return;
        }

        const { WinnerTeam, LosersTeam } = req.body;

        const all = WinnerTeam.players.concat(LosersTeam.players);

        const players = await User.find({ Username: { $in: all } }, "Username Level Score");

        if(players.length <= 0){
            res.status(404).send({
                Success: false,
                Data: null,
                Message: "Faild to Get Players to Up their Score, Players not Found.",
            });

            return;
        }

        for(let i = 0; i < players.length; i++){
            const newProgress = LevelUp(players[i].Level, 3);

            players[i].Level = newProgress;

            players[i].Score = (((players[i].Level.Number - 1) * 10) + players[i].Level.Xp);

            await players[i].save();
        }

        res.status(200).send({
            Success: true,
            Data: {
                players,
            },
            Message: "Congratulations, Your XP, and Score is Up :)",
        });
    }
    catch(error){

        res.status(200).send({
            Success: false,
            Data: null,
            Message: "Server Error Please Try Again Later",
        });
        
        console.log(error);
    }
}
/* ----------------------- */


/* Method to Up Player XP */
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
    FinishGameRatedMode,
    FinishGameUnRatedMode,
}