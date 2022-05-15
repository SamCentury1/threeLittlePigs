const express = require('express');
const path = require('path');
const dotenv = require("dotenv");
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4:uuidv4} = require('uuid');
const router = require('./router')
const connectDB = require('./server/database/connection')

const app = express();


dotenv.config({ path: "config.env" });
const port = process.env.PORT||3001;

connectDB();
//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
//    console.log("fekke yue");
//});


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs')

// LOAD STATIC ASSETS
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true,
}))

app.use('/route',router);
app.use("/", require("./server/routes/userRoutes"));
//app.use('/', require("./server/controller/controller"));

// HOME ROUTE
app.get('/',(req,res)=>{
    res.render('base', {title: "Login System"})
})

app.listen(port, ()=>{console.log("Listening to server on http://localhost:3001")})