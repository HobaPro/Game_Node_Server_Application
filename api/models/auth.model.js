const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    
    Username: {
        type: String,
        min: 6,
        max: 12,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        min: 8,
        max: 32,
        required: true,
    },
    Level :{
        type: Object,
        required: true,
    },
    Score :{
        type: Number,
        required: true,
    },
    Diamonds :{
        type: Number,
        required: true,
    }
})


const User = mongoose.model("user", userSchema);

module.exports = User;