const express = require('express')
const router = express.Router()
//const bcrypt = require('bcrypt') 
const controller = require('./server/controller/controller')
const { response } = require('express')


const credential = {
    email: "admin@gmail.com",
    password:"admin123"
}

router.get('/api/users', (req,res) => {
    res.render
})

router.get('/login',(req,res)=>{
    res.render('login')
})
// WHEN CREATING A NEW USER, REDIRECTING TO THEIR PAGE

// LOGIN USER
router.post('/login',(req,res)=> {
    if(req.body.email == credential.email && req.body.password==credential.password) {
        req.session.user=req.body.email;
        res.redirect('/route/dashboard')
        //res.end("Login Successfull")
    }else{
        //if(req.body.password)
    }
})

router.post('/api/users', (req,res) => {
    if (req.body.password != req.body.password2) {
        res.send('passwords need to match')
    } else {
        const data = req.body;

        const timestamp = Date.now();
        data.timestamp = timestamp;
    
        res.json(data)
        res.status(201).send()
    }
    console.log(req.body)
})


// ROUTE FOR DASHBOARD
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
        console.log(req)
    }else{
        //res.json(users)
        res.render("login")
    }
})

// ROUTE FOR LOGOUT
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send('Error')
        }else{
            res.render('login', {title:'Express',logout:"Logout Successfull"})
        }
    })
})
// CREATES A GAME DOCUMENT IN MONGODB
router.post("/api/games", (req,res) => {
    console.log('game saved');

    const data = req.body;

    const timestamp = Date.now();
    data.timestamp = timestamp;

    res.json(data)
    res.status(201).send()
})



// ROUTES FOR NAVIGATION
router.get('/nav',(req,res)=>{
    res.render('nav')
})

// ROUTES FOR GAME MODES
    // ROUTE FOR STANDARD GAME
router.get('/nav/standard',(req,res)=>{
    res.render('standard')
})
    // ROUTE FOR GOLD RUSH GAME
router.get('/nav/goldrush',(req,res)=>{
    res.render('goldrush')
})
    // ROUTE FOR LAZY RIVER GAME
router.get('/nav/lazyriver',(req,res)=>{
    res.render('nav')
})
    // ROUTE FOR BATTLE ROYALE GAME
router.get('/nav/battleroyale',(req,res)=>{
    res.render('nav')
})
    // ROUTE FOR TOURNAMENTS
router.get('/nav/tournaments',(req,res)=>{
    res.render('nav')
})

router.get('/help',(req,res)=>{
    res.render('help')
})

router.get('/stats',(req,res)=>{
    res.render('stats')
})

router.get('/settings',(req,res)=>{
    res.render('settings')
})

router.get('/nav/game_over',(req,res)=>{
    res.render('game_over')
})

// WHEN THE USER CLICKS "CREATE NEW USER"
router.get('/create_account', (req,res)=>{
    res.render('create_account')
})



module.exports = router