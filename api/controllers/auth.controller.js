const DB = require("../db/db");

const bcrypt = require("bcrypt");

const User = require("../models/auth.model");


async function Register(req, res){
    try{
        if(!DB.IsConnected){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Connection Error"});
            return;
        }

        const username = await User.findOne({Username: req.body.Username});

        if(username){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Username is Already Exists"});

            return;
        }

        const email = await User.findOne({Email: req.body.Email});

        if(email){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "E-Mail is Already Exists"});

            return;
        }

        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        const user = new User({
            Username: req.body.Username,
            Email: req.body.Email,
            Password: hashedPassword,
            Level: {
                Number: 1,
                Xp: 0,
            },
            Score: 0.0,
            Diamonds: 0
        });

        await user.save();

        res.status(200).send({
            Success: true,
            StatusCode: 200,
            Data: {
                Username: user.Username,
                Email: user.Email,
            },
            Message: "Account has Created Successfully"
        });
    }
    catch(error){
        res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Server Error Please Try Again Later"});
        throw new Error(error);
    }
}

async function GetUser(req, res){
    try{
        if(!DB.IsConnected){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Connection Error"});
            return;
        }

        const user = await User.findById(req.body.ID);

        if(!user){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "E-Mail not Found"});

            return;
        }

        res.status(200).send({
            Success: true,
            StatusCode: 200,
            Data: {
                ID: user.id,
                Username: user.Username,
                Email: user.Email,
                Level: user.Level,
                Score: user.Score,
                Diamonds: user.Diamonds,
            },
            Message: "Account has Loged In Successfully"
        });
    }
    catch(error){
        res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Server Error Please Try Again Later"});
        throw new Error(error);
    }
}

async function LogIn(req, res){
    try{
        if(!DB.IsConnected){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Connection Error"});
            return;
        }

        const user = await User.findOne({Email: req.body.Email});

        if(!user){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "E-Mail not Found"});

            return;
        }

        let samePassword = await bcrypt.compare(req.body.Password, user.Password);
        if(!samePassword){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "E-Mail or Password is Wrong"});

            return;
        }

        res.status(200).send({
            Success: true,
            StatusCode: 200,
            Data: {
                ID: user.id,
                Username: user.Username,
                Email: user.Email,
                Level: user.Level,
                Score: user.Score,
                Diamonds: user.Diamonds,
            },
            Message: "Account has Loged In Successfully"
        });
    }
    catch(error){
        res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Server Error Please Try Again Later"});
        throw new Error(error);
    }
}

module.exports = {
    Register,
    GetUser,
    LogIn,
}