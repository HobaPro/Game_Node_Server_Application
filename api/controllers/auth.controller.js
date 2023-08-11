const jwt = require("jsonwebtoken");

const DB = require("../db/db");

const bcrypt = require("bcrypt");

const User = require("../models/auth.model");

/* Registration Controller. You can Create Account with it. */
async function Register(req, res){
    try{

        const { Username, Email, Password } = req.query;

        if(!DB.IsConnected){
            res.status(400).send({Success: false, StatusCode: 400, Data: null, Message: "Connection Error"});
            return;
        }

        if(!UsernameValidation(Username)){

            res.status(400).send({
                Success: false,
                Data: null,
                Message: "Username shouldn't be less than 6 Characters."
            });

            return;
        }

        if(!EmailValidation(Email)){

            res.status(400).send({
                Success: false,
                Data: null,
                Message: "E-mail is't Formated."
            });

            return;
        }

        if(!PasswordValidation(Password)){

            res.status(400).send({
                Success: false,
                Data: null,
                Message: "Invalid Data, Password shouldn't be less than 8 Characters, and should include Alphanumeric characters."
            });

            return;
        }

        const username = await User.findOne({Username: Username});

        if(username){
            res.status(409).send({
                Success: false,
                Data: null,
                Message: "Username is Already Exists."
            });

            return;
        }

        const email = await User.findOne({Email: Email});

        if(email){
            res.status(409).send({
                Success: false,
                Data: null,
                Message: "E-Mail is Already Exists."
            });

            return;
        }

        const hashedPassword = await bcrypt.hash(Password, 10);
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
            Data: {
                ID: user.id,
                Username: user.Username,
                Email: user.Email,
                Level: user.Level,
                Score: user.Score,
                Diamonds: user.Diamonds,
            },
            Message: "Congratulations, Your Account has Created Successfully :)"
        });
    }
    catch(error){
        res.status(500).send({
            Success: false,
            Data: null,
            Message: "Server Error, Please Try Again Later :("
        });
        console.log(error);
    }
}
/* ----------------------- */

/* Get User Controller. You can Get User by him Username as Parameter */
async function GetUser(req, res){
    try{

        if(!DB.IsConnected){

            res.status(500).send({
                Success: false,
                Data: null,
                Data: null, Message: "Connection Error",
            });

            return;
        }

        const { Username } = req.params;

        const user = await User.findOne({ Username: Username });

        if(!user){

            res.status(404).send({
                Success: false,
                 Data: null,
                 Message: "User not Found",
            });

            return;
        }

        res.status(200).send({
            Success: true,
            Data: {
                Username: user.Username,
                Level: user.Level,
                Score: user.Score,
                Diamonds: user.Diamonds,
            },
            Message: "Well, User is Exists."
        });
    }
    catch(error){

        res.status(500).send({
            Success: false,
             Data: null,
             Message: "Server Error, Please Try Again Later :("
        });
        
        console.log(error);
    }
}
/* ----------------------- */

/* Generate Access Token Controller */
async function GenerateAccessToken(req, res){
    try{
        if(!DB.IsConnected){

            res.status(500).send({
                Success: false, Data: null,
                Message: "Connection Error",
            });
            
            return;
        }

        const { Email, Password } = req.query;

        const user = await User.findOne({Email: Email});

        if(!user){

            res.status(404).send({
                Success: false,
                 Data: null,
                 Message: "User not Found",
            });

            return;
        }

        // Compare Sent Password with User Password.
        let samePassword = await bcrypt.compare(Password, user.Password);
        if(!samePassword){

            res.status(400).send({
                Success: false,
                Data: null, Message: "E-Mail or Password is Wrong",
            });

            return;
        }

         //Generate Token After Correct Password Matching.
         const token = jwt.sign({
            userID: user.id,
            email: user.email,
        }, process.env.TOKEN_KEY, {
            expiresIn: '14d',
        });

        // Send Response Include Token.
        res.status(200).send({
            Success: true,
            Data: {
                token,
            },
            Message: "Access Token was Generated Successfully :) You should save it in Header with Key Called -> authorization."
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
/* ----------------------- */

/* This Controller Check if User have Authorize to Get him Data. */
function CheckUserAuthorization(req, res, next)
{
    res.contentType('application/json');

    try{
        //Get Token From Request Header
        const authHeader = req.headers["authorization"];
        let token = null;
        
        if (authHeader) token = authHeader.split(' ')[1];
        else
        {
            res.status(401).send({
                success: false,
                data: null,
                message: "Unauthorized"
            });

            return;
        }
        
        //Trow Exeption If Token Does't Exists. 
        if(!token)
        {
            res.status(401).send({
                success: false,
                data: null,
                message: "Unauthorized"
            });

            return;
        }

        //Verify Token And Send Data To Next Middleware If Token Valid.
        jwt.verify(token, process.env.TOKEN_KEY, (error, user) => {
            if(error)
            {
                res.status(401).send({
                    success: false,
                    data: null,
                    message: "Unauthorized"
                });

                return;
            }
            req.user = user;

            next();
        });
    }catch(error){
        console.log(error);
    }
}
/* ----------------------- */

/* This Controller Start After Check User Authorization to Get User Data */
async function GetMyData(req, res){
    try{
        if(!DB.IsConnected){

            res.status(500).send({
                Success: false,
                Data: null,
                Data: null, Message: "Connection Error",
            });

            return;
        }

        const { userID } = req.user;

        const user = await User.findById(userID);

        if(!user){

            res.status(404).send({
                Success: false,
                 Data: null,
                 Message: "User not Found",
            });

            return;
        }

        res.status(200).send({
            Success: true,
            Data: {
                Username: user.Username,
                Email: user.Email,
                Level: user.Level,
                Score: user.Score,
                Diamonds: user.Diamonds,
            },
            Message: "Well, User is Exists."
        });
    }
    catch(error){

        res.status(500).send({
            Success: false,
             Data: null,
             Message: "Server Error, Please Try Again Later :("
        });
        
        console.log(error);
    }
}
/* ----------------------- */

/* This Controller Start After Check User Authorization to Delete himself */
async function DeleteMe(req, res){

    try{
        const { userID } = req.user;

        const user = await User.findById(userID);
    
        if(!user){
    
            res.status(404).send({
                Success: false,
                Data: null,
                Message: "User not Found",
            });
    
            return;
        }
    
        await User.deleteOne({ _id: user.id });
    
        res.status(200).json({
            Success: true,
            Data: null,
            Message: "User deleted successfully",
        });
    }
    catch(error){
        res.status(500).json({
            Success: false,
            Data: null,
            Message: "An error occurred while deleting the user",
        });

        console.log(error);
    }
}
/* ----------------------- */

/* Validators */

function UsernameValidation(username){
    const regex = /.{6,}/;

    return regex.test(username);
}

function EmailValidation(email){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regex.test(email);
}

function PasswordValidation(Password){
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    return regex.test(Password);
}

module.exports = {
    Register,
    GetUser,
    GenerateAccessToken,
    CheckUserAuthorization,
    GetMyData,
    DeleteMe,
}