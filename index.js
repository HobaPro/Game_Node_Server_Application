const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const DB = require("./api/db/db");

const mainRoute = require("./api/routes/main.route");
const mongoose = require("mongoose");

app.use(express.json());

mongoose.connection.on("connected", function(){
    console.log("Connected to Database");
    DB.IsConnected = true;
    app.use(mainRoute);
});

mongoose.connection.on("disconnect", function(){
    console.log("We have Lost the Connection with Database");
    DB.IsConnected = false;
    
    DB.Connect();
});

DB.Connect();

app.listen(process.env.PORT);