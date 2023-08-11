const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const DB = require("./api/db/db");

const mainRoute = require("./api/routes/main.route");
const mongoose = require("mongoose");

// Parse URL-encoded data from HTML forms
app.use(express.urlencoded({ extended: true }));

// Parse JSON data from request bodies
app.use(express.json());

DB.Connect();

mongoose.connection.on("connected", function(){
    console.log("Connected to Database");
    DB.IsConnected = true;
    app.use("/gameserver.online/api", mainRoute);
});

mongoose.connection.on("disconnect", function(){
    console.log("We have Lost the Connection with Database");
    DB.IsConnected = false;
});

app.listen(process.env.PORT);