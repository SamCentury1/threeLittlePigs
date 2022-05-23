const mongoose = require('mongoose')

let gameSchema = new mongoose.Schema({
    date: {
        type:Date,
        default: Date.now,
    },
    finalScore : {
        type: String,
        require: true,
    },
    turns : {
        turn1Score: {type: String,require: true,},
        turn2Score: {type: String,require: true,},
        turn3Score: {type: String,require: true,},
    }
})



let userSchema = new mongoose.Schema({
    username: {
        type:String,
        require:true,
        unique:true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type:String,
        require:true,
    },
    password2: {
        type:String,
        require:true,
    },
    date: {
        type:Date,
        default: Date.now,
    },
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }]
})


const Game = mongoose.model("Game", gameSchema)
const Userdb = mongoose.model("Userdb", userSchema)

module.exports = Userdb
module.exports = Game