const express = require("express");
const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

// CREATING USER
route.post("/api/users", controller.create)
const users = route.get("/api/users", controller.find)
module.exports = users

// CREATING GAME
route.post("/api/games", controller.createGame)
const games = route.get('/api/games',controller.findGame)
module.exports = games

//route.get("/new-user", services.create_account);

module.exports = route;


/*
const express = require('express');

const router = express.Router();

let User = require("../model/model");

let score = localStorage.getItem('score')

router.post('/route/create_account/users',async (req,res)=> {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password:req.body.password,
        date:req.body.date,
        highscore:score,
    });
    const savedUser = await user.save();
    try{
        res.json(savedUser);
    } catch(err){
        res.json({message:err})
    }
})

module.exports = router
*/